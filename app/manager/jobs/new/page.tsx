"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Camera,
  CheckCircle2,
  Clock,
  Droplets,
  Hammer,
  Home,
  PaintBucket,
  Plug,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Label, Textarea } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

const categories = [
  { id: "水回り", label: "水回り", icon: Droplets, color: "bg-sky-50 text-sky-700" },
  { id: "電気", label: "電気", icon: Plug, color: "bg-amber-50 text-amber-700" },
  { id: "内装", label: "内装", icon: PaintBucket, color: "bg-violet-50 text-violet-700" },
  { id: "外装", label: "外装", icon: Home, color: "bg-emerald-50 text-emerald-700" },
  { id: "清掃", label: "清掃", icon: Sparkles, color: "bg-pink-50 text-pink-700" },
  { id: "その他", label: "その他", icon: Wrench, color: "bg-slate-100 text-slate-700" },
];

const urgencies = [
  { id: "即時", label: "即時" },
  { id: "24時間以内", label: "24時間" },
  { id: "1週間以内", label: "1週間" },
  { id: "期限指定", label: "日時指定" },
];

export default function NewJobPage() {
  const router = useRouter();
  const [category, setCategory] = useState<string | null>(null);
  const [urgency, setUrgency] = useState<string>("即時");
  const [title, setTitle] = useState("");
  const [property, setProperty] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("30000");
  const [photos, setPhotos] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  function addPhoto() {
    setPhotos((p) => [...p, `photo-${Date.now()}`]);
  }
  function removePhoto(i: number) {
    setPhotos((p) => p.filter((_, idx) => idx !== i));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      router.push("/manager/jobs/job-001");
    }, 2400);
  }

  if (submitting) {
    return (
      <AppShell role="manager" title="マッチング中">
        <div className="flex min-h-[70vh] flex-col items-center justify-center text-center animate-fade-in">
          <div className="relative">
            <div className="h-20 w-20 rounded-full border-4 border-brand-100" />
            <div className="absolute inset-0 h-20 w-20 animate-spin rounded-full border-4 border-transparent border-t-brand-700" />
          </div>
          <h2 className="mt-6 text-xl font-bold">業者をマッチング中...</h2>
          <p className="mt-2 max-w-xs text-sm text-slate-500">
            エリア・カテゴリ・対応可能時間が一致する業者へ通知を送信しています
          </p>
          <div className="mt-6 space-y-1.5 text-sm">
            {["佐藤水道工事", "ABC設備サービス", "新宿水道センター"].map((n, i) => (
              <div
                key={n}
                className="flex items-center gap-2 text-slate-600 animate-fade-in"
                style={{ animationDelay: `${i * 0.6}s` }}
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                {n} へ通知
              </div>
            ))}
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell role="manager" title="新規案件投稿" back="/manager/dashboard">
      <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in pb-24">
        {/* Category */}
        <Card>
          <CardContent className="p-5">
            <Label>カテゴリ</Label>
            <div className="mt-1 grid grid-cols-3 gap-2">
              {categories.map((c) => {
                const active = category === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 rounded-xl border p-3 transition-colors",
                      active
                        ? "border-brand-700 bg-brand-50/50 ring-2 ring-brand-500/20"
                        : "border-slate-200 hover:border-slate-300",
                    )}
                  >
                    <span
                      className={cn(
                        "inline-flex h-9 w-9 items-center justify-center rounded-lg",
                        c.color,
                      )}
                    >
                      <c.icon className="h-4 w-4" />
                    </span>
                    <span className="text-xs font-medium">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Urgency */}
        <Card>
          <CardContent className="p-5">
            <Label>緊急度</Label>
            <div className="mt-1 grid grid-cols-4 gap-1.5 rounded-xl bg-slate-100 p-1">
              {urgencies.map((u) => {
                const active = urgency === u.id;
                return (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => setUrgency(u.id)}
                    className={cn(
                      "rounded-lg px-2 py-2 text-xs font-medium transition-colors",
                      active
                        ? "bg-white text-slate-900 shadow-card"
                        : "text-slate-600 hover:text-slate-900",
                    )}
                  >
                    {u.label}
                  </button>
                );
              })}
            </div>
            {urgency === "即時" && (
              <div className="mt-3 flex items-start gap-2 rounded-xl bg-danger-50 p-3 text-xs text-danger-700">
                <Clock className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                <span>
                  即時案件は夜間対応可能な業者のみに通知されます。深夜料金が加算される場合があります。
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Title & property */}
        <Card>
          <CardContent className="space-y-4 p-5">
            <div>
              <Label>タイトル</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="例：キッチンの水漏れ"
                required
              />
            </div>
            <div>
              <Label>物件名・部屋番号</Label>
              <Input
                value={property}
                onChange={(e) => setProperty(e.target.value)}
                placeholder="例：サンライズマンション 301"
                required
              />
            </div>
            <div>
              <Label>状況・依頼内容</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="入居者から、〜分前に連絡。現場の状況、応急処置の有無など"
                required
              />
            </div>
            <div>
              <Label>予算（目安）</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  ¥
                </span>
                <Input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Photos */}
        <Card>
          <CardContent className="p-5">
            <Label>現場写真</Label>
            <div className="mt-1 grid grid-cols-3 gap-2">
              {photos.map((p, i) => (
                <div
                  key={p}
                  className="relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-200"
                >
                  <div className="flex h-full items-center justify-center">
                    <CheckCircle2 className="h-7 w-7 text-emerald-600" />
                  </div>
                  <button
                    type="button"
                    onClick={() => removePhoto(i)}
                    className="absolute right-1.5 top-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900/60 text-white"
                    aria-label="削除"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                  <div className="absolute bottom-1.5 left-1.5 rounded-md bg-black/50 px-1.5 py-0.5 text-[10px] font-medium text-white">
                    アップロード済
                  </div>
                </div>
              ))}
              {photos.length < 6 && (
                <button
                  type="button"
                  onClick={addPhoto}
                  className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-slate-300 text-slate-500 hover:border-brand-400 hover:text-brand-700"
                >
                  <Camera className="h-5 w-5" />
                  <span className="text-[11px] font-medium">写真追加</span>
                </button>
              )}
            </div>
            <p className="mt-2 text-xs text-slate-500">
              最大6枚まで。業者が現場を把握しやすくなります
            </p>
          </CardContent>
        </Card>

        {/* Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200 bg-white/95 p-4 backdrop-blur">
          <div className="mx-auto max-w-3xl">
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={!category || !title || !property || !description}
            >
              <Hammer className="h-5 w-5" />
              業者へマッチングを開始する
            </Button>
            <p className="mt-1.5 text-center text-[11px] text-slate-500">
              該当エリアの業者へ即時通知されます
            </p>
          </div>
        </div>
      </form>
    </AppShell>
  );
}
