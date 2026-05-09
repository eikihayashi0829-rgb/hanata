import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  Briefcase,
  CheckCircle2,
  Clock,
  MapPin,
  Star,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { mockContractorJobs } from "@/lib/mockData";
import { formatJpy } from "@/lib/utils";

export default function ContractorDashboardPage() {
  const newJobs = mockContractorJobs.filter((j) => j.status === "応募可能");
  const myJobs = mockContractorJobs.filter((j) => j.status !== "応募可能");
  const monthlyRevenue = 642000;
  const completedThisMonth = 14;
  const myRating = 4.8;

  return (
    <AppShell role="contractor" title="ダッシュボード">
      <div className="space-y-5 animate-fade-in">
        {/* Greeting */}
        <div>
          <p className="text-sm text-slate-500">佐藤水道工事 様</p>
          <h1 className="mt-0.5 text-2xl font-bold tracking-tight">
            新着案件、{newJobs.length}件届いています。
          </h1>
        </div>

        {/* New job alert */}
        <Link href="/contractor/jobs/available" className="block">
          <Card className="border-brand-200 bg-gradient-to-br from-brand-50 to-white">
            <CardContent className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                <div className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-700 text-white">
                  <BellRing className="h-5 w-5" />
                  <span className="absolute -right-0.5 -top-0.5 h-3 w-3 animate-pulse-dot rounded-full bg-danger-600 ring-2 ring-white" />
                </div>
                <div>
                  <div className="font-semibold">新着案件 {newJobs.length}件</div>
                  <p className="text-xs text-slate-500">
                    あなたの対応エリア・カテゴリの案件
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-400" />
            </CardContent>
          </Card>
        </Link>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <Card>
            <CardContent className="p-4">
              <Wallet className="h-4 w-4 text-emerald-600" />
              <div className="mt-2 text-[11px] text-slate-500">今月の売上</div>
              <div className="text-base font-bold tabular-nums">
                {formatJpy(monthlyRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <CheckCircle2 className="h-4 w-4 text-brand-700" />
              <div className="mt-2 text-[11px] text-slate-500">完了案件</div>
              <div className="text-base font-bold tabular-nums">
                {completedThisMonth}件
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <div className="mt-2 text-[11px] text-slate-500">評価</div>
              <div className="text-base font-bold tabular-nums">{myRating}</div>
            </CardContent>
          </Card>
        </div>

        {/* My in-progress jobs */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>進行中の案件</CardTitle>
            <Badge tone="muted">{myJobs.length}件</Badge>
          </CardHeader>
          <CardContent className="space-y-2.5 pt-0">
            {myJobs.map((j) => (
              <Link
                key={j.id}
                href={`/contractor/jobs/${j.id}`}
                className="block rounded-xl border border-slate-200 p-3.5 transition-colors hover:border-brand-300 hover:bg-brand-50/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge
                        tone={j.status === "受注" ? "brand" : "info"}
                      >
                        {j.status}
                      </Badge>
                      {j.urgency === "即時" && <Badge tone="danger">緊急</Badge>}
                    </div>
                    <div className="mt-1.5 truncate text-[15px] font-semibold">
                      {j.title}
                    </div>
                    <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="h-3 w-3" />
                      {j.area}
                    </div>
                  </div>
                  {j.myQuote && (
                    <div className="text-right">
                      <div className="text-[11px] text-slate-500">見積</div>
                      <div className="text-sm font-semibold tabular-nums">
                        {formatJpy(j.myQuote.price)}
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            ))}
            {myJobs.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-500">
                進行中の案件はありません
              </div>
            )}
          </CardContent>
        </Card>

        {/* Performance chart */}
        <Card>
          <CardHeader>
            <CardTitle>今月のパフォーマンス</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-3">
              <PerfRow
                label="応答率"
                value="98%"
                tone="text-emerald-700"
                hint="平均より +6%"
              />
              <PerfRow
                label="平均対応時間"
                value="32分"
                tone="text-brand-700"
                hint="平均より -4分"
              />
              <PerfRow
                label="リピート率"
                value="42%"
                tone="text-emerald-700"
                hint={null}
              />
              <PerfRow
                label="売上前月比"
                value="+18%"
                tone="text-emerald-700"
                hint={null}
                icon={TrendingUp}
              />
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Link href="/contractor/jobs/available" className="block">
          <Button size="lg" className="w-full">
            <Briefcase className="h-5 w-5" />
            応募可能な案件を見る
          </Button>
        </Link>

        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center text-xs text-slate-500">
          <Clock className="mx-auto mb-1 h-4 w-4 text-slate-400" />
          深夜帯（22:00〜翌6:00）は割増料金が自動加算されます
        </div>
      </div>
    </AppShell>
  );
}

function PerfRow({
  label,
  value,
  tone,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string;
  tone: string;
  hint: string | null;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <div className="text-[11px] text-slate-500">{label}</div>
      <div className={`mt-0.5 inline-flex items-center gap-1 text-lg font-bold tabular-nums ${tone}`}>
        {Icon && <Icon className="h-4 w-4" />}
        {value}
      </div>
      {hint && <div className="mt-0.5 text-[10px] text-slate-500">{hint}</div>}
    </div>
  );
}
