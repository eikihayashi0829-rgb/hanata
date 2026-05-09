import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Camera,
  FileText,
  Receipt,
  History,
  Eye,
  Building2,
  User,
  Calendar,
  Wrench,
  ShieldCheck,
  StickyNote,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { repairDetail } from "@/lib/mockData";
import ApprovalBar from "./ApprovalBar";

const docIcons = {
  report: FileText,
  invoice: Receipt,
  history: History,
} as const;

export default function RepairDetailPage({ params }: { params: { id: string } }) {
  const r = repairDetail;

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      <Sidebar />
      <div className="ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900"
            >
              <ArrowLeft size={14} />
              ダッシュボード
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-xs text-slate-500">修繕管理</span>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-semibold text-slate-900">{params.id}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="tabular">{params.id}</span>
          </div>
        </header>

        <main className="px-8 py-8">
          {/* Success banner */}
          <div className="mb-7 overflow-hidden rounded-2xl border border-brand-200 bg-gradient-to-r from-brand-500 to-brand-600 shadow-lift">
            <div className="flex items-center gap-5 px-7 py-5 text-white">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/40">
                <CheckCircle2 size={28} strokeWidth={2.4} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-brand-100">
                  <Sparkles size={12} />
                  ZENIN AI
                </div>
                <div className="mt-1 text-lg font-extrabold">
                  AIが修繕業務を自動処理しました
                </div>
                <div className="mt-0.5 text-sm text-brand-50">
                  報告書作成・請求書整理・履歴保存が完了しています。最終承認をお願いします。
                </div>
              </div>
              <div className="hidden items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold ring-1 ring-white/30 md:inline-flex">
                処理時間 47秒
              </div>
            </div>
          </div>

          {/* 2x2 grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* (左上) 修繕依頼サマリー */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900">修繕依頼サマリー</h2>
                <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-brand-700">
                  <CheckCircle2 size={12} />
                  自動処理完了
                </span>
              </div>

              <div className="mt-5 flex gap-5">
                <div className="flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-100 to-slate-200 text-slate-400 ring-1 ring-slate-200">
                  <Camera size={36} />
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  <Field icon={Building2} label="物件名" value={r.propertyName} />
                  <Field icon={User} label="入居者" value={`${r.tenantName} 様`} />
                  <Field icon={Wrench} label="依頼内容" value={r.issue} />
                  <Field icon={Calendar} label="受付日時" value={r.receivedAt} />
                  <div className="mt-1">
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                      <CheckCircle2 size={11} /> {r.status}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* (右上) AI処理済みタスク */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900">AI処理済みタスク</h2>
                <span className="text-[11px] font-semibold text-slate-500">
                  {r.aiTasks.length}/{r.aiTasks.length} 完了
                </span>
              </div>
              <ul className="mt-4 space-y-2.5">
                {r.aiTasks.map((t, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3"
                  >
                    <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-brand-500" />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-slate-800">{t}</div>
                      <div className="mt-0.5 text-[11px] text-slate-500 tabular">2024/05/20 14:34</div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* (左下) 作成された書類 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900">作成された書類</h2>
                <span className="text-[11px] font-semibold text-slate-500">3 件</span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {r.documents.map((d) => {
                  const Icon = docIcons[d.type];
                  return (
                    <div
                      key={d.type}
                      className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand-300 hover:shadow-soft"
                    >
                      <div className="flex h-20 w-full items-center justify-center rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 text-slate-400 ring-1 ring-slate-200/60">
                        <Icon size={28} className="text-brand-500" />
                      </div>
                      <div className="mt-3 text-xs font-bold text-slate-900">{d.title}</div>
                      <div className="mt-0.5 text-[10px] text-slate-500">{d.sub}</div>
                      <Link
                        href={`/document/${d.type}`}
                        className="mt-3 inline-flex items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                      >
                        <Eye size={12} />
                        プレビュー
                      </Link>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* (右下) 関連情報 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900">関連情報</h2>
                <span className="text-[11px] font-semibold text-slate-500">業者対応 ・ 保証</span>
              </div>
              <dl className="mt-4 space-y-3 text-sm">
                <Row icon={Building2} label="対応業者" value={r.vendor.name} />
                <Row icon={Calendar} label="作業完了日時" value={r.vendor.workCompletedAt} />
                <Row icon={Wrench} label="作業内容" value={r.vendor.workDetail} />
                <Row icon={ShieldCheck} label="保証期間" value={r.vendor.warranty} />
                <Row icon={StickyNote} label="備考" value={r.vendor.note} />
              </dl>
            </section>
          </div>

          {/* Quote summary */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">AIによる業者見積比較</h2>
              <span className="text-[11px] font-semibold text-slate-500">3社の見積を自動取得・比較</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {r.quotes.map((q) => (
                <div
                  key={q.vendor}
                  className={`rounded-xl border p-4 ${
                    q.selected
                      ? "border-brand-300 bg-brand-50/50 ring-2 ring-brand-200"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-semibold text-slate-700">{q.vendor}</div>
                    {q.selected && (
                      <span className="rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-bold text-white">
                        AI選定
                      </span>
                    )}
                  </div>
                  <div className="mt-3 tabular text-2xl font-extrabold text-slate-900">
                    ¥{q.amount.toLocaleString()}
                  </div>
                  <div className="mt-1 text-[10px] text-slate-500">税抜 / 出張費込</div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      <ApprovalBar repairId={params.id} />
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-baseline gap-3">
      <div className="flex w-24 items-center gap-1.5 text-[11px] font-medium text-slate-500">
        <Icon size={12} />
        {label}
      </div>
      <div className="font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
      <div className="flex w-32 flex-shrink-0 items-center gap-1.5 pt-0.5 text-[11px] font-medium text-slate-500">
        <Icon size={13} />
        {label}
      </div>
      <div className="flex-1 text-sm text-slate-800">{value}</div>
    </div>
  );
}
