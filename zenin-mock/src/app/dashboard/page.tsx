import Link from "next/link";
import {
  Bell,
  Search,
  Smartphone,
  Sparkles,
  CheckCircle2,
  Clock3,
  TimerReset,
  Activity,
  ArrowRight,
  Phone,
  Brain,
  ClipboardList,
  Database,
  Shield,
  FileText,
  MessageCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { aiActivities, dashboardStats, pendingRepairs, AiActivity } from "@/lib/mockData";

const activityIcon: Record<AiActivity["type"], LucideIcon> = {
  intake: MessageCircle,
  diagnose: Brain,
  contact: Phone,
  quote: ClipboardList,
  report: FileText,
  history: Database,
  compliance: Shield,
};

const activityColor: Record<AiActivity["type"], string> = {
  intake: "bg-sky-50 text-sky-600",
  diagnose: "bg-violet-50 text-violet-600",
  contact: "bg-amber-50 text-amber-600",
  quote: "bg-rose-50 text-rose-600",
  report: "bg-brand-50 text-brand-600",
  history: "bg-slate-100 text-slate-600",
  compliance: "bg-emerald-50 text-emerald-600",
};

export default function DashboardPage() {
  const stats = [
    {
      label: "AI完了タスク (本日)",
      value: dashboardStats.aiCompleted,
      unit: "件",
      icon: CheckCircle2,
      iconClass: "bg-brand-50 text-brand-600",
      delta: "+8 vs 昨日",
    },
    {
      label: "承認待ち",
      value: dashboardStats.pendingApproval,
      unit: "件",
      icon: Clock3,
      iconClass: "bg-amber-50 text-amber-600",
      delta: "要対応",
    },
    {
      label: "平均応答時間",
      value: dashboardStats.avgResponseMin,
      unit: "分",
      icon: TimerReset,
      iconClass: "bg-sky-50 text-sky-600",
      delta: "-32% vs 先月",
    },
    {
      label: "削減時間 (今月)",
      value: dashboardStats.savedHoursThisMonth,
      unit: "時間",
      icon: Sparkles,
      iconClass: "bg-violet-50 text-violet-600",
      delta: "+24h vs 先月",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div className="ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">ダッシュボード</h1>
            <p className="text-xs text-slate-500">2024年5月20日 (月) - AIが今日も裏側で稼働中</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/line"
              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
            >
              <Smartphone size={14} />
              入居者LINE画面
            </Link>
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
              <Search size={14} />
              <span>検索...</span>
            </div>
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
              <Bell size={16} />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>
          </div>
        </header>

        <main className="px-8 py-8">
          {/* AI Banner */}
          <div className="mb-7 flex items-center justify-between rounded-2xl border border-brand-200 bg-gradient-to-r from-brand-50 via-white to-white p-5 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500 text-white shadow">
                <Sparkles size={22} />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-brand-700">本日のAI処理状況</div>
                <div className="text-base font-semibold text-slate-900">
                  全任エージェントが <span className="text-brand-600">23件</span> の修繕業務を自動処理しました
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-600">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              現在 5件 を処理中
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
                <div className="flex items-start justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.iconClass}`}>
                    <s.icon size={20} />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500">{s.delta}</span>
                </div>
                <div className="mt-4 text-xs font-medium text-slate-500">{s.label}</div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="tabular text-3xl font-extrabold text-slate-900">{s.value}</span>
                  <span className="text-sm font-medium text-slate-500">{s.unit}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Main grid */}
          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
            {/* Pending repairs table */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-soft">
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">承認待ちタスク一覧</h2>
                  <p className="mt-0.5 text-xs text-slate-500">AIが処理を完了し、最終承認をお待ちしています</p>
                </div>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold text-amber-700">
                  {pendingRepairs.length} 件
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      <th className="px-6 py-3">物件 / 入居者</th>
                      <th className="px-6 py-3">依頼内容</th>
                      <th className="px-6 py-3">AI処理状況</th>
                      <th className="px-6 py-3">受付</th>
                      <th className="px-6 py-3 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {pendingRepairs.map((r) => (
                      <tr key={r.id} className="transition hover:bg-slate-50/60">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-slate-900">
                            {r.propertyName} <span className="text-slate-400">/</span> {r.roomNo}
                          </div>
                          <div className="mt-0.5 text-xs text-slate-500">{r.tenantName} 様</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-slate-800">{r.issue}</div>
                          <div className="mt-0.5 inline-block rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
                            {r.category}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                            <CheckCircle2 size={12} />
                            自動処理完了
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-500 tabular">{r.aiCompletedAt}</td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/repair/${r.id}`}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                          >
                            確認
                            <ArrowRight size={12} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Activity feed */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-soft">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <div className="flex items-center gap-2">
                  <Activity size={16} className="text-brand-600" />
                  <h2 className="text-sm font-bold text-slate-900">リアルタイム活動</h2>
                </div>
                <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  Live
                </span>
              </div>
              <ol className="px-5 py-2">
                {aiActivities.map((a, i) => {
                  const Icon = activityIcon[a.type];
                  return (
                    <li
                      key={a.id}
                      className="relative flex gap-3 border-l border-slate-100 py-3 pl-5 last:border-l-transparent"
                    >
                      <span className={`absolute -left-[11px] top-3.5 flex h-5 w-5 items-center justify-center rounded-full ring-4 ring-white ${activityColor[a.type]}`}>
                        <Icon size={11} />
                      </span>
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-slate-800">{a.action}</div>
                        <div className="mt-0.5 text-[11px] text-slate-500">{a.target}</div>
                        <div className="mt-1 text-[10px] text-slate-400 tabular">{a.time} · 自動</div>
                      </div>
                      {i === 0 && (
                        <span className="self-start rounded bg-brand-50 px-1.5 py-0.5 text-[9px] font-bold text-brand-700">
                          NEW
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
