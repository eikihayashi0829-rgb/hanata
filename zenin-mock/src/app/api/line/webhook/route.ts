import { NextRequest, NextResponse } from "next/server";
import {
  buildDiagnosisFlex,
  lineGetContent,
  lineGetProfile,
  linePush,
  lineReply,
  verifyLineSignature,
  type LineMessage,
} from "@/lib/line";
import { diagnoseFromImage, diagnoseFromText } from "@/lib/ai";
import { appendConversation, upsertRepair, type LiveRepair } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LineEvent = {
  type: string;
  replyToken?: string;
  source: { userId?: string; type: string };
  timestamp: number;
  message?: {
    id: string;
    type: "text" | "image" | "video" | "audio" | "file" | "sticker" | "location";
    text?: string;
  };
};

export async function POST(req: NextRequest) {
  const channelSecret = process.env.LINE_CHANNEL_SECRET;
  const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;

  if (!channelSecret || !accessToken) {
    return NextResponse.json(
      { error: "LINE_CHANNEL_SECRET / LINE_CHANNEL_ACCESS_TOKEN not configured" },
      { status: 500 },
    );
  }

  const rawBody = await req.text();
  const signature = req.headers.get("x-line-signature");

  if (!verifyLineSignature(rawBody, signature, channelSecret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let body: { events: LineEvent[] };
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // LINE expects 200 quickly; process events in parallel but don't fail webhook on per-event error.
  await Promise.allSettled(body.events.map((e) => handleEvent(e, accessToken)));

  return NextResponse.json({ ok: true });
}

async function handleEvent(event: LineEvent, accessToken: string) {
  if (event.type !== "message" || !event.message || !event.replyToken || !event.source.userId) {
    return;
  }

  const userId = event.source.userId;
  const repairId = `LINE-${userId.slice(-6)}-${new Date(event.timestamp).toISOString().slice(0, 10).replace(/-/g, "")}`;
  const at = new Date(event.timestamp).toISOString();

  // get or init repair
  const profile = await lineGetProfile(userId, accessToken).catch(() => null);
  const userName = profile?.displayName;

  let repair: LiveRepair = {
    id: repairId,
    source: "line",
    userId,
    userName,
    receivedAt: at,
    initialMessage: undefined,
    hasPhoto: false,
    status: "受付",
    conversation: [],
  };

  // Use existing if any
  const { getRepair } = await import("@/lib/store");
  const existing = getRepair(repairId);
  if (existing) repair = existing;
  upsertRepair(repair);

  if (event.message.type === "text") {
    const text = event.message.text ?? "";
    repair.initialMessage = repair.initialMessage ?? text;
    repair.conversation.push({ from: "tenant", kind: "text", text, at });
    upsertRepair(repair);

    // first-touch ack + ask for photo
    if (!repair.hasPhoto) {
      const reply: LineMessage[] = [
        {
          type: "text",
          text:
            `${userName ?? "入居者様"}、ご連絡ありがとうございます。\n` +
            `「${text}」の件、AI管理サポート「全任」が承ります。\n\n` +
            `状況確認のため、対象設備のお写真を1枚送っていただけますか？📷`,
        },
      ];
      await lineReply(event.replyToken, reply, accessToken);

      // best-effort text diagnosis (no photo yet)
      const diag = await diagnoseFromText(text);
      repair.diagnosis = diag;
      repair.status = "AI判定中";
      appendConversation(repairId, {
        from: "ai",
        kind: "text",
        text: `AIが内容を予備解析: ${diag.device} / ${diag.symptom}`,
        at: new Date().toISOString(),
      });
      upsertRepair(repair);
      return;
    }

    // confirmation step
    if (/(はい|お願い|ok|了解|大丈夫|お願いします)/i.test(text)) {
      await lineReply(
        event.replyToken,
        [
          {
            type: "text",
            text:
              "確定いたしました。\n業者より明日午前中にご連絡が入ります。\n何かあればこのトーク画面からいつでもお問い合わせください 😊",
          },
        ],
        accessToken,
      );
      repair.status = "承認待ち";
      upsertRepair(repair);
      return;
    }

    // generic ack
    await lineReply(
      event.replyToken,
      [{ type: "text", text: "承知しました。担当者に共有します。" }],
      accessToken,
    );
    return;
  }

  if (event.message.type === "image") {
    repair.hasPhoto = true;
    repair.conversation.push({ from: "tenant", kind: "image", at });
    upsertRepair(repair);

    // ack first (LINE recommends quick reply)
    await lineReply(
      event.replyToken,
      [
        { type: "text", text: "お写真を受信しました。AIが解析しています…✨" },
      ],
      accessToken,
    );

    // download + analyze
    try {
      const { buffer, contentType } = await lineGetContent(event.message.id, accessToken);
      const diag = await diagnoseFromImage(
        buffer.toString("base64"),
        contentType,
        repair.initialMessage,
      );
      repair.diagnosis = diag;
      repair.status = "判定完了";
      appendConversation(repairId, {
        from: "ai",
        kind: "card",
        text: `${diag.device} / ${diag.symptom} / 緊急度${diag.urgency}`,
        at: new Date().toISOString(),
      });
      upsertRepair(repair);

      // push diagnosis flex + vendor proposal
      await linePush(
        userId,
        [
          buildDiagnosisFlex(diag),
          {
            type: "text",
            text:
              "近隣の協力業者3社に見積を依頼します。最適な業者が確定次第、改めてご連絡します。\n" +
              "通常 5〜10 分程度でご案内できます。",
          },
        ],
        accessToken,
      );
    } catch (err) {
      console.error("diagnosis failed", err);
      await linePush(
        userId,
        [{ type: "text", text: "解析中にエラーが発生しました。担当者が確認します。" }],
        accessToken,
      );
    }
    return;
  }

  // unsupported types
  await lineReply(
    event.replyToken,
    [{ type: "text", text: "受信しました。担当者が確認します。" }],
    accessToken,
  );
}

// Allow GET for healthcheck (useful when configuring webhook URL)
export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "zenin-line-webhook",
    configured: {
      lineSecret: Boolean(process.env.LINE_CHANNEL_SECRET),
      lineToken: Boolean(process.env.LINE_CHANNEL_ACCESS_TOKEN),
      openaiKey: Boolean(process.env.OPENAI_API_KEY),
    },
  });
}
