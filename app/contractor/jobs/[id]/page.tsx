"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import {
  Building2,
  CheckCircle2,
  Clock,
  ImageIcon,
  MapPin,
  MessageSquare,
  Send,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input, Label, Textarea } from "@/components/ui/Input";
import { mockContractorJobs } from "@/lib/mockData";
import { cn, formatJpy } from "@/lib/utils";

export default function ContractorJobDetailPage() {
  const params = useParams<{ id: string }>();
  const job = mockContractorJobs.find((j) => j.id === params.id);
  if (!job) notFound();

  const [price, setPrice] = useState(job.myQuote?.price.toString() ?? "");
  const [eta, setEta] = useState(job.myQuote?.eta ?? "");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const photoCount = job.category === "水回り" ? 2 : 1;

  return (
    <AppShell role="contractor" title="案件詳細" back="/contractor/jobs/available">
      <div className="space-y-4 animate-fade-in pb-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex flex-wrap items-center gap-2">
              {job.urgency === "即時" && <Badge tone="danger">緊急</Badge>}
              <Badge tone="muted">{job.category}</Badge>
              <span className="text-[11px] text-slate-500">
                <Clock className="mr-0.5 inline h-3 w-3" />
                {job.postedMinutesAgo}分前
              </span>
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
                {job.area}
              </div>
            </div>
            <div className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
              {job.description}
            </div>
            <div className="mt-3 flex items-baseline justify-between border-t border-slate-100 pt-3">
              <span className="text-xs text-slate-500">予算目安</span>
              <span className="text-base font-bold tabular-nums">
                {job.budgetRange}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Photos */}
        <Card>
          <CardHeader>
            <CardTitle>現場写真</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: photoCount }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex aspect-square items-center justify-center rounded-xl border border-slate-200 text-slate-400",
                    i === 0 && "bg-gradient-to-br from-sky-100 to-sky-50",
                    i === 1 && "bg-gradient-to-br from-slate-100 to-slate-50",
                  )}
                >
                  <ImageIcon className="h-7 w-7" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quote form / status */}
        {job.status === "受注" ? (
          <Card className="border-emerald-200 bg-emerald-50/40">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                <div>
                  <div className="font-semibold">受注確定</div>
                  <p className="mt-1 text-xs text-slate-600">
                    見積 {formatJpy(job.myQuote!.price)}（{job.myQuote!.eta}
                    ）で受注しました
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link href={`/contractor/jobs/${job.id}/complete`}>
                      <Button size="sm">
                        完了報告へ
                      </Button>
                    </Link>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4" />
                      管理会社にチャット
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : job.status === "見積送信済" || submitted ? (
          <Card className="border-brand-200 bg-brand-50/40">
            <CardContent className="p-5 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-brand-700" />
              <div className="mt-2 font-semibold">見積を送信しました</div>
              <p className="mt-1 text-xs text-slate-600">
                管理会社の選定をお待ちください。通知でお知らせします。
              </p>
              {(job.myQuote || price) && (
                <div className="mt-4 grid grid-cols-2 gap-2 text-left">
                  <div className="rounded-xl bg-white p-3">
                    <div className="text-[11px] text-slate-500">提示金額</div>
                    <div className="text-base font-bold tabular-nums">
                      {formatJpy(Number(job.myQuote?.price ?? price))}
                    </div>
                  </div>
                  <div className="rounded-xl bg-white p-3">
                    <div className="text-[11px] text-slate-500">対応可能</div>
                    <div className="text-base font-bold">
                      {job.myQuote?.eta ?? eta}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>見積を入れる</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>提示金額</Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                      ¥
                    </span>
                    <Input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="25000"
                      className="pl-8"
                      required
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">
                    予算目安：{job.budgetRange}
                  </p>
                </div>
                <div>
                  <Label>対応可能時間</Label>
                  <Input
                    value={eta}
                    onChange={(e) => setEta(e.target.value)}
                    placeholder="例：30分以内 / 明日10:00"
                    required
                  />
                </div>
                <div>
                  <Label>コメント（任意）</Label>
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="夜間料金込み・部品在庫あり、など"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  <Send className="h-4 w-4" />
                  見積を送信する
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
