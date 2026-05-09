import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Clock,
  FileText,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { mockStats } from "@/lib/mockData";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Logo size="md" />
          <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
            <a href="#features" className="hover:text-slate-900">
              機能
            </a>
            <a href="#flow" className="hover:text-slate-900">
              使い方
            </a>
            <a href="#numbers" className="hover:text-slate-900">
              実績
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/admin/stats" className="hidden md:block">
              <Button variant="ghost" size="sm">
                運営ダッシュボード
              </Button>
            </Link>
            <Link href="/manager/dashboard">
              <Button size="sm">デモを見る</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-14 md:pb-24 md:pt-20">
          <Badge tone="brand" className="mb-5">
            <Sparkles className="h-3 w-3" /> 中小賃貸管理会社向け SaaS
          </Badge>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">
            <span className="text-brand-700">夜間の水漏れ</span>
            も、
            <br className="hidden md:block" />
            アプリで即マッチング。
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
            賃貸管理会社と地域の修繕・メンテナンス業者をつなぐ、外注ネットワーク。
            投稿から平均{mockStats.avgResponseMinutes}
            分で見積が集まり、深夜帯の緊急対応もアプリで完結します。
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/manager/dashboard">
              <Button size="lg">
                管理会社のデモを見る <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contractor/dashboard">
              <Button size="lg" variant="outline">
                業者のデモを見る
              </Button>
            </Link>
          </div>

          {/* Hero stats */}
          <div className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-4">
            {[
              {
                label: "導入管理会社",
                value: `${mockStats.totalManagers}社`,
              },
              {
                label: "登録業者",
                value: `${mockStats.totalContractors.toLocaleString()}社`,
              },
              {
                label: "月次マッチング",
                value: `${mockStats.monthlyMatches.toLocaleString()}件`,
              },
              {
                label: "平均応答時間",
                value: `${mockStats.avgResponseMinutes}分`,
              },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-card"
              >
                <div className="text-xs font-medium text-slate-500">
                  {s.label}
                </div>
                <div className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain section */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-brand-700">こんな課題、ありませんか</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              中小管理会社の<br className="md:hidden" />リアルな現場
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "夜間・休日の緊急対応",
                body: "入居者からの夜10時の連絡。担当者の携帯から業者を探して電話する日々。",
              },
              {
                title: "見積比較の手間",
                body: "業者ごとに電話・FAX・メール。3社相見積もりだけで半日が消える。",
              },
              {
                title: "オーナー報告書の作成",
                body: "月末に1棟ずつExcelで報告書を作成。1物件あたり30分の手作業。",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card"
              >
                <div className="text-base font-semibold">{p.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-5 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-brand-700">FEATURES</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            投稿から完了報告まで、<br className="md:hidden" />ワンストップ
          </h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Zap,
              title: "即時マッチング",
              body: "案件を投稿すると、エリア・カテゴリが合致する業者へ即時通知。最短数分で見積が届きます。",
            },
            {
              icon: Wrench,
              title: "業者ネットワーク",
              body: "水回り・電気・内装・清掃まで6カテゴリ・1,800社超。夜間対応可能な業者にもタグ付けで絞り込み。",
            },
            {
              icon: MessageSquare,
              title: "現場チャット",
              body: "業者と直接やりとり。到着報告・写真共有・完了通知まで、ひとつの画面で完結します。",
            },
            {
              icon: FileText,
              title: "オーナー報告書の自動生成",
              body: "月次の対応件数・修繕費・予防保全提案までAIが下書き。月末作業を1物件30分から3分へ。",
            },
            {
              icon: ShieldCheck,
              title: "業者評価・履歴",
              body: "対応実績・応答率・評価が可視化。安心して任せられる業者だけが残ります。",
            },
            {
              icon: BarChart3,
              title: "コスト分析",
              body: "物件・カテゴリ別の修繕費を自動集計。オーナー提案にそのまま使えるグラフ付き。",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <f.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 text-base font-semibold">{f.title}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Flow */}
      <section id="flow" className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-brand-700">HOW IT WORKS</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              3ステップで完結
            </h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "案件を投稿",
                body: "物件・カテゴリ・緊急度・写真をアップロード。1分で投稿できます。",
              },
              {
                step: "02",
                title: "見積を比較",
                body: "条件に合う業者から見積が集まり、価格・到着時刻・評価で比較できます。",
              },
              {
                step: "03",
                title: "依頼〜完了報告",
                body: "チャットで現場のやりとり。完了写真・報告書まで自動で記録されます。",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card"
              >
                <div className="text-xs font-bold tracking-widest text-brand-700">
                  STEP {s.step}
                </div>
                <div className="mt-2 text-lg font-semibold">{s.title}</div>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section id="numbers" className="mx-auto max-w-6xl px-5 py-20">
        <div className="rounded-3xl border border-brand-200/60 bg-gradient-to-br from-brand-700 to-brand-900 p-8 text-white md:p-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <Badge className="bg-white/15 text-white" tone="neutral">
                IMPACT
              </Badge>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                1社あたり、月{mockStats.hoursReducedPerCompany}時間の削減。
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-brand-100">
                電話・FAX・Excelで奪われていた時間を、本来の管理業務へ。
                オーナー満足度は導入後3ヶ月で平均
                {mockStats.customerSatisfaction}/5.0。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Clock, label: "平均応答時間", value: "18分" },
                { icon: Building2, label: "導入管理会社", value: "247社" },
                { icon: CheckCircle2, label: "月次マッチング", value: "3,421件" },
                { icon: Wrench, label: "登録業者", value: "1,842社" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"
                >
                  <s.icon className="h-5 w-5 text-brand-100" />
                  <div className="mt-2 text-2xl font-bold">{s.value}</div>
                  <div className="text-xs text-brand-100">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            まずは、デモから。
          </h2>
          <p className="mt-3 text-sm text-slate-600 md:text-base">
            管理会社モード・業者モード、どちらの画面もすぐにご覧いただけます。
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link href="/manager/dashboard">
              <Button size="lg">
                管理会社のデモへ <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contractor/dashboard">
              <Button size="lg" variant="outline">
                業者のデモへ
              </Button>
            </Link>
            <Link href="/admin/stats">
              <Button size="lg" variant="ghost">
                運営ダッシュボード
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-8 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <span>© 2026 ハナタ株式会社</span>
          </div>
          <div className="flex items-center gap-4">
            <a className="hover:text-slate-700" href="#">
              利用規約
            </a>
            <a className="hover:text-slate-700" href="#">
              プライバシー
            </a>
            <a className="hover:text-slate-700" href="#">
              お問い合わせ
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
