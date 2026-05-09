import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  FileText,
  Plus,
  Sparkles,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { mockJobs, mockStats, type JobStatus } from "@/lib/mockData";
import { formatJpy } from "@/lib/utils";

const statusTone: Record<JobStatus, "warning" | "info" | "brand" | "success" | "muted"> = {
  見積待ち: "warning",
  業者選定中: "info",
  作業中: "brand",
  完了: "success",
  キャンセル: "muted",
};

export default function ManagerDashboardPage() {
  const urgent = mockJobs.filter(
    (j) => j.urgency === "即時" && j.status !== "完了",
  );
  const inProgress = mockJobs.filter((j) => j.status !== "完了");
  const completedThisMonth = mockJobs.filter((j) => j.status === "完了");

  return (
    <AppShell role="manager" title="ダッシュボード">
      <div className="space-y-5 animate-fade-in">
        {/* Greeting */}
        <div>
          <p className="text-sm text-slate-500">こんばんは、鈴木さん</p>
          <h1 className="mt-0.5 text-2xl font-bold tracking-tight">
            今夜の対応、3件あります。
          </h1>
        </div>

        {/* Urgent alert */}
        {urgent.length > 0 && (
          <Card className="border-danger-100 bg-gradient-to-br from-danger-50 to-white">
            <CardContent className="flex items-start gap-3 p-5">
              <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-danger-600 text-white">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-danger-700">
                    緊急案件 {urgent.length}件
                  </span>
                  <span className="inline-block h-2 w-2 animate-pulse-dot rounded-full bg-danger-600" />
                </div>
                <p className="mt-0.5 text-sm text-slate-700">
                  即時対応が必要な案件があります
                </p>
                <div className="mt-3 space-y-2">
                  {urgent.map((j) => (
                    <Link
                      key={j.id}
                      href={`/manager/jobs/${j.id}`}
                      className="flex items-center justify-between rounded-xl border border-danger-100 bg-white px-3 py-2.5 hover:border-danger-200"
                    >
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium">
                          {j.title}
                        </div>
                        <div className="truncate text-xs text-slate-500">
                          {j.propertyName}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 flex-shrink-0 text-slate-400" />
                    </Link>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick action */}
        <Link href="/manager/jobs/new" className="block">
          <Button size="lg" className="w-full">
            <Plus className="h-5 w-5" />
            新規案件を投稿する
          </Button>
        </Link>

        {/* Summary stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Clock className="h-3.5 w-3.5" />
                今月の節約工数
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-bold tracking-tight">
                  {mockStats.hoursReducedPerCompany}
                </span>
                <span className="text-sm text-slate-500">時間</span>
              </div>
              <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                <TrendingUp className="h-3 w-3" /> 前月比 +8h
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <CheckCircle2 className="h-3.5 w-3.5" />
                今月の対応件数
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-bold tracking-tight">
                  {completedThisMonth.length + inProgress.length}
                </span>
                <span className="text-sm text-slate-500">件</span>
              </div>
              <div className="mt-1 text-[11px] text-slate-500">
                完了 {completedThisMonth.length} / 進行中 {inProgress.length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* In-progress jobs */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>進行中の案件</CardTitle>
            <Badge tone="muted">{inProgress.length}件</Badge>
          </CardHeader>
          <CardContent className="space-y-2.5 pt-0">
            {inProgress.map((j) => (
              <Link
                key={j.id}
                href={`/manager/jobs/${j.id}`}
                className="block rounded-xl border border-slate-200 p-3.5 transition-colors hover:border-brand-300 hover:bg-brand-50/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {j.urgency === "即時" && (
                        <Badge tone="danger">緊急</Badge>
                      )}
                      <Badge tone={statusTone[j.status]}>{j.status}</Badge>
                    </div>
                    <div className="mt-1.5 truncate text-[15px] font-semibold">
                      {j.title}
                    </div>
                    <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                      <Building2 className="h-3 w-3" />
                      <span className="truncate">{j.propertyName}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500">予算</div>
                    <div className="text-sm font-semibold tabular-nums">
                      {formatJpy(j.budget)}
                    </div>
                  </div>
                </div>
                <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2.5 text-xs text-slate-500">
                  <span>{j.quotes.length}件の見積</span>
                  <span>{j.postedAt.replace("2026-", "")}</span>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Owner report shortcut */}
        <Card className="border-brand-100 bg-gradient-to-br from-brand-50 to-white">
          <CardContent className="flex items-start gap-3 p-5">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-700 text-white">
              <FileText className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-brand-700" />
                <span className="text-xs font-semibold text-brand-700">
                  AI自動生成
                </span>
              </div>
              <div className="mt-0.5 font-semibold">
                オーナー向け月次レポート
              </div>
              <p className="mt-1 text-xs text-slate-600">
                山田一郎様（サンライズマンション）の5月分が完成しました
              </p>
              <div className="mt-3">
                <Link href="/manager/report/rep-001">
                  <Button size="sm" variant="outline">
                    プレビューを見る <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer nav */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Link
            href="/manager/jobs/new"
            className="rounded-xl bg-white border border-slate-200 p-4 text-center text-sm font-medium hover:border-brand-300"
          >
            <Plus className="mx-auto mb-1 h-5 w-5 text-brand-700" />
            新規投稿
          </Link>
          <Link
            href="/admin/stats"
            className="rounded-xl bg-white border border-slate-200 p-4 text-center text-sm font-medium hover:border-brand-300"
          >
            <Wrench className="mx-auto mb-1 h-5 w-5 text-brand-700" />
            運営統計を見る
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
