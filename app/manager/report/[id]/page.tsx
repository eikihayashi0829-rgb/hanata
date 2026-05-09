import {
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Lightbulb,
  MessageCircle,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { mockOwnerReport } from "@/lib/mockData";
import { formatJpy } from "@/lib/utils";

export default function OwnerReportPage() {
  const r = mockOwnerReport;
  return (
    <AppShell
      role="manager"
      title="オーナー報告書"
      back="/manager/dashboard"
      rightSlot={
        <Badge tone="brand" className="ml-1">
          <Sparkles className="h-3 w-3" /> AI自動生成
        </Badge>
      }
    >
      <div className="space-y-4 animate-fade-in pb-6">
        {/* Report cover */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
          <div className="bg-gradient-to-br from-brand-700 to-brand-900 px-6 pt-7 pb-6 text-white">
            <div className="text-xs uppercase tracking-widest text-brand-100">
              Property Management Report
            </div>
            <div className="mt-2 text-2xl font-bold">{r.period} 月次レポート</div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-sm text-brand-100">物件オーナー：</span>
              <span className="font-semibold">{r.ownerName} 様</span>
            </div>
            <div className="text-sm text-brand-100">{r.propertyName}</div>
          </div>
          <div className="grid grid-cols-3 gap-px bg-slate-100">
            <Stat
              label="対応案件"
              value={`${r.totalIncidents}件`}
              tone="brand"
            />
            <Stat
              label="修繕費合計"
              value={formatJpy(r.totalCost)}
              tone="default"
            />
            <Stat
              label="平均解決時間"
              value={`${r.avgResolutionHours}h`}
              tone="default"
            />
          </div>
        </div>

        {/* Summary commentary */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <div className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <div className="font-semibold">今月のサマリー</div>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  本月は計{r.totalIncidents}件の対応がありました。緊急の水漏れ案件1件を含みますが、
                  いずれも平均{r.avgResolutionHours}時間以内に解決しております。
                  入居者からの満足度評価は
                  <span className="font-semibold text-slate-900">
                    {" "}
                    {r.satisfaction}/5.0
                  </span>{" "}
                  と高水準を維持しています。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Incidents */}
        <Card>
          <CardContent className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="font-semibold">今月の対応案件</div>
              <Badge tone="muted">{r.incidents.length}件</Badge>
            </div>
            <div className="divide-y divide-slate-100">
              {r.incidents.map((i) => (
                <div key={i.title} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="text-sm font-medium">{i.title}</div>
                      <div className="text-sm font-semibold tabular-nums">
                        {formatJpy(i.cost)}
                      </div>
                    </div>
                    <div className="mt-0.5 text-xs text-slate-500">
                      {i.date} ・ {i.contractor}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <span className="text-sm font-medium text-slate-700">合計</span>
              <span className="text-base font-bold tabular-nums">
                {formatJpy(r.totalCost)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Satisfaction */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-500">入居者満足度</div>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold tabular-nums">
                    {r.satisfaction}
                  </span>
                  <span className="text-sm text-slate-500">/ 5.0</span>
                </div>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    className={`h-5 w-5 ${
                      n <= Math.round(r.satisfaction)
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-200"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3 border-t border-slate-100 pt-3 text-xs">
              <SmallStat icon={Clock} label="平均応答" value="14分" />
              <SmallStat icon={CheckCircle2} label="完了率" value="100%" />
              <SmallStat icon={TrendingUp} label="前月比" value="+0.2" />
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="border-brand-100 bg-gradient-to-br from-brand-50/60 to-white">
          <CardContent className="p-5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-brand-700" />
              <div className="text-sm font-semibold text-brand-800">
                AIからの提案
              </div>
            </div>
            <div className="mt-3 space-y-3">
              {r.recommendations.map((rec) => (
                <div
                  key={rec.title}
                  className="rounded-xl border border-brand-100 bg-white p-4"
                >
                  <div className="flex items-start gap-2.5">
                    <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                    <div>
                      <div className="text-sm font-semibold">{rec.title}</div>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
                        {rec.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button size="lg" variant="outline">
            <Download className="h-4 w-4" />
            PDFをダウンロード
          </Button>
          <Button size="lg">
            <MessageCircle className="h-4 w-4" />
            LINEで送信
          </Button>
        </div>
      </div>
    </AppShell>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "brand" | "default";
}) {
  return (
    <div className="bg-white p-4 text-center">
      <div className="text-[11px] text-slate-500">{label}</div>
      <div
        className={`mt-1 text-lg font-bold tabular-nums ${tone === "brand" ? "text-brand-700" : "text-slate-900"}`}
      >
        {value}
      </div>
    </div>
  );
}

function SmallStat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div>
      <Icon className="mx-auto h-3.5 w-3.5 text-slate-400" />
      <div className="mt-1 text-center text-[11px] text-slate-500">{label}</div>
      <div className="text-center text-sm font-semibold tabular-nums">
        {value}
      </div>
    </div>
  );
}
