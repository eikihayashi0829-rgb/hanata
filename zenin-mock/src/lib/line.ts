import crypto from "node:crypto";

const LINE_API = "https://api.line.me/v2/bot";
const LINE_CONTENT_API = "https://api-data.line.me/v2/bot";

/**
 * Verify LINE webhook signature.
 * https://developers.line.biz/en/reference/messaging-api/#signature-validation
 */
export function verifyLineSignature(
  rawBody: string,
  signature: string | null,
  channelSecret: string,
): boolean {
  if (!signature) return false;
  const hmac = crypto.createHmac("SHA256", channelSecret);
  hmac.update(rawBody);
  const expected = hmac.digest("base64");
  // timing-safe compare
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/**
 * Reply to a LINE event using its replyToken.
 * https://developers.line.biz/en/reference/messaging-api/#send-reply-message
 */
export async function lineReply(
  replyToken: string,
  messages: LineMessage[],
  accessToken: string,
): Promise<void> {
  const res = await fetch(`${LINE_API}/message/reply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ replyToken, messages }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`LINE reply failed: ${res.status} ${text}`);
  }
}

/**
 * Push a message (no replyToken needed, used for follow-up messages).
 */
export async function linePush(
  to: string,
  messages: LineMessage[],
  accessToken: string,
): Promise<void> {
  const res = await fetch(`${LINE_API}/message/push`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ to, messages }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`LINE push failed: ${res.status} ${text}`);
  }
}

/**
 * Download image/file content uploaded by user.
 */
export async function lineGetContent(
  messageId: string,
  accessToken: string,
): Promise<{ buffer: Buffer; contentType: string }> {
  const res = await fetch(`${LINE_CONTENT_API}/message/${messageId}/content`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    throw new Error(`LINE content fetch failed: ${res.status}`);
  }
  const ab = await res.arrayBuffer();
  return {
    buffer: Buffer.from(ab),
    contentType: res.headers.get("content-type") ?? "application/octet-stream",
  };
}

/**
 * Get user profile (display name, etc).
 */
export async function lineGetProfile(
  userId: string,
  accessToken: string,
): Promise<{ displayName: string; pictureUrl?: string } | null> {
  const res = await fetch(`${LINE_API}/profile/${userId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) return null;
  return (await res.json()) as { displayName: string; pictureUrl?: string };
}

// LINE message types we use
export type LineMessage =
  | { type: "text"; text: string }
  | {
      type: "flex";
      altText: string;
      contents: Record<string, unknown>;
    };

/**
 * Build a Flex Message for AI diagnosis card.
 */
export function buildDiagnosisFlex(diag: {
  device: string;
  symptom: string;
  urgency: string;
  cause: string;
}): LineMessage {
  return {
    type: "flex",
    altText: `AI判定: ${diag.device} / ${diag.symptom}`,
    contents: {
      type: "bubble",
      size: "mega",
      header: {
        type: "box",
        layout: "vertical",
        backgroundColor: "#ECFDF5",
        paddingAll: "12px",
        contents: [
          {
            type: "text",
            text: "✨ AIによる故障判定結果",
            weight: "bold",
            size: "sm",
            color: "#047857",
          },
        ],
      },
      body: {
        type: "box",
        layout: "vertical",
        spacing: "sm",
        contents: [
          row("設備", diag.device),
          row("症状", diag.symptom),
          row("緊急度", diag.urgency),
          row("推定原因", diag.cause),
        ],
      },
      footer: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "ただいま登録業者へ自動連絡しています…",
            size: "xs",
            color: "#10B981",
            wrap: true,
          },
        ],
      },
    },
  };
}

function row(label: string, value: string) {
  return {
    type: "box",
    layout: "horizontal",
    contents: [
      { type: "text", text: `✅ ${label}`, size: "sm", color: "#64748B", flex: 2 },
      { type: "text", text: value, size: "sm", weight: "bold", color: "#0F172A", flex: 3, wrap: true },
    ],
  };
}
