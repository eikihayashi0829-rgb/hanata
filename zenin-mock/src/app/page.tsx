import Link from "next/link";
import {
  ArrowRight,
  PhoneOff,
  ShieldCheck,
  Timer,
  CheckCircle2,
  Sparkles,
  PlayCircle,
  MessageCircle,
  Smartphone,
} from "lucide-react";
import Logo from "@/components/Logo";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-slate-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm text-slate-600 md:flex">
            <a href="#flow" className="hover:text-slate-900">業務フロー</a>
            <a href="#value" className="hover:text-slate-900">提供価値</a>
            <a href="#faq" className="hover:text-slate-900">よくある質問</a>
          </nav>
          <Link
            href="/dashboard"
            className="hidden items-center gap-1 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 md:inline-flex"
          >
            ログイン
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-[0.6]"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(16,185,129,0.18) 0%, rgba(16,185,129,0) 70%)",
          }}
        />
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-16 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            <MessageCircle size={14} />
            LINE 公式アカウントから即導入できる、実行型AIエージェント
          </div>

          <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-slate-900 md:text-6xl">
            電話の鳴らない、
            <br />
            <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
              管理事務所を創る。
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            入居者からの修繕連絡を <span className="font-semibold text-slate-800">LINE 1本</span> で受付。
            業者選定・見積比較・書類作成までを AI が自動実行し、担当者は <span className="font-semibold text-brand-600">承認ボタンを押すだけ</span>。
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/split"
              className="group inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lift transition hover:bg-brand-600"
            >
              <PlayCircle size={18} />
              ライブデモを見る
              <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/line"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Smartphone size={16} />
              入居者の画面を見る
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              管理画面を見る
            </Link>
          </div>

          {/* Stat strip */}
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-3 gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            {[
              { v: "80%", l: "対応時間 削減" },
              { v: "1.2分", l: "平均一次応答" },
              { v: "0件", l: "人的記録ミス" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="tabular text-3xl font-extrabold text-slate-900">{s.v}</div>
                <div className="mt-1 text-xs font-medium text-slate-500">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value props */}
      <section id="value" className="bg-slate-50/60 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-semibold uppercase tracking-widest text-brand-600">Why ZENIN</div>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              「電話で管理する」から、「承認だけで管理する」へ。
            </h2>
            <p className="mt-4 text-slate-600">
              入居者対応・業者調整・オーナー報告。これまで人手で繰り返されていた事務作業を、
              AIが一連の業務フローとして自動実行します。
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Timer,
                title: "対応時間 80% 削減",
                desc: "入居者の一次受付から業者選定、見積整理、報告書作成までを自動実行。担当者は最終承認のみ。",
              },
              {
                icon: CheckCircle2,
                title: "人的ミス ゼロ",
                desc: "履歴・帳票・連絡記録をすべて構造化データで保存。聞き漏らし・転記ミスが構造的に発生しません。",
              },
              {
                icon: ShieldCheck,
                title: "管理業法 自動対応",
                desc: "賃貸住宅管理業法の帳票要件・保存要件を満たす書類を自動生成。コンプライアンス対応の手間を解消。",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <v.icon size={22} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LINE feature */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                LINE Integration
              </div>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900">
                導入は LINE 公式アカウントを<br />
                「友だち追加」してもらうだけ。
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                日本で 97% の世帯が使う LINE をそのまま窓口に。
                入居者はアプリのインストールや会員登録が一切不要。
                高齢者でも迷わず使えるUIで、写真や動画でのトラブル説明もスムーズ。
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {[
                  "アプリインストール不要 (LINEは普及率97%)",
                  "夜間・週末・祝日も24時間自動応答",
                  "写真1枚送るだけで AI が故障内容を自動判定",
                  "業者調整・書類作成まで全自動 (担当者は承認のみ)",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-slate-700">
                    <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-brand-500" />
                    {t}
                  </li>
                ))}
              </ul>
              <Link
                href="/line"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
              >
                <Smartphone size={16} />
                入居者の画面を体験する
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Mini phone preview */}
            <div className="flex justify-center">
              <div className="relative h-[480px] w-[260px] overflow-hidden rounded-[2.5rem] border-[10px] border-slate-900 bg-black shadow-2xl">
                <div className="absolute left-1/2 top-0 z-30 h-5 w-28 -translate-x-1/2 rounded-b-[1rem] bg-slate-900" />
                <div className="flex h-full w-full flex-col bg-[#7d96b6]">
                  <div className="flex items-center gap-2 bg-emerald-500 px-3 pt-4 pb-2 text-white">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-emerald-600">
                      <Sparkles size={14} />
                    </div>
                    <div className="text-xs font-bold">全任サポート</div>
                  </div>
                  <div className="flex-1 space-y-2 px-2 py-3 text-[11px]">
                    <div className="flex items-end gap-1">
                      <div className="rounded-2xl rounded-bl-sm bg-white px-2.5 py-1.5 text-slate-800 shadow-sm">
                        お写真をいただけますか？
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="overflow-hidden rounded-xl shadow-sm">
                        <div className="flex h-16 w-24 items-center justify-center bg-gradient-to-br from-slate-200 to-slate-400 text-slate-500">
                          📷
                        </div>
                      </div>
                    </div>
                    <div className="flex items-end gap-1">
                      <div className="w-44 overflow-hidden rounded-2xl rounded-bl-sm bg-white shadow-sm">
                        <div className="bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-700">
                          AI判定結果
                        </div>
                        <div className="space-y-0.5 px-2 py-1.5 text-[10px]">
                          <div className="flex justify-between"><span>設備</span><span className="font-bold">エアコン</span></div>
                          <div className="flex justify-between"><span>緊急度</span><span className="font-bold">中</span></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-end gap-1">
                      <div className="rounded-2xl rounded-bl-sm bg-white px-2.5 py-1.5 text-slate-800 shadow-sm">
                        業者B社が明日10時に伺います ✅
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain CTA */}
      <section id="flow" className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-10 text-white md:p-14">
            <div className="flex items-center gap-2 text-brand-300">
              <PhoneOff size={18} />
              <span className="text-xs font-semibold uppercase tracking-widest">Before ZENIN</span>
            </div>
            <h3 className="mt-4 text-2xl font-bold leading-snug md:text-3xl">
              「エアコンが冷えない」の一本の電話から、<br />
              業者3社への架電、見積比較、オーナー報告まで——<br />
              <span className="text-brand-300">担当者は1件あたり平均45分を費やしています。</span>
            </h3>
            <div className="mt-8">
              <Link
                href="/flow"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold hover:bg-brand-600"
              >
                これがどう変わるか見る
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <span>© 2024 ZENIN, Inc.</span>
          </div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-slate-700">利用規約</a>
            <a href="#" className="hover:text-slate-700">プライバシー</a>
            <a href="#" className="hover:text-slate-700">お問い合わせ</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
