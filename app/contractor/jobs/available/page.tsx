import Link from "next/link";
import { ArrowRight, Clock, Filter, MapPin } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { mockContractorJobs } from "@/lib/mockData";

const filters = ["すべて", "水回り", "電気", "内装", "外装", "清掃"];

export default function AvailableJobsPage() {
  const jobs = mockContractorJobs.filter((j) => j.status === "応募可能");

  return (
    <AppShell role="contractor" title="応募可能な案件" back="/contractor/dashboard">
      <div className="space-y-4 animate-fade-in">
        {/* Filter chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button className="inline-flex h-9 flex-shrink-0 items-center gap-1 rounded-full border border-slate-200 bg-white px-3 text-xs font-medium hover:bg-slate-50">
            <Filter className="h-3.5 w-3.5" />
            絞り込み
          </button>
          {filters.map((f, i) => (
            <button
              key={f}
              className={`inline-flex h-9 flex-shrink-0 items-center rounded-full px-3.5 text-xs font-medium ${
                i === 0
                  ? "bg-brand-700 text-white"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500">{jobs.length}件の案件</div>

        {/* Jobs */}
        <div className="space-y-3">
          {jobs.map((j) => (
            <Link key={j.id} href={`/contractor/jobs/${j.id}`} className="block">
              <Card className="hover:border-brand-300 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {j.urgency === "即時" && <Badge tone="danger">緊急</Badge>}
                        <Badge tone="muted">{j.category}</Badge>
                        <span className="text-[11px] text-slate-500">
                          <Clock className="mr-0.5 inline h-3 w-3" />
                          {j.postedMinutesAgo < 60
                            ? `${j.postedMinutesAgo}分前`
                            : `${Math.floor(j.postedMinutesAgo / 60)}時間前`}
                        </span>
                      </div>
                      <div className="mt-2 text-[15px] font-semibold">
                        {j.title}
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                        <MapPin className="h-3 w-3" />
                        {j.area} ・ {j.propertyName}
                      </div>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600">
                        {j.description}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 flex-shrink-0 text-slate-400" />
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                    <div>
                      <div className="text-[10px] text-slate-500">予算目安</div>
                      <div className="text-sm font-semibold tabular-nums">
                        {j.budgetRange}
                      </div>
                    </div>
                    <div className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-700">
                      見積を入れる
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center text-xs text-slate-500">
          表示中はあなたの対応エリア・カテゴリに合致する案件のみです
        </div>
      </div>
    </AppShell>
  );
}
