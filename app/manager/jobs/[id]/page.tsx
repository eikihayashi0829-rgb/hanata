import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Building2,
  CheckCircle2,
  Clock,
  ImageIcon,
  MapPin,
  MessageSquare,
  Star,
  TrendingUp,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { mockJobs, type JobStatus } from "@/lib/mockData";
import { cn, formatJpy } from "@/lib/utils";

const statusTone: Record<
  JobStatus,
  "warning" | "info" | "brand" | "success" | "muted"
> = {
  見積待ち: "warning",
  業者選定中: "info",
  作業中: "brand",
  完了: "success",
  キャンセル: "muted",
};

export default function ManagerJobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const job = mockJobs.find((j) => j.id === params.id);
  if (!job) notFound();

  const lowestPrice = Math.min(...job.quotes.map((q) => q.price));
  const fastest = job.quotes.reduce(
    (best, q) =>
      q.eta.includes("分") && (!best || q.eta < best.eta) ? q : best,
    null as null | (typeof job.quotes)[number],
  );

  return (
    <AppShell role="manager" title="案件詳細" back="/manager/dashboard">
      <div className="space-y-5 animate-fade-in">
        {/* Header */}
        <Card>
          <CardContent className="p-5">
            <div className="flex flex-wrap items-center gap-2">
              {job.urgency === "即時" && <Badge tone="danger">緊急</Badge>}
              <Badge tone="muted">{job.category}</Badge>
              <Badge tone={statusTone[job.status]}>{job.status}</Badge>
            </div>
            <h1 className="mt-2 text-xl font-bold tracking-tight">
              {job.title}
            </h1>
            <div className="mt-3 space-y-1.5 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-slate-400" />
                {job.propertyName}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-400" />
                {job.propertyAddress}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-400" />
                投稿 {job.postedAt}
              </div>
            </div>
            <div className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
              {job.description}
            </div>
            <div className="mt-3 flex items-baseline justify-between border-t border-slate-100 pt-3">
              <span className="text-xs text-slate-500">予算</span>
              <span className="text-lg font-bold tabular-nums">
                {formatJpy(job.budget)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Photos */}
        {job.photos.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>現場写真</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-3 gap-2">
                {job.photos.map((p, i) => (
                  <div
                    key={p}
                    className={cn(
                      "flex aspect-square items-center justify-center rounded-xl border border-slate-200 text-slate-400",
                      i === 0 && "bg-gradient-to-br from-sky-100 to-sky-50",
                      i === 1 && "bg-gradient-to-br from-slate-100 to-slate-50",
                      i === 2 && "bg-gradient-to-br from-amber-50 to-white",
                    )}
                  >
                    <ImageIcon className="h-7 w-7" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quotes */}
        <div>
          <div className="mb-3 flex items-end justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-tight">見積一覧</h2>
              <p className="text-xs text-slate-500">
                {job.quotes.length}社から回答が届いています
              </p>
            </div>
            {job.status !== "完了" && job.status !== "作業中" && (
              <span className="text-xs text-slate-500">タップで比較</span>
            )}
          </div>

          <div className="space-y-3">
            {job.quotes.map((q) => {
              const isLowest = q.price === lowestPrice;
              const isFastest = fastest?.contractorId === q.contractorId;
              const isSelected = job.selectedContractorId === q.contractorId;
              return (
                <Card
                  key={q.contractorId}
                  className={cn(
                    isSelected && "border-brand-500 ring-2 ring-brand-500/20",
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{q.name}</span>
                          {isSelected && (
                            <Badge tone="brand">
                              <CheckCircle2 className="h-3 w-3" /> 選択済
                            </Badge>
                          )}
                        </div>
                        <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                          <span className="inline-flex items-center gap-0.5">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <span className="font-medium text-slate-700">
                              {q.rating}
                            </span>
                          </span>
                          <span>過去 {q.pastJobs}件</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold tracking-tight tabular-nums">
                          {formatJpy(q.price)}
                        </div>
                        <div className="mt-0.5 inline-flex items-center gap-1 text-xs text-slate-600">
                          <Clock className="h-3 w-3" /> {q.eta}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {isLowest && (
                        <Badge tone="success">
                          <TrendingUp className="h-3 w-3" /> 最安
                        </Badge>
                      )}
                      {isFastest && (
                        <Badge tone="info">
                          <Clock className="h-3 w-3" /> 最速
                        </Badge>
                      )}
                    </div>
                    {q.comment && (
                      <p className="mt-2.5 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
                        {q.comment}
                      </p>
                    )}
                    <div className="mt-3 flex gap-2">
                      {isSelected ? (
                        <Link
                          href={`/manager/jobs/${job.id}/chat`}
                          className="flex-1"
                        >
                          <Button size="sm" variant="primary" className="w-full">
                            <MessageSquare className="h-4 w-4" />
                            チャットを開く
                          </Button>
                        </Link>
                      ) : (
                        <>
                          <Button size="sm" className="flex-1">
                            この業者に依頼する
                          </Button>
                          <Button size="sm" variant="outline">
                            詳細
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Comparison table */}
        {job.quotes.length > 1 && (
          <Card>
            <CardHeader>
              <CardTitle>業者を比較</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="-mx-2 overflow-x-auto px-2">
                <table className="w-full min-w-[480px] text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-xs text-slate-500">
                      <th className="py-2 pr-3 font-medium">業者</th>
                      <th className="py-2 pr-3 font-medium">金額</th>
                      <th className="py-2 pr-3 font-medium">到着</th>
                      <th className="py-2 pr-3 font-medium">評価</th>
                      <th className="py-2 font-medium">実績</th>
                    </tr>
                  </thead>
                  <tbody>
                    {job.quotes.map((q) => (
                      <tr
                        key={q.contractorId}
                        className="border-b border-slate-100 last:border-0"
                      >
                        <td className="py-2.5 pr-3 font-medium">{q.name}</td>
                        <td className="py-2.5 pr-3 tabular-nums">
                          {formatJpy(q.price)}
                          {q.price === lowestPrice && (
                            <span className="ml-1 text-[10px] font-semibold text-emerald-700">
                              最安
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 pr-3">{q.eta}</td>
                        <td className="py-2.5 pr-3">
                          <span className="inline-flex items-center gap-0.5">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            {q.rating}
                          </span>
                        </td>
                        <td className="py-2.5">{q.pastJobs}件</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty state */}
        {job.quotes.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Clock className="mx-auto h-8 w-8 text-slate-300" />
              <div className="mt-3 font-medium">業者の応答を待っています</div>
              <p className="mt-1 text-xs text-slate-500">
                平均応答時間は18分です
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
