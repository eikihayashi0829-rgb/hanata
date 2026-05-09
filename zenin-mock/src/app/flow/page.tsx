import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Brain,
  Phone,
  ClipboardList,
  Database,
  Shield,
  CheckCircle2,
  MessageCircle,
  ChevronRight,
  Building,
  Sparkles,
} from "lucide-react";
import Logo from "@/components/Logo";

function StepCard({
  no,
  title,
  desc,
  children,
}: {
  no: number;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative w-[260px] flex-shrink-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
      <div className="absolute -top-3 left-5 inline-flex h-7 items-center rounded-full bg-brand-500 px-3 text-[11px] font-bold text-white shadow">
        STEP {no}
      </div>
      <div className="flex h-44 items-center justify-center rounded-xl bg-slate-50">
        {children}
      </div>
      <h3 className="mt-4 text-base font-bold text-slate-900">{title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-slate-500">{desc}</p>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex h-44 flex-shrink-0 items-center self-end pb-12 text-brand-400">
      <ChevronRight size={28} strokeWidth={2.5} />
    </div>
  );
}

export default function FlowPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-slate-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900">
            <ArrowLeft size={16} />
            トップへ戻る
          </Link>
          <Logo />
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            ダッシュボードへ
            <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            <Sparkles size={14} />
            業務フロー俯瞰図
          </div>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900">
            修繕一次受付から承認まで、<br />
            <span className="text-brand-600">7ステップを全自動。</span>
          </h1>
          <p className="mt-4 text-slate-600">
            これまで担当者が1件あたり平均45分かけていた業務を、AIが一気通貫で実行します。
          </p>
        </div>

        {/* Flow */}
        <div className="mt-14 overflow-x-auto pb-4">
          <div className="flex min-w-max items-end gap-3 px-2">
            {/* Step 1: 写真受信 (LINE風) — clickable */}
            <Link href="/line" className="group">
            <StepCard
              no={1}
              title="写真受信 (LINEで体験 →)"
              desc="入居者からLINEで一次受付。AIが内容を即時パース。"
            >
              <div className="w-[180px] rounded-2xl border border-slate-200 bg-white p-3 shadow">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2 text-[10px] font-semibold text-slate-500">
                  <MessageCircle size={12} className="text-emerald-500" />
                  入居者 田中様
                </div>
                <div className="mt-2 flex flex-col gap-2">
                  <div className="self-start rounded-2xl rounded-tl-sm bg-slate-100 px-3 py-1.5 text-[11px] text-slate-700">
                    エアコンが冷えません
                  </div>
                  <div className="self-start overflow-hidden rounded-xl border border-slate-200">
                    <div className="flex h-16 w-24 items-center justify-center bg-gradient-to-br from-sky-100 to-slate-200 text-slate-400">
                      <Camera size={22} />
                    </div>
                  </div>
                  <div className="self-end rounded-2xl rounded-br-sm bg-emerald-500 px-3 py-1.5 text-[11px] text-white">
                    ご対応します。確認します。
                  </div>
                </div>
              </div>
            </StepCard>
            </Link>

            <Arrow />

            {/* Step 2: AI故障判定 */}
            <StepCard
              no={2}
              title="AI故障判定"
              desc="設備・症状・緊急度をAIが自動推定。"
            >
              <div className="w-[200px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand-600">
                  <Brain size={12} />
                  AI判定結果
                </div>
                <ul className="mt-2 space-y-1.5 text-[11px]">
                  {[
                    ["設備", "エアコン"],
                    ["症状", "冷えない"],
                    ["緊急度", "中"],
                  ].map(([k, v]) => (
                    <li key={k} className="flex items-center justify-between rounded-md bg-emerald-50 px-2 py-1">
                      <span className="flex items-center gap-1 text-slate-600">
                        <CheckCircle2 size={12} className="text-emerald-500" />
                        {k}
                      </span>
                      <span className="font-semibold text-slate-900">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StepCard>

            <Arrow />

            {/* Step 3: 業者連絡 */}
            <StepCard
              no={3}
              title="業者連絡"
              desc="登録業者へ自動架電・チャット連絡。"
            >
              <div className="relative flex w-full items-center justify-around">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white text-slate-600 shadow ring-1 ring-slate-200">
                      <Building size={20} />
                      <span className="absolute -right-1 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-[9px] font-bold text-white">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="absolute inset-0 rounded-xl border-2 border-brand-400 animate-ping2" />
                    </div>
                    <span className="text-[9px] font-medium text-slate-500">業者{String.fromCharCode(65 + i)}</span>
                  </div>
                ))}
                <Phone className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-brand-500" size={14} />
              </div>
            </StepCard>

            <Arrow />

            {/* Step 4: 見積整理 */}
            <StepCard
              no={4}
              title="見積整理"
              desc="複数見積を自動集約・最安業者を提示。"
            >
              <div className="w-[200px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-slate-600">
                  <ClipboardList size={11} /> 見積比較
                </div>
                <ul className="text-[11px]">
                  {[
                    { v: "A社", a: "¥28,000", best: false },
                    { v: "B社", a: "¥26,400", best: true },
                    { v: "C社", a: "¥31,000", best: false },
                  ].map((q) => (
                    <li
                      key={q.v}
                      className={`flex items-center justify-between border-b border-slate-100 px-3 py-1.5 last:border-b-0 ${
                        q.best ? "bg-emerald-50" : ""
                      }`}
                    >
                      <span className="text-slate-700">{q.v}</span>
                      <span className={`tabular font-bold ${q.best ? "text-emerald-700" : "text-slate-700"}`}>
                        {q.a}
                        {q.best && <span className="ml-1 rounded bg-emerald-500 px-1 py-px text-[8px] text-white">最安</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </StepCard>

            <Arrow />

            {/* Step 5: 履歴保存 */}
            <StepCard
              no={5}
              title="修繕履歴保存"
              desc="全件を物件単位でクラウド管理。"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-600">
                  <Database size={32} />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow">
                    <CheckCircle2 size={14} />
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-emerald-700">履歴保存完了</div>
                <div className="text-[10px] text-slate-500">物件ごとに自動アーカイブ</div>
              </div>
            </StepCard>

            <Arrow />

            {/* Step 6: 管理業法対応 */}
            <StepCard
              no={6}
              title="管理業法対応"
              desc="法定要件の帳票・保存・報告を自動充足。"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Shield size={26} />
                </div>
                <ul className="space-y-0.5 text-[10px]">
                  {["帳票自動作成", "保存要件充足", "報告書自動生成"].map((t) => (
                    <li key={t} className="flex items-center gap-1 text-slate-700">
                      <CheckCircle2 size={11} className="text-emerald-500" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </StepCard>

            <Arrow />

            {/* Step 7: 承認 */}
            <StepCard
              no={7}
              title="承認"
              desc="担当者は最終承認ボタンを押すだけ。"
            >
              <div className="relative flex flex-col items-center">
                <div className="rounded-2xl bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-700 shadow ring-1 ring-slate-200">
                  承認するだけ
                </div>
                <div className="mx-auto -mt-px h-2 w-2 rotate-45 bg-white ring-1 ring-slate-200" />
                <div className="mt-3 flex h-14 w-20 items-end justify-center rounded-t-xl bg-slate-200">
                  <div className="h-3 w-full rounded-t-md bg-slate-300" />
                </div>
                <div className="h-1.5 w-24 rounded-b bg-slate-300" />
                <button className="mt-3 inline-flex items-center gap-1 rounded-lg bg-brand-500 px-3 py-1 text-[11px] font-bold text-white shadow">
                  <CheckCircle2 size={12} /> 承認
                </button>
              </div>
            </StepCard>
          </div>
        </div>

        {/* Bottom band */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-brand-200 bg-gradient-to-r from-brand-500 to-brand-600 shadow-lift">
          <div className="grid items-center gap-6 px-8 py-7 md:grid-cols-[1fr_auto_1fr]">
            <div className="text-center md:text-right">
              <div className="text-[11px] font-bold uppercase tracking-widest text-brand-100">AIが</div>
              <div className="text-2xl font-extrabold text-white">すべて自動で実行</div>
            </div>
            <div className="hidden h-12 w-px bg-white/40 md:block" />
            <div className="text-center md:text-left">
              <div className="text-[11px] font-bold uppercase tracking-widest text-brand-100">担当者は</div>
              <div className="text-2xl font-extrabold text-white">承認するだけで完了</div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/split"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-sm font-bold text-white shadow-lift hover:bg-brand-600"
          >
            ライブ二画面デモを見る
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            管理ダッシュボードを見る
          </Link>
        </div>
      </div>
    </main>
  );
}
