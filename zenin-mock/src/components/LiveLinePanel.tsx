"use client";

import { useEffect, useState } from "react";
import {
  Smartphone,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  ImageIcon,
} from "lucide-react";

type LiveRepair = {
  id: string;
  source: "line";
  userId: string;
  userName?: string;
  receivedAt: string;
  initialMessage?: string;
  hasPhoto: boolean;
  diagnosis?: { device: string; symptom: string; urgency: string; cause: string };
  status: string;
  conversation: { from: string; kind: string; text?: string; at: string }[];
};

export default function LiveLinePanel() {
  const [repairs, setRepairs] = useState<LiveRepair[]>([]);
  const [loading, setLoading] = useState(false);
  const [hideEmpty, setHideEmpty] = useState(false);

  const fetchRepairs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/repairs", { cache: "no-store" });
      if (res.ok) {
        const json = (await res.json()) as { repairs: LiveRepair[] };
        setRepairs(json.repairs);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepairs();
    const t = setInterval(fetchRepairs, 5000);
    return () => clearInterval(t);
  }, []);

  if (repairs.length === 0 && hideEmpty) return null;

  return (
    <section className="mb-7 rounded-2xl border border-emerald-200 bg-white shadow-soft">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white">
            <Smartphone size={18} />
          </span>
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              LINE経由の受付 (Live)
              <span className="ml-2 inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                5秒ごとに自動更新
              </span>
            </h2>
            <p className="text-[11px] text-slate-500">
              実LINE公式アカウントから受信した修繕案件をリアルタイム表示
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
            {repairs.length} 件
          </span>
          <button
            type="button"
            onClick={fetchRepairs}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            type="button"
            onClick={() => setHideEmpty(true)}
            className="text-[11px] text-slate-400 hover:text-slate-600"
            title="このセッションでは非表示"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="px-6 py-4">
        {repairs.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center">
            <Sparkles size={20} className="text-slate-300" />
            <div className="text-sm font-semibold text-slate-600">
              まだ実機経由の受信はありません
            </div>
            <div className="text-[11px] text-slate-500">
              LINE公式アカウントで友だち追加してメッセージを送ると、ここに表示されます。
              <br />
              環境変数 <code className="rounded bg-white px-1 py-px text-[10px] text-slate-700">LINE_CHANNEL_SECRET</code> /{" "}
              <code className="rounded bg-white px-1 py-px text-[10px] text-slate-700">LINE_CHANNEL_ACCESS_TOKEN</code> の設定が必要です。
            </div>
          </div>
        ) : (
          <ul className="space-y-3">
            {repairs.map((r) => (
              <li key={r.id} className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-emerald-300">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                        <Smartphone size={10} /> LINE
                      </span>
                      <span className="text-sm font-bold text-slate-900">
                        {r.userName ?? r.userId.slice(0, 10)} 様
                      </span>
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
                        {r.id}
                      </span>
                    </div>
                    {r.initialMessage && (
                      <div className="mt-2 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-700">
                        💬 {r.initialMessage}
                      </div>
                    )}
                    {r.diagnosis && (
                      <div className="mt-2 flex flex-wrap gap-1.5 text-[11px]">
                        <Tag label={`設備: ${r.diagnosis.device}`} />
                        <Tag label={`症状: ${r.diagnosis.symptom}`} />
                        <Tag label={`緊急度: ${r.diagnosis.urgency}`} />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold text-white">
                      {r.status}
                    </span>
                    {r.hasPhoto && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-slate-500">
                        <ImageIcon size={11} /> 写真あり
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400 tabular">
                      {new Date(r.receivedAt).toLocaleString("ja-JP", { hour12: false })}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-[10px] text-emerald-700">
                  <CheckCircle2 size={11} />
                  AIが返信済み ・ 会話 {r.conversation.length} 件
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded bg-slate-100 px-1.5 py-0.5 font-medium text-slate-700">
      {label}
    </span>
  );
}
