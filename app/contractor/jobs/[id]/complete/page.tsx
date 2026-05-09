"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Sparkles,
  X,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Label, Textarea } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { mockContractorJobs } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export default function CompletePage() {
  const params = useParams<{ id: string }>();
  const job =
    mockContractorJobs.find((j) => j.id === params.id) ?? mockContractorJobs[0];

  const [photos, setPhotos] = useState<string[]>(["before-1"]);
  const [workSummary, setWorkSummary] = useState("");
  const [partsUsed, setPartsUsed] = useState("");
  const [hours, setHours] = useState("1.5");
  const [done, setDone] = useState(false);

  function addPhoto() {
    setPhotos((p) => [...p, `p-${Date.now()}`]);
  }
  function removePhoto(i: number) {
    setPhotos((p) => p.filter((_, idx) => idx !== i));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setDone(true);
  }

  if (done) {
    return (
      <AppShell role="contractor" title="完了報告" back={`/contractor/jobs/${params.id}`}>
        <div className="flex min-h-[70vh] flex-col items-center justify-center text-center animate-fade-in">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          </div>
          <h1 className="mt-5 text-2xl font-bold tracking-tight">
            完了報告を送信しました
          </h1>
          <p className="mt-2 max-w-xs text-sm text-slate-500">
            管理会社へ通知が送信されました。レポート反映までしばらくお待ちください。
          </p>
          <div className="mt-6 grid w-full max-w-xs grid-cols-2 gap-2">
            <Link href="/contractor/dashboard">
              <Button size="lg" variant="outline" className="w-full">
                ダッシュボード
              </Button>
            </Link>
            <Link href="/contractor/jobs/available">
              <Button size="lg" className="w-full">
                次の案件へ
              </Button>
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell role="contractor" title="完了報告" back={`/contractor/jobs/${params.id}`}>
      <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in pb-24">
        <Card className="border-brand-100 bg-brand-50/40">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-xs">
              <Badge tone="brand">案件</Badge>
              <span className="font-medium text-slate-700">{job.title}</span>
              <span className="text-slate-400">·</span>
              <span className="truncate text-slate-500">{job.propertyName}</span>
            </div>
          </CardContent>
        </Card>

        {/* Photos */}
        <Card>
          <CardContent className="p-5">
            <Label>完了写真</Label>
            <p className="mb-2 text-[11px] text-slate-500">
              ビフォー・アフターの両方をアップロードしてください（最大8枚）
            </p>
            <div className="grid grid-cols-3 gap-2">
              {photos.map((p, i) => (
                <div
                  key={p}
                  className={cn(
                    "relative aspect-square overflow-hidden rounded-xl border border-slate-200",
                    i % 3 === 0 &&
                      "bg-gradient-to-br from-sky-100 to-sky-50",
                    i % 3 === 1 &&
                      "bg-gradient-to-br from-slate-100 to-slate-50",
                    i % 3 === 2 &&
                      "bg-gradient-to-br from-emerald-50 to-white",
                  )}
                >
                  <div className="flex h-full items-center justify-center">
                    <CheckCircle2 className="h-7 w-7 text-emerald-600" />
                  </div>
                  <button
                    type="button"
                    onClick={() => removePhoto(i)}
                    className="absolute right-1.5 top-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900/60 text-white"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                  <div className="absolute bottom-1.5 left-1.5 rounded-md bg-black/50 px-1.5 py-0.5 text-[10px] font-medium text-white">
                    {i === 0 ? "Before" : "After"}
                  </div>
                </div>
              ))}
              {photos.length < 8 && (
                <button
                  type="button"
                  onClick={addPhoto}
                  className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-slate-300 text-slate-500 hover:border-brand-400 hover:text-brand-700"
                >
                  <Camera className="h-5 w-5" />
                  <span className="text-[11px] font-medium">追加</span>
                </button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Work summary */}
        <Card>
          <CardContent className="space-y-4 p-5">
            <div>
              <Label>作業内容</Label>
              <Textarea
                value={workSummary}
                onChange={(e) => setWorkSummary(e.target.value)}
                placeholder="例：キッチンシンク下、止水栓のパッキン交換。漏水確認、清掃完了。"
                required
              />
            </div>
            <div>
              <Label>使用部品・資材</Label>
              <Input
                value={partsUsed}
                onChange={(e) => setPartsUsed(e.target.value)}
                placeholder="例：止水栓パッキン、シールテープ"
              />
            </div>
            <div>
              <Label>作業時間（h）</Label>
              <Input
                type="number"
                step="0.1"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="max-w-[140px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Auto generation hint */}
        <div className="flex items-start gap-2 rounded-xl border border-brand-100 bg-brand-50/50 p-3.5 text-xs text-brand-800">
          <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>
            送信内容は管理会社の月次レポートに自動反映されます。
            オーナー様向けのコメント生成もAIが下書きします。
          </span>
        </div>

        {/* Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200 bg-white/95 p-4 backdrop-blur">
          <div className="mx-auto max-w-3xl">
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={!workSummary}
            >
              <ClipboardCheck className="h-5 w-5" />
              完了報告を送信する
            </Button>
          </div>
        </div>
      </form>
    </AppShell>
  );
}
