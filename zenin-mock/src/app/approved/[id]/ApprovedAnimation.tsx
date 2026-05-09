"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Mail, Wallet, ArrowRight } from "lucide-react";

const tasks = [
  { id: 1, label: "オーナーへの報告メールを自動送信中", icon: Mail },
  { id: 2, label: "請求書を会計システムへ連携中", icon: Wallet },
];

export default function ApprovedAnimation({ repairId }: { repairId: string }) {
  const [done, setDone] = useState<number[]>([]);

  useEffect(() => {
    const t1 = setTimeout(() => setDone((d) => [...d, 1]), 1100);
    const t2 = setTimeout(() => setDone((d) => [...d, 2]), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const allDone = done.length === tasks.length;

  return (
    <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-lift animate-floatIn">
      {/* big check */}
      <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-brand-500 text-white shadow-lift">
        <CheckCircle2 size={56} strokeWidth={2.4} />
        <span className="absolute inset-0 -z-10 rounded-full bg-brand-300 opacity-40 animate-ping2" />
      </div>

      <h1 className="mt-7 text-3xl font-extrabold text-slate-900">承認が完了しました</h1>
      <p className="mt-2 text-sm text-slate-500 tabular">案件番号: {repairId}</p>

      <ul className="mt-9 space-y-3 text-left">
        {tasks.map((t) => {
          const isDone = done.includes(t.id);
          const Icon = t.icon;
          return (
            <li
              key={t.id}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition ${
                isDone ? "border-brand-200 bg-brand-50/50" : "border-slate-200 bg-white"
              }`}
            >
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  isDone ? "bg-brand-500 text-white" : "bg-slate-100 text-slate-400"
                }`}
              >
                {isDone ? <CheckCircle2 size={18} /> : <Icon size={18} />}
              </div>
              <div className="flex-1 text-sm font-semibold text-slate-800">{t.label}</div>
              {isDone ? (
                <span className="text-[11px] font-bold text-brand-600">完了</span>
              ) : (
                <Loader2 size={16} className="animate-spin text-slate-400" />
              )}
            </li>
          );
        })}
      </ul>

      {allDone && (
        <div className="mt-8 animate-floatIn rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          すべての後続処理が完了しました
        </div>
      )}

      <Link
        href="/dashboard"
        className="mt-9 inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
      >
        ダッシュボードへ戻る
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}
