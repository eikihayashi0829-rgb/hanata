import LineChat from "./LineChat";

export const metadata = {
  title: "LINEで修繕受付 | 全任 -ZENIN-",
};

export default function LinePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-emerald-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            入居者の画面 (LINE公式アカウント)
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
            これが入居者から見えている画面です
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            「送信」ボタンを押すと、AIエージェントが応答します。実際のLINE公式アカウントとして導入可能です。
          </p>
        </div>

        <LineChat />
      </div>
    </main>
  );
}
