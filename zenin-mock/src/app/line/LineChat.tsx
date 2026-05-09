"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Phone,
  Video,
  Camera,
  Image as ImageIcon,
  Mic,
  Smile,
  Send,
  Sparkles,
  CheckCircle2,
  Wifi,
  Battery,
  Signal,
  ArrowRight,
  Plus,
} from "lucide-react";

type Msg =
  | { id: number; from: "user" | "bot"; kind: "text"; text: string; time: string }
  | { id: number; from: "user" | "bot"; kind: "photo"; time: string }
  | { id: number; from: "bot"; kind: "ai-card"; time: string }
  | { id: number; from: "bot"; kind: "vendor-card"; time: string };

const initial: Msg[] = [
  {
    id: 1,
    from: "bot",
    kind: "text",
    time: "14:30",
    text: "こんにちは、グランドメゾン青山のAI管理サポート「全任」です。お困りごとがあれば、いつでもメッセージしてください 🛠",
  },
];

// scripted conversation steps (each user "send" advances)
const userSteps: Msg[][] = [
  // Step 1: user sends text complaint
  [
    {
      id: 0,
      from: "user",
      kind: "text",
      time: "14:32",
      text: "エアコンが冷えません。昨日からずっとです。",
    },
  ],
  // bot reply 1
  [
    {
      id: 0,
      from: "bot",
      kind: "text",
      time: "14:32",
      text: "ご不便をおかけして申し訳ございません。状況を把握するため、エアコン本体のお写真を1枚いただけますか？",
    },
  ],
  // Step 2: user sends photo
  [
    {
      id: 0,
      from: "user",
      kind: "photo",
      time: "14:33",
    },
  ],
  // bot diagnose
  [
    {
      id: 0,
      from: "bot",
      kind: "text",
      time: "14:33",
      text: "ありがとうございます。内容を解析しました 👇",
    },
    {
      id: 0,
      from: "bot",
      kind: "ai-card",
      time: "14:33",
    },
  ],
  // bot vendor proposal
  [
    {
      id: 0,
      from: "bot",
      kind: "text",
      time: "14:34",
      text: "近隣の協力業者3社に見積を依頼し、ご訪問可能な業者が確定しました。",
    },
    {
      id: 0,
      from: "bot",
      kind: "vendor-card",
      time: "14:34",
    },
  ],
  // Step 3: user confirms
  [
    {
      id: 0,
      from: "user",
      kind: "text",
      time: "14:35",
      text: "明日10時で大丈夫です。お願いします🙏",
    },
  ],
  // bot final
  [
    {
      id: 0,
      from: "bot",
      kind: "text",
      time: "14:35",
      text:
        "確定いたしました。明日 5/21 (火) 10:00、株式会社○○設備の担当者がお伺いします。\n\n・所要時間: 約1時間\n・費用: ¥28,600 (税込) ※管理会社請求のため入居者様のご負担はございません\n\n当日ご不在でも合鍵対応可能です。何かご質問があればいつでもどうぞ 😊",
    },
  ],
];

const userPrompts = [
  "エアコンが冷えません",
  "[エアコンの写真を送る]",
  "明日10時で大丈夫です",
];

export default function LineChat() {
  const [messages, setMessages] = useState<Msg[]>(initial);
  const [stepIdx, setStepIdx] = useState(0); // index into userSteps groups
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  // user-action button maps to triplets:
  // userSteps[0] = user text, [1] = bot reply
  // userSteps[2] = user photo, [3]+[4] = bot two replies
  // userSteps[5] = user text, [6] = bot reply
  const userTurnIndexes = [0, 2, 5];
  const currentPromptIdx = userTurnIndexes.findIndex((i) => i === stepIdx);

  const sendNext = () => {
    if (stepIdx >= userSteps.length || typing) return;

    // push user step (or first bot step)
    const isUserTurn = userTurnIndexes.includes(stepIdx);
    const group = userSteps[stepIdx];

    if (isUserTurn) {
      setMessages((m) => [...m, ...group.map((g, i) => ({ ...g, id: m.length + i + 1 }))]);
      setStepIdx((s) => s + 1);
      // queue bot reply
      setTimeout(() => {
        setTyping(true);
      }, 350);
      setTimeout(() => {
        setTyping(false);
        if (userSteps[stepIdx + 1]) {
          setMessages((m) => [
            ...m,
            ...userSteps[stepIdx + 1].map((g, i) => ({ ...g, id: m.length + i + 1 })),
          ]);
          setStepIdx((s) => s + 1);
          // chain second bot message if exists (e.g. text + card)
          if (userSteps[stepIdx + 2] && stepIdx + 2 < userSteps.length && !userTurnIndexes.includes(stepIdx + 2)) {
            setTimeout(() => setTyping(true), 600);
            setTimeout(() => {
              setTyping(false);
              setMessages((m) => [
                ...m,
                ...userSteps[stepIdx + 2].map((g, i) => ({ ...g, id: m.length + i + 1 })),
              ]);
              setStepIdx((s) => s + 1);
            }, 2000);
          }
        }
      }, 1700);
    }
  };

  const completed = stepIdx >= userSteps.length;
  const currentPrompt = currentPromptIdx >= 0 ? userPrompts[currentPromptIdx] : "";

  return (
    <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center">
      {/* iPhone frame */}
      <div className="relative">
        <div className="relative h-[760px] w-[380px] overflow-hidden rounded-[3rem] border-[12px] border-slate-900 bg-black shadow-2xl">
          {/* Notch */}
          <div className="absolute left-1/2 top-0 z-30 h-7 w-40 -translate-x-1/2 rounded-b-[1.4rem] bg-slate-900" />

          {/* Screen */}
          <div className="relative flex h-full w-full flex-col bg-[#7d96b6]">
            {/* iOS status bar */}
            <div className="relative z-20 flex items-center justify-between bg-emerald-500 px-7 pt-2 pb-1.5 text-[11px] font-semibold text-white">
              <span className="tabular">14:35</span>
              <span className="flex items-center gap-1.5">
                <Signal size={11} />
                <Wifi size={12} />
                <Battery size={14} />
              </span>
            </div>

            {/* LINE header */}
            <div className="flex items-center gap-3 bg-emerald-500 px-3 pb-3 pt-1 text-white shadow-sm">
              <ArrowLeft size={20} />
              <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white text-emerald-600 shadow ring-2 ring-white/40">
                <Sparkles size={18} strokeWidth={2.5} />
                <span className="absolute -right-0.5 -top-0.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-400 text-[8px] font-extrabold text-slate-900 ring-2 ring-emerald-500">
                  ★
                </span>
              </div>
              <div className="flex-1 leading-tight">
                <div className="flex items-center gap-1 text-sm font-bold">
                  全任サポート
                  <span className="rounded bg-white/20 px-1 py-px text-[8px] font-bold tracking-wider">公式</span>
                </div>
                <div className="text-[10px] text-emerald-50">グランドメゾン青山 専用窓口</div>
              </div>
              <Phone size={18} />
              <Video size={18} />
            </div>

            {/* Chat scroll area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.08), transparent 50%), radial-gradient(circle at 80% 90%, rgba(255,255,255,0.08), transparent 50%)",
              }}
            >
              <div className="mx-auto mb-4 w-fit rounded-full bg-white/40 px-3 py-1 text-[10px] font-semibold text-slate-700 backdrop-blur">
                2024年5月20日 (月)
              </div>
              <ul className="space-y-3">
                {messages.map((m) => (
                  <Bubble key={m.id} m={m} />
                ))}
                {typing && (
                  <li className="flex items-end gap-2">
                    <div className="h-7 w-7 flex-shrink-0 rounded-full bg-white shadow ring-1 ring-emerald-100">
                      <div className="flex h-full w-full items-center justify-center text-emerald-500">
                        <Sparkles size={14} />
                      </div>
                    </div>
                    <div className="rounded-2xl rounded-bl-sm bg-white px-3 py-2 shadow-sm">
                      <div className="flex gap-1">
                        <Dot delay={0} />
                        <Dot delay={150} />
                        <Dot delay={300} />
                      </div>
                    </div>
                  </li>
                )}
              </ul>

              {completed && (
                <div className="mt-6 rounded-2xl border border-emerald-200 bg-white/90 px-4 py-3 text-center text-[11px] text-emerald-700 backdrop-blur">
                  <CheckCircle2 className="mx-auto mb-1" size={16} />
                  AIによる一次対応が完了しました
                </div>
              )}
            </div>

            {/* Input bar */}
            <div className="flex items-center gap-2 bg-white px-3 py-2.5">
              <Plus size={20} className="text-slate-500" />
              <Camera size={20} className="text-slate-500" />
              <ImageIcon size={20} className="text-slate-500" />
              <div className="flex-1 truncate rounded-full bg-slate-100 px-3 py-1.5 text-[11px] text-slate-400">
                {completed ? "対応完了" : currentPrompt || "メッセージを入力"}
              </div>
              <Smile size={20} className="text-slate-500" />
              <Mic size={20} className="text-slate-500" />
            </div>
          </div>
        </div>

        {/* Side action button */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={sendNext}
            disabled={completed || typing}
            className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-bold shadow-lift transition ${
              completed
                ? "bg-slate-200 text-slate-500"
                : "bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-60"
            }`}
          >
            <Send size={16} />
            {completed ? "AI対応 完了" : `送信: ${currentPrompt}`}
          </button>
          <p className="text-[11px] text-slate-500">
            ※ 投資家デモ用。実環境ではLINE公式アカウントから自動応答します。
          </p>
        </div>
      </div>

      {/* Side panel — narrative + CTA */}
      <div className="w-full max-w-sm space-y-4 lg:pt-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <div className="text-[11px] font-bold uppercase tracking-widest text-emerald-600">
            実装方法
          </div>
          <h2 className="mt-2 text-base font-bold text-slate-900">
            LINE公式アカウントを「友だち追加」するだけ
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            管理会社は LINE 公式アカウントを開設するだけ。入居者には QR
            コードで「友だち追加」してもらえば、24時間365日のAI一次対応窓口になります。
          </p>
          <ul className="mt-4 space-y-2 text-xs text-slate-700">
            {[
              "アプリインストール不要 (LINEは普及率97%)",
              "電話と違い、夜間・週末も自動対応",
              "写真・動画でのトラブル説明が容易",
              "高齢者でも使い慣れたUI",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-500 to-emerald-600 p-5 text-white shadow-lift">
          <div className="text-[11px] font-bold uppercase tracking-widest text-emerald-100">
            このとき、管理会社は
          </div>
          <h2 className="mt-2 text-base font-extrabold">
            同じ瞬間に、ダッシュボードへ自動反映
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-emerald-50">
            入居者がLINEで送信した瞬間、管理会社のダッシュボードに案件が現れ、
            AIが業者調整・書類作成まで自動実行します。
          </p>
          <Link
            href="/split"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-emerald-700 hover:bg-emerald-50"
          >
            両画面を同時に見る
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/dashboard"
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/20 px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/30 hover:bg-white/30"
          >
            管理会社ダッシュボードへ
          </Link>
        </div>

        <div className="text-center">
          <Link href="/" className="text-xs text-slate-500 hover:text-slate-900">
            ← トップへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}

function Bubble({ m }: { m: Msg }) {
  const isUser = m.from === "user";
  return (
    <li className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"} animate-floatIn`}>
      {!isUser && (
        <div className="h-7 w-7 flex-shrink-0 rounded-full bg-white shadow ring-1 ring-emerald-100">
          <div className="flex h-full w-full items-center justify-center text-emerald-500">
            <Sparkles size={14} />
          </div>
        </div>
      )}

      <div className={`flex max-w-[78%] flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}>
        {m.kind === "text" && (
          <div
            className={`whitespace-pre-line rounded-2xl px-3 py-2 text-[13px] leading-relaxed shadow-sm ${
              isUser ? "rounded-br-sm bg-emerald-400 text-white" : "rounded-bl-sm bg-white text-slate-800"
            }`}
          >
            {m.text}
          </div>
        )}

        {m.kind === "photo" && (
          <div className="overflow-hidden rounded-2xl rounded-br-sm shadow-sm ring-1 ring-black/5">
            <div className="flex h-32 w-44 items-center justify-center bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 text-slate-600">
              <div className="text-center">
                <Camera size={28} className="mx-auto" />
                <div className="mt-1 text-[10px]">エアコン_IMG_2840.jpg</div>
              </div>
            </div>
          </div>
        )}

        {m.kind === "ai-card" && (
          <div className="w-64 overflow-hidden rounded-2xl rounded-bl-sm bg-white shadow-sm ring-1 ring-emerald-100">
            <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-2 text-[10px] font-bold text-emerald-700">
              <Sparkles size={12} />
              AIによる故障判定結果
            </div>
            <div className="space-y-1.5 px-3 py-3 text-[11px]">
              {[
                ["設備", "エアコン (8畳用)"],
                ["症状", "冷風が出ない"],
                ["緊急度", "中 (本日中対応推奨)"],
                ["推定原因", "冷媒漏れ / 圧縮機劣化"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1 text-slate-500">
                    <CheckCircle2 size={10} className="text-emerald-500" />
                    {k}
                  </span>
                  <span className="font-semibold text-slate-800">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {m.kind === "vendor-card" && (
          <div className="w-64 overflow-hidden rounded-2xl rounded-bl-sm bg-white shadow-sm ring-1 ring-emerald-100">
            <div className="bg-emerald-50 px-3 py-2 text-[10px] font-bold text-emerald-700">
              訪問可能業者
            </div>
            <div className="px-3 py-3 text-[11px]">
              <div className="font-bold text-slate-900">株式会社○○設備</div>
              <div className="mt-0.5 text-slate-500">青山1丁目 / 評価 ★4.8</div>
              <div className="mt-2 rounded-lg bg-slate-50 px-2 py-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">訪問可能日時</span>
                  <span className="font-semibold text-slate-800">5/21 (火) 10:00</span>
                </div>
                <div className="mt-1 flex justify-between">
                  <span className="text-slate-500">作業費用</span>
                  <span className="font-semibold text-slate-800">¥28,600 (税込)</span>
                </div>
              </div>
              <div className="mt-2 text-[10px] text-emerald-600">
                ※ 管理会社負担のため入居者様のご負担なし
              </div>
            </div>
          </div>
        )}

        <div className={`flex items-center gap-1 px-1 text-[9px] text-white/80 ${isUser ? "" : "text-slate-400"}`}>
          {isUser && <span className="text-emerald-100">既読</span>}
          <span className={isUser ? "text-emerald-100" : "text-slate-400"}>{m.time}</span>
        </div>
      </div>
    </li>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400"
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}
