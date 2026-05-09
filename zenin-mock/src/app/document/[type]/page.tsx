import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, FileText, Receipt, History } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import CloseButton from "./CloseButton";

type DocType = "report" | "invoice" | "history";

const meta: Record<DocType, { title: string; icon: LucideIcon }> = {
  report: { title: "修繕報告書", icon: FileText },
  invoice: { title: "請求書", icon: Receipt },
  history: { title: "修繕履歴", icon: History },
};

export default function DocumentPage({ params }: { params: { type: string } }) {
  if (!["report", "invoice", "history"].includes(params.type)) notFound();
  const type = params.type as DocType;
  const Icon = meta[type].icon;

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      {/* Modal-like header */}
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
            <Icon size={20} />
          </div>
          <div>
            <div className="text-base font-bold text-slate-900">{meta[type].title}</div>
            <div className="text-[11px] text-slate-500">AI自動生成 ・ 2024/05/20 14:34</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">
            <Download size={14} />
            ダウンロード
          </button>
          <CloseButton />
        </div>
      </div>

      {/* A4 paper */}
      <div className="mx-auto max-w-4xl px-6">
        <div className="aspect-[1/1.414] w-full rounded-md border border-slate-300 bg-white p-12 shadow-lift">
          {type === "report" && <RepairReport />}
          {type === "invoice" && <Invoice />}
          {type === "history" && <RepairHistory />}
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft size={12} />
            ダッシュボードへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}

function RepairReport() {
  return (
    <div className="font-sans text-slate-900">
      <div className="border-b-2 border-slate-900 pb-4">
        <div className="text-center text-2xl font-bold tracking-widest">修 繕 報 告 書</div>
        <div className="mt-2 text-right text-xs text-slate-600 tabular">作成日: 2024年5月20日</div>
        <div className="text-right text-xs text-slate-600 tabular">報告書番号: RP-2024-0520-001</div>
      </div>

      <div className="mt-6 space-y-1 text-sm">
        <div>株式会社○○ホールディングス　御中</div>
        <div className="mt-3">株式会社スマート管理</div>
        <div>賃貸管理部　山田 太郎</div>
      </div>

      <div className="mt-8 rounded border border-slate-300">
        <Row label="物件名" value="グランドメゾン青山 101号室" />
        <Row label="入居者" value="田中 太郎 様" />
        <Row label="受付日時" value="2024年5月20日 14:33" />
        <Row label="完了日時" value="2024年5月21日 10:00" />
        <Row label="対応業者" value="株式会社○○設備" />
      </div>

      <div className="mt-6">
        <div className="text-sm font-bold">1. 修繕内容</div>
        <p className="mt-2 text-sm leading-relaxed">
          居室エアコン (8畳用) の冷却機能不全。冷媒系統に経年劣化を確認したため、
          本体を省エネ機種へ交換。室外機についても点検を実施し、異常が無いことを確認した。
        </p>
      </div>

      <div className="mt-5">
        <div className="text-sm font-bold">2. 費用</div>
        <p className="mt-2 text-sm tabular">合計 ¥28,600 (税込)</p>
      </div>

      <div className="mt-5">
        <div className="text-sm font-bold">3. 保証</div>
        <p className="mt-2 text-sm">本体保証 1年間 (株式会社○○設備による)</p>
      </div>

      <div className="mt-10 text-right text-xs text-slate-500">
        本書類は ZENIN AI により自動生成されました。
      </div>
    </div>
  );
}

function Invoice() {
  const items = [
    { name: "エアコン本体 (8畳用 / 省エネ機種)", qty: 1, unit: 22000 },
    { name: "取付・撤去工賃", qty: 1, unit: 4000 },
    { name: "出張費", qty: 1, unit: 2000 },
  ];
  const sub = items.reduce((s, i) => s + i.qty * i.unit, 0);
  const tax = Math.floor(sub * 0.1);
  const total = sub + tax;
  return (
    <div className="font-sans text-slate-900">
      <div className="flex items-end justify-between border-b-2 border-slate-900 pb-4">
        <div className="text-3xl font-bold tracking-widest">請 求 書</div>
        <div className="text-right text-xs">
          <div>請求書番号 INV-2024-0520-001</div>
          <div>発行日 2024年5月20日</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6 text-sm">
        <div>
          <div className="font-bold">株式会社スマート管理 御中</div>
          <div className="mt-1 text-xs text-slate-600">東京都港区青山1-2-3</div>
        </div>
        <div className="text-right">
          <div className="font-bold">株式会社○○設備</div>
          <div className="mt-1 text-xs text-slate-600">東京都品川区○○1-1-1</div>
          <div className="text-xs text-slate-600">登録番号: T1234567890123</div>
        </div>
      </div>

      <div className="mt-6 rounded bg-slate-100 px-4 py-3 text-center">
        <div className="text-xs text-slate-600">ご請求金額</div>
        <div className="tabular text-2xl font-extrabold">¥{total.toLocaleString()}</div>
      </div>

      <table className="mt-6 w-full text-sm">
        <thead>
          <tr className="border-b border-slate-300 text-left text-xs">
            <th className="py-2">品目</th>
            <th className="py-2 text-right">数量</th>
            <th className="py-2 text-right">単価</th>
            <th className="py-2 text-right">金額</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.name} className="border-b border-slate-200">
              <td className="py-2">{i.name}</td>
              <td className="py-2 text-right tabular">{i.qty}</td>
              <td className="py-2 text-right tabular">¥{i.unit.toLocaleString()}</td>
              <td className="py-2 text-right tabular">¥{(i.qty * i.unit).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 ml-auto w-72 space-y-1 text-sm">
        <div className="flex justify-between">
          <span>小計</span>
          <span className="tabular">¥{sub.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>消費税 (10%)</span>
          <span className="tabular">¥{tax.toLocaleString()}</span>
        </div>
        <div className="flex justify-between border-t-2 border-slate-900 pt-1 text-base font-bold">
          <span>合計</span>
          <span className="tabular">¥{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

function RepairHistory() {
  const rows = [
    { d: "2024/05/20", t: "エアコン本体交換", v: "株式会社○○設備", a: "¥28,600" },
    { d: "2023/11/12", t: "給湯器点検", v: "△△工業", a: "¥8,800" },
    { d: "2023/06/03", t: "玄関ドア調整", v: "鍵の○○サービス", a: "¥5,500" },
    { d: "2022/09/22", t: "エアコンクリーニング", v: "○○クリーン", a: "¥12,100" },
  ];
  return (
    <div className="font-sans text-slate-900">
      <div className="border-b-2 border-slate-900 pb-4">
        <div className="text-center text-2xl font-bold tracking-widest">修 繕 履 歴</div>
        <div className="mt-2 text-right text-xs text-slate-600">物件: グランドメゾン青山 101号室</div>
      </div>

      <table className="mt-8 w-full text-sm">
        <thead>
          <tr className="border-b-2 border-slate-300 text-left text-xs text-slate-600">
            <th className="py-2">対応日</th>
            <th className="py-2">内容</th>
            <th className="py-2">業者</th>
            <th className="py-2 text-right">金額</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={`border-b border-slate-200 ${i === 0 ? "bg-emerald-50" : ""}`}>
              <td className="py-2 tabular">{r.d}</td>
              <td className="py-2">{r.t}{i === 0 && <span className="ml-2 rounded bg-emerald-500 px-1.5 py-0.5 text-[9px] font-bold text-white">最新</span>}</td>
              <td className="py-2">{r.v}</td>
              <td className="py-2 text-right tabular">{r.a}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-10 rounded border border-slate-300 bg-slate-50 px-4 py-3 text-xs text-slate-600">
        本履歴は賃貸住宅の管理業務等の適正化に関する法律 第20条に基づき、ZENIN により自動保存されています。
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex border-b border-slate-200 text-sm last:border-b-0">
      <div className="w-32 bg-slate-50 px-3 py-2 font-semibold text-slate-700">{label}</div>
      <div className="flex-1 px-3 py-2">{value}</div>
    </div>
  );
}
