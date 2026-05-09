"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  mockStats,
  mockMonthlyTrend,
  mockCategoryShare,
  mockUrgencyMix,
} from "@/lib/mockData";

export default function AdminStatsPage() {
  const totalGmv = mockStats.monthlyGmv;
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <Badge tone="brand">運営ダッシュボード</Badge>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <Clock className="h-3.5 w-3.5" />
            最終更新 2026-05-09 23:45 (5分前)
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-7">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-brand-700">
              MAY 2026 — 月次サマリー
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">
              プラットフォーム全体の状況
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              導入管理会社・登録業者・マッチング件数の推移とカテゴリ構成。
              5月度はGMV {(totalGmv / 100000000).toFixed(2)}億円・前月比 +
              {mockStats.growthMom}%。
            </p>
          </div>
          <Link
            href="/"
            className="text-xs text-slate-500 hover:text-slate-900 underline-offset-4 hover:underline"
          >
            ← LPに戻る
          </Link>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Kpi
            icon={Building2}
            label="導入管理会社"
            value={mockStats.totalManagers.toLocaleString()}
            unit="社"
            delta="+12"
            tone="brand"
          />
          <Kpi
            icon={Wrench}
            label="登録業者"
            value={mockStats.totalContractors.toLocaleString()}
            unit="社"
            delta="+84"
            tone="brand"
          />
          <Kpi
            icon={CheckCircle2}
            label="月次マッチング"
            value={mockStats.monthlyMatches.toLocaleString()}
            unit="件"
            delta="+9.0%"
            tone="success"
          />
          <Kpi
            icon={Clock}
            label="平均応答時間"
            value={mockStats.avgResponseMinutes.toString()}
            unit="分"
            delta="-3分"
            tone="success"
          />
        </div>

        {/* Hero stat */}
        <Card className="mt-5 overflow-hidden border-brand-200/60">
          <div className="grid gap-6 bg-gradient-to-br from-brand-700 to-brand-900 p-7 text-white md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium tracking-widest text-brand-100">
                <Sparkles className="h-3.5 w-3.5" />
                MONTHLY GMV
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight md:text-5xl">
                  ¥{(totalGmv / 100000000).toFixed(2)}
                </span>
                <span className="text-xl font-semibold text-brand-100">億</span>
              </div>
              <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-200">
                <TrendingUp className="h-3 w-3" /> 前月比 +{mockStats.growthMom}%
              </div>
            </div>
            <div>
              <div className="text-xs font-medium tracking-widest text-brand-100">
                CUSTOMER SATISFACTION
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight md:text-5xl">
                  {mockStats.customerSatisfaction}
                </span>
                <span className="text-lg text-brand-100">/ 5.0</span>
              </div>
              <div className="mt-2 text-xs text-brand-100">
                3,421件中 2,981件で4★以上
              </div>
            </div>
            <div>
              <div className="text-xs font-medium tracking-widest text-brand-100">
                HOURS REDUCED / CO.
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight md:text-5xl">
                  {mockStats.hoursReducedPerCompany}
                </span>
                <span className="text-lg text-brand-100">時間 / 月</span>
              </div>
              <div className="mt-2 text-xs text-brand-100">
                電話・FAX・Excel作業からの解放
              </div>
            </div>
          </div>
        </Card>

        {/* Charts */}
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle>月次マッチング件数の推移</CardTitle>
                <p className="mt-0.5 text-xs text-slate-500">
                  直近7ヶ月。GMVは右軸（百万円）。
                </p>
              </div>
              <Badge tone="success">
                <ArrowUpRight className="h-3 w-3" /> 7ヶ月連続成長
              </Badge>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockMonthlyTrend}>
                    <defs>
                      <linearGradient id="matches" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1E40AF" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#1E40AF" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gmv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e2e8f0"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      stroke="#94a3b8"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      yAxisId="l"
                      stroke="#94a3b8"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      yAxisId="r"
                      orientation="right"
                      stroke="#94a3b8"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 12,
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 4px 16px rgba(15,23,42,0.06)",
                      }}
                    />
                    <Area
                      yAxisId="l"
                      type="monotone"
                      dataKey="matches"
                      name="マッチング件数"
                      stroke="#1E40AF"
                      strokeWidth={2.5}
                      fill="url(#matches)"
                    />
                    <Area
                      yAxisId="r"
                      type="monotone"
                      dataKey="gmv"
                      name="GMV"
                      stroke="#10B981"
                      strokeWidth={2}
                      fill="url(#gmv)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>カテゴリ別案件数</CardTitle>
              <p className="mt-0.5 text-xs text-slate-500">
                今月3,421件の構成
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockCategoryShare}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={2}
                    >
                      {mockCategoryShare.map((c) => (
                        <Cell key={c.name} fill={c.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: 12,
                        border: "1px solid #e2e8f0",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 space-y-1.5">
                {mockCategoryShare.map((c) => (
                  <div key={c.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-sm"
                        style={{ backgroundColor: c.color }}
                      />
                      <span className="text-slate-700">{c.name}</span>
                    </div>
                    <span className="tabular-nums text-slate-500">
                      {c.value.toLocaleString()}件
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom row */}
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>緊急度ミックス</CardTitle>
              <p className="mt-0.5 text-xs text-slate-500">
                依頼件数の構成比 (%)
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockUrgencyMix} layout="vertical">
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e2e8f0"
                      horizontal={false}
                    />
                    <XAxis
                      type="number"
                      stroke="#94a3b8"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      stroke="#475569"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      width={80}
                    />
                    <Tooltip
                      contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }}
                    />
                    <Bar dataKey="value" fill="#1E40AF" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>地域別カバレッジ</CardTitle>
              <p className="mt-0.5 text-xs text-slate-500">
                登録業者数 / 23区
              </p>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              {[
                { area: "新宿区", count: 142 },
                { area: "渋谷区", count: 128 },
                { area: "目黒区", count: 96 },
                { area: "中野区", count: 88 },
                { area: "豊島区", count: 81 },
              ].map((a) => (
                <div key={a.area} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">{a.area}</span>
                    <span className="tabular-nums text-slate-500">{a.count}社</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-700"
                      style={{ width: `${(a.count / 142) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>NPS / ヘルススコア</CardTitle>
              <p className="mt-0.5 text-xs text-slate-500">
                3ヶ月のローリング平均
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
                <div className="text-xs font-medium text-emerald-700">NPS</div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-emerald-700 tabular-nums">
                    +62
                  </span>
                  <span className="text-xs text-slate-500">業界平均 +24</span>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-[11px] text-slate-500">月間アクティブ管理会社</div>
                  <div className="text-lg font-bold tabular-nums">218 / 247</div>
                  <div className="text-[11px] text-slate-500">88.3%</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-[11px] text-slate-500">業者リピート利用率</div>
                  <div className="text-lg font-bold tabular-nums">76.4%</div>
                  <div className="text-[11px] text-slate-500">前月比 +3.1pt</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent activity / "live" feed */}
        <Card className="mt-4">
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>直近のマッチング</CardTitle>
              <p className="mt-0.5 text-xs text-slate-500">
                プラットフォーム上のリアルタイム動向
              </p>
            </div>
            <Badge tone="success">
              <span className="mr-1 inline-block h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-600" />
              LIVE
            </Badge>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="-mx-2 overflow-x-auto px-2">
              <table className="w-full min-w-[600px] text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-xs text-slate-500">
                    <th className="py-2 pr-3 font-medium">時刻</th>
                    <th className="py-2 pr-3 font-medium">案件</th>
                    <th className="py-2 pr-3 font-medium">エリア</th>
                    <th className="py-2 pr-3 font-medium">業者</th>
                    <th className="py-2 pr-3 font-medium text-right">金額</th>
                    <th className="py-2 font-medium">応答</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["23:42", "水漏れ緊急対応", "新宿区", "佐藤水道工事", "¥25,000", "4分"],
                    ["23:21", "鍵交換", "目黒区", "鍵の救急24", "¥15,000", "2分"],
                    ["22:58", "シャワー水栓", "渋谷区", "東京水回り工房", "¥21,000", "12分"],
                    ["22:14", "退去クロス", "武蔵野市", "リフォーム匠", "¥105,000", "31分"],
                    ["21:48", "エアコンガス", "中野区", "クールテック", "¥22,000", "8分"],
                    ["21:22", "外壁ひび点検", "豊島区", "東京外装パートナーズ", "¥48,000", "23分"],
                  ].map((r, i) => (
                    <tr key={i} className="border-b border-slate-100 last:border-0">
                      <td className="py-2.5 pr-3 text-slate-500 tabular-nums">{r[0]}</td>
                      <td className="py-2.5 pr-3 font-medium">{r[1]}</td>
                      <td className="py-2.5 pr-3 text-slate-600">{r[2]}</td>
                      <td className="py-2.5 pr-3 text-slate-700">{r[3]}</td>
                      <td className="py-2.5 pr-3 text-right tabular-nums font-medium">
                        {r[4]}
                      </td>
                      <td className="py-2.5">
                        <Badge tone="success">{r[5]}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Network / coverage card */}
        <Card className="mt-4">
          <CardContent className="grid gap-6 p-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-brand-700" />
                <span className="text-xs font-semibold tracking-widest text-brand-700">
                  NETWORK
                </span>
              </div>
              <div className="mt-2 text-2xl font-bold tracking-tight">
                関東圏15都市・全6カテゴリで業者ネットワーク稼働中
              </div>
              <p className="mt-2 text-sm text-slate-600">
                深夜対応可能な業者は全体の42%。応答率95%以上の業者のみが「優先表示」対象です。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="text-[11px] text-slate-500">夜間対応業者</div>
                <div className="mt-1 text-2xl font-bold tabular-nums">774</div>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="text-[11px] text-slate-500">優先表示業者</div>
                <div className="mt-1 text-2xl font-bold tabular-nums">512</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  unit,
  delta,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  unit: string;
  delta: string;
  tone: "brand" | "success";
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
            <Icon className="h-4 w-4" />
          </span>
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-medium ${tone === "success" ? "text-emerald-700" : "text-brand-700"}`}
          >
            <TrendingUp className="h-3 w-3" />
            {delta}
          </span>
        </div>
        <div className="mt-3 text-xs text-slate-500">{label}</div>
        <div className="mt-0.5 flex items-baseline gap-1">
          <span className="text-2xl font-bold tracking-tight tabular-nums md:text-3xl">
            {value}
          </span>
          <span className="text-sm text-slate-500">{unit}</span>
        </div>
      </CardContent>
    </Card>
  );
}
