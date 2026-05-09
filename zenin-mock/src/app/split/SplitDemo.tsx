"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Send,
  Sparkles,
  CheckCircle2,
  Camera,
  Wifi,
  Battery,
  Signal,
  Phone,
  Video,
  Plus,
  Smile,
  Mic,
  Image as ImageIcon,
  Brain,
  ClipboardList,
  Database,
  Shield,
  FileText,
  Building,
  Activity,
  PlayCircle,
} from "lucide-react";
import Logo from "@/components/Logo";

type StepDef = {
  id: number;
  label: string;
  // What gets added to LINE
  line?: { from: "user" | "bot"; kind: "text" | "photo" | "ai-card" | "vendor-card"; text?: string; time: string };
  // What gets added to admin activity feed
  admin?: { time: string; action: string; target: string; type: "intake" | "diagnose" | "contact" | "quote" | "report" | "history" | "compliance" };
  // Side effects
  setStatus?: string;
};

const steps: StepDef[] = [
  {
    id: 1,
    label: "入居者がLINEで一次連絡",
    line: { from: "user", kind: "text", text: "エアコンが冷えません", time: "14:32" },
    admin: { time: "14:32", action: "入居者からLINE一次受付", target: "田中様 (グランドメゾン青山 101)", type: "intake" },
    setStatus: "新規受付",
  },
  {
    id: 2,
    label: "AIが写真を依頼",
    line: { from: "bot", kind: "text", text: "状況確認のためお写真を送っていただけますか？", time: "14:32" },
  },
  {
    id: 3,
    label: "入居者が写真を送信",
    line: { from: "user", kind: "photo", time: "14:33" },
    admin: { time: "14:33", action: "故障写真を受信・解析開始", target: "エアコン_IMG_2840.jpg", type: "intake" },
  },
  {
    id: 4,
    label: "AIが故障を判定",
    line: { from: "bot", kind: "ai-card", time: "14:33" },
    admin: { time: "14:33", action: "AI故障判定: エアコン/冷風出ず/緊急度中", target: "推定原因: 冷媒漏れ", type: "diagnose" },
    setStatus: "AI判定中",
  },
  {
    id: 5,
    label: "登録業者3社へ自動連絡",
    admin: { time: "14:25", action: "業者3社へ自動連絡", target: "○○設備 / □□工務店 / △△サービス", type: "contact" },
    setStatus: "業者調整中",
  },
  {
    id: 6,
    label: "見積を比較し最安業者を選定",
    admin: { time: "14:31", action: "見積を比較・最安業者を選定", target: "B社 ¥26,400", type: "quote" },
  },
  {
    id: 7,
    label: "入居者へ業者を提案",
    line: { from: "bot", kind: "vendor-card", time: "14:34" },
  },
  {
    id: 8,
    label: "入居者が承諾",
    line: { from: "user", kind: "text", text: "明日10時で大丈夫です🙏", time: "14:35" },
  },
  {
    id: 9,
    label: "AIが各種書類を自動生成",
    line: { from: "bot", kind: "text", text: "確定しました。明日10時に業者がお伺いします。書類はすべて当方で作成します。", time: "14:35" },
    admin: { time: "14:34", action: "修繕報告書・請求書を自動作成", target: "RP-2024-0520-001", type: "report" },
    setStatus: "承認待ち",
  },
];

type LineMsg = {
  id: number;
  from: "user" | "bot";
  kind: "text" | "photo" | "ai-card" | "vendor-card";
  text?: string;
  time: string;
};

export default function SplitDemo() {
  const [stepIdx, setStepIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [lineMsgs, setLineMsgs] = useState<LineMsg[]>([
    { id: 0, from: "bot", kind: "text", text: "こんにちは、AI管理サポート「全任」です。", time: "14:30" },
  ]);
  const [activities, setActivities] = useState<{ time: string; action: string; target: string; type: string; id: number }[]>([]);
  const [status, setStatus] = useState("待機中");
  const lineRef = useRef<HTMLDivElement>(null);
  const adminRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lineRef.current?.scrollTo({ top: lineRef.current.scrollHeight, behavior: "smooth" });
    adminRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [lineMsgs, activities]);

  const advance = () => {
    if (stepIdx >= steps.length) return;
    const s = steps[stepIdx];
    if (s.line) setLineMsgs((m) => [...m, { id: m.length + 1, ...s.line! }]);
    if (s.admin) setActivities((a) => [{ id: a.length + 1, ...s.admin! }, ...a]);
    if (s.setStatus) setStatus(s.setStatus);
    setStepIdx((i) => i + 1);
  };

  useEffect(() => {
    if (!playing) return;
    if (stepIdx >= steps.length) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(advance, 1400);
    return () => clearTimeout(t);
  }, [playing, stepIdx]);

  const reset = () => {
    setStepIdx(0);
    setLineMsgs([{ id: 0, from: "bot", kind: "text", text: "こんにちは、AI管理サポート「全任」です。", time: "14:30" }]);
    setActivities([]);
    setStatus("待機中");
    setPlaying(false);
  };

  const completed = stepIdx >= steps.length;
  const progress = Math.round((stepIdx / steps.length) * 100);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white">
      {/* Top bar */}
      <header className="border-b border-white/10 bg-slate-900/60 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white">
              <ArrowLeft size={14} />
              戻る
            </Link>
            <div className="hidden h-5 w-px bg-white/20 md:block" />
            <div className="hidden md:block"><Logo /></div>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold tracking-widest text-emerald-300">
              LIVE DEMO
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right md:block">
              <div className="text-[10px] uppercase tracking-widest text-slate-400">案件ステータス</div>
              <div className="text-sm font-bold text-emerald-300">{status}</div>
            </div>
            <button
              type="button"
              onClick={() => {
                if (completed) reset();
                else setPlaying((p) => !p);
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-600"
            >
              <PlayCircle size={14} />
              {completed ? "もう一度再生" : playing ? "一時停止" : "自動再生"}
            </button>
            <button
              type="button"
              onClick={advance}
              disabled={completed}
              className="inline-flex items-center gap-1 rounded-xl border border-white/20 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10 disabled:opacity-40"
            >
              手動で進める
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
        {/* Progress */}
        <div className="h-1 w-full bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-300 transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] gap-8 px-6 py-8 lg:grid-cols-[400px_1fr]">
        {/* LEFT: LINE phone */}
        <div className="flex flex-col items-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-[11px] font-bold text-emerald-300">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            入居者の画面 (LINE)
          </div>
          <div className="relative h-[640px] w-[320px] overflow-hidden rounded-[2.5rem] border-[10px] border-slate-950 bg-black shadow-2xl">
            <div className="absolute left-1/2 top-0 z-30 h-6 w-32 -translate-x-1/2 rounded-b-[1.2rem] bg-slate-950" />
            <div className="relative flex h-full w-full flex-col bg-[#7d96b6]">
              <div className="flex items-center justify-between bg-emerald-500 px-6 pt-2 pb-1 text-[10px] font-semibold text-white">
                <span className="tabular">14:35</span>
                <span className="flex items-center gap-1.5">
                  <Signal size={10} />
                  <Wifi size={11} />
                  <Battery size={13} />
                </span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-500 px-3 pb-2 pt-1 text-white">
                <ArrowLeft size={16} />
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-emerald-600">
                  <Sparkles size={14} />
                </div>
                <div className="flex-1 text-[11px] font-bold leading-tight">
                  全任サポート
                  <div className="text-[9px] font-normal text-emerald-50">公式アカウント</div>
                </div>
                <Phone size={14} />
                <Video size={14} />
              </div>
              <div ref={lineRef} className="flex-1 overflow-y-auto px-2 py-3 scrollbar-thin">
                <div className="mx-auto mb-3 w-fit rounded-full bg-white/40 px-2 py-0.5 text-[9px] font-semibold text-slate-700">
                  2024年5月20日 (月)
                </div>
                <ul className="space-y-2">
                  {lineMsgs.map((m) => <MiniBubble key={m.id} m={m} />)}
                </ul>
              </div>
              <div className="flex items-center gap-1 bg-white px-2 py-2">
                <Plus size={16} className="text-slate-500" />
                <Camera size={16} className="text-slate-500" />
                <ImageIcon size={16} className="text-slate-500" />
                <div className="flex-1 truncate rounded-full bg-slate-100 px-2 py-1 text-[10px] text-slate-400">
                  メッセージを入力
                </div>
                <Smile size={16} className="text-slate-500" />
                <Mic size={16} className="text-slate-500" />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Admin dashboard */}
        <div className="flex flex-col gap-4">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/10 px-3 py-1 text-[11px] font-bold text-sky-300">
            <Building size={12} />
            管理会社の画面 (ダッシュボード)
          </div>

          {/* Mini dashboard preview */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white text-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-3">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500">RP-2024-0520-001</div>
                <div className="text-base font-bold">グランドメゾン青山 101 / 田中 太郎 様</div>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700">
                {status}
              </span>
            </div>

            {/* Stat cards mini */}
            <div className="grid grid-cols-3 gap-3 border-b border-slate-200 px-6 py-4">
              {[
                { l: "AI処理ステップ", v: stepIdx, t: `/${steps.length}` },
                { l: "削減時間", v: Math.round((stepIdx / steps.length) * 42), t: "分" },
                { l: "対応コスト", v: completed ? "¥28,600" : "計算中", t: "" },
              ].map((c) => (
                <div key={c.l} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="text-[10px] font-medium text-slate-500">{c.l}</div>
                  <div className="mt-1 flex items-baseline gap-0.5">
                    <span className="tabular text-xl font-extrabold text-slate-900">{c.v}</span>
                    <span className="text-[10px] text-slate-500">{c.t}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Activity feed live */}
            <div className="px-6 py-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold">
                  <Activity size={16} className="text-emerald-600" />
                  リアルタイム自動処理ログ
                </div>
                <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  Live
                </span>
              </div>
              <div ref={adminRef} className="max-h-72 overflow-y-auto scrollbar-thin">
                {activities.length === 0 ? (
                  <div className="flex h-32 flex-col items-center justify-center gap-2 text-xs text-slate-400">
                    <Sparkles size={20} />
                    入居者からの連絡を待機中
                  </div>
                ) : (
                  <ol>
                    {activities.map((a, i) => {
                      const Icon = iconMap[a.type as keyof typeof iconMap];
                      const colorClass = colorMap[a.type as keyof typeof colorMap];
                      return (
                        <li
                          key={a.id}
                          className="relative flex animate-floatIn gap-3 border-l border-slate-100 py-2.5 pl-5"
                        >
                          <span className={`absolute -left-[11px] top-3 flex h-5 w-5 items-center justify-center rounded-full ring-4 ring-white ${colorClass}`}>
                            <Icon size={11} />
                          </span>
                          <div className="flex-1">
                            <div className="text-xs font-semibold text-slate-800">{a.action}</div>
                            <div className="mt-0.5 text-[10px] text-slate-500">{a.target}</div>
                            <div className="mt-0.5 text-[9px] text-slate-400 tabular">{a.time} · 自動</div>
                          </div>
                          {i === 0 && (
                            <span className="self-start rounded bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700">
                              NEW
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                )}
              </div>
            </div>
          </div>

          {/* Step list */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-300">
              実行されるステップ ({stepIdx}/{steps.length})
            </div>
            <ol className="space-y-1.5 text-xs">
              {steps.map((s, i) => {
                const done = i < stepIdx;
                const current = i === stepIdx;
                return (
                  <li
                    key={s.id}
                    className={`flex items-center gap-2 rounded-lg px-2 py-1.5 transition ${
                      current ? "bg-emerald-500/20 ring-1 ring-emerald-400" : ""
                    }`}
                  >
                    <span className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                      done ? "bg-emerald-500 text-white" : current ? "bg-emerald-300 text-emerald-900" : "bg-white/10 text-slate-400"
                    }`}>
                      {done ? <CheckCircle2 size={11} /> : i + 1}
                    </span>
                    <span className={done ? "text-slate-400 line-through" : current ? "font-bold text-white" : "text-slate-300"}>
                      {s.label}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          {completed && (
            <div className="animate-floatIn rounded-2xl border border-emerald-400/40 bg-emerald-500/20 p-5 text-center">
              <CheckCircle2 className="mx-auto text-emerald-300" size={28} />
              <div className="mt-2 text-base font-extrabold text-white">AI一次対応がすべて完了しました</div>
              <div className="mt-1 text-xs text-emerald-200">
                担当者は最終承認ボタンを1回押すだけで案件がクローズします
              </div>
              <Link
                href="/repair/RP-2024-0520-001"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-600"
              >
                承認画面を見る
                <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </div>

      <footer className="border-t border-white/5 px-6 py-6 text-center text-[11px] text-slate-500">
        ※ 投資家デモ用のシミュレーションです。本番環境では LINE Messaging API + AI ゲートウェイ経由で同等の処理が走ります。
      </footer>
    </main>
  );
}

const iconMap = {
  intake: Phone,
  diagnose: Brain,
  contact: Phone,
  quote: ClipboardList,
  report: FileText,
  history: Database,
  compliance: Shield,
};

const colorMap = {
  intake: "bg-sky-50 text-sky-600",
  diagnose: "bg-violet-50 text-violet-600",
  contact: "bg-amber-50 text-amber-600",
  quote: "bg-rose-50 text-rose-600",
  report: "bg-emerald-50 text-emerald-600",
  history: "bg-slate-100 text-slate-600",
  compliance: "bg-emerald-50 text-emerald-600",
};

function MiniBubble({ m }: { m: LineMsg }) {
  const isUser = m.from === "user";
  return (
    <li className={`flex items-end gap-1.5 ${isUser ? "justify-end" : "justify-start"} animate-floatIn`}>
      {!isUser && (
        <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white text-emerald-500 shadow">
          <Sparkles size={10} />
        </div>
      )}
      <div className={`flex max-w-[80%] flex-col gap-0.5 ${isUser ? "items-end" : "items-start"}`}>
        {m.kind === "text" && (
          <div
            className={`rounded-2xl px-2.5 py-1.5 text-[11px] leading-relaxed shadow-sm ${
              isUser ? "rounded-br-sm bg-emerald-400 text-white" : "rounded-bl-sm bg-white text-slate-800"
            }`}
          >
            {m.text}
          </div>
        )}
        {m.kind === "photo" && (
          <div className="overflow-hidden rounded-xl shadow-sm">
            <div className="flex h-20 w-28 items-center justify-center bg-gradient-to-br from-slate-200 to-slate-400 text-slate-600">
              <Camera size={20} />
            </div>
          </div>
        )}
        {m.kind === "ai-card" && (
          <div className="w-52 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-emerald-100">
            <div className="bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-700">AI判定結果</div>
            <div className="space-y-0.5 px-2 py-1.5 text-[10px]">
              {[["設備", "エアコン"], ["症状", "冷風出ず"], ["緊急度", "中"]].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-slate-500">{k}</span>
                  <span className="font-semibold text-slate-800">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {m.kind === "vendor-card" && (
          <div className="w-52 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-emerald-100">
            <div className="bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-700">業者提案</div>
            <div className="px-2 py-1.5 text-[10px]">
              <div className="font-bold text-slate-900">株式会社○○設備</div>
              <div className="text-[9px] text-slate-500">5/21 (火) 10:00 / ¥28,600</div>
            </div>
          </div>
        )}
        <div className="px-1 text-[8px] text-slate-300">{m.time}</div>
      </div>
    </li>
  );
}
