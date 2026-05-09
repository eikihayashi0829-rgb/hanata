"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircle2, RotateCcw, Loader2 } from "lucide-react";

export default function ApprovalBar({ repairId }: { repairId: string }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const onApprove = () => {
    setSubmitting(true);
    setTimeout(() => router.push(`/approved/${repairId}`), 350);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 ml-64 border-t-2 border-brand-500 bg-white/95 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.15)] backdrop-blur">
      <div className="flex items-center justify-between gap-6 px-8 py-4">
        <div>
          <div className="text-sm font-bold text-slate-900">上記の内容で承認しますか？</div>
          <div className="mt-0.5 text-xs text-slate-500">
            承認すると、オーナーへの報告および支払処理に進みます。
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={submitting}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            <RotateCcw size={14} />
            差し戻す
          </button>
          <button
            type="button"
            onClick={onApprove}
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-7 py-3 text-sm font-bold text-white shadow-lift transition hover:bg-brand-600 disabled:opacity-70"
          >
            {submitting ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
            {submitting ? "承認処理中..." : "承認する"}
          </button>
        </div>
      </div>
    </div>
  );
}
