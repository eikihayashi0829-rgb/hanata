export type PendingRepair = {
  id: string;
  propertyName: string;
  roomNo: string;
  tenantName: string;
  issue: string;
  category: string;
  aiCompletedAt: string;
  status: "approval_waiting" | "in_progress";
};

export const pendingRepairs: PendingRepair[] = [
  {
    id: "RP-2024-0520-001",
    propertyName: "グランドメゾン青山",
    roomNo: "101号室",
    tenantName: "田中 太郎",
    issue: "エアコン故障(冷風が出ない)",
    category: "設備故障",
    aiCompletedAt: "2024/05/20 14:34",
    status: "approval_waiting",
  },
  {
    id: "RP-2024-0520-002",
    propertyName: "パークサイド渋谷",
    roomNo: "302号室",
    tenantName: "佐藤 花子",
    issue: "給湯器からお湯が出ない",
    category: "水回り",
    aiCompletedAt: "2024/05/20 13:18",
    status: "approval_waiting",
  },
  {
    id: "RP-2024-0520-003",
    propertyName: "サンシャイン目黒",
    roomNo: "405号室",
    tenantName: "鈴木 一郎",
    issue: "玄関ドアの鍵が回らない",
    category: "鍵・建具",
    aiCompletedAt: "2024/05/20 12:02",
    status: "approval_waiting",
  },
  {
    id: "RP-2024-0520-004",
    propertyName: "リバーサイド品川",
    roomNo: "208号室",
    tenantName: "山本 美咲",
    issue: "洗面台の水漏れ",
    category: "水回り",
    aiCompletedAt: "2024/05/20 11:45",
    status: "approval_waiting",
  },
  {
    id: "RP-2024-0520-005",
    propertyName: "シティタワー新宿",
    roomNo: "1203号室",
    tenantName: "中村 健太",
    issue: "換気扇から異音",
    category: "設備故障",
    aiCompletedAt: "2024/05/20 10:12",
    status: "approval_waiting",
  },
];

export type AiActivity = {
  id: string;
  time: string;
  action: string;
  target: string;
  type: "intake" | "diagnose" | "contact" | "quote" | "report" | "history" | "compliance";
};

export const aiActivities: AiActivity[] = [
  { id: "a1", time: "14:34", action: "修繕報告書を自動作成", target: "グランドメゾン青山 101", type: "report" },
  { id: "a2", time: "14:31", action: "見積を比較・最安業者を選定", target: "B社 ¥26,400", type: "quote" },
  { id: "a3", time: "14:25", action: "業者3社へ自動連絡", target: "○○設備 / □□工務店 / △△サービス", type: "contact" },
  { id: "a4", time: "14:18", action: "故障内容をAI判定", target: "エアコン / 冷えない / 緊急度:中", type: "diagnose" },
  { id: "a5", time: "14:12", action: "入居者からLINE一次受付", target: "田中様 (101号室)", type: "intake" },
  { id: "a6", time: "13:48", action: "管理業法対応の帳票を生成", target: "パークサイド渋谷 302", type: "compliance" },
  { id: "a7", time: "13:22", action: "修繕履歴をクラウド保存", target: "サンシャイン目黒 405", type: "history" },
  { id: "a8", time: "12:55", action: "オーナー報告書を自動下書き", target: "リバーサイド品川 208", type: "report" },
  { id: "a9", time: "12:30", action: "業者2社の見積を整理", target: "シティタワー新宿 1203", type: "quote" },
  { id: "a10", time: "11:48", action: "入居者へ訪問日程を自動連絡", target: "中村様 (1203号室)", type: "contact" },
];

export type DashboardStats = {
  aiCompleted: number;
  pendingApproval: number;
  avgResponseMin: number;
  savedHoursThisMonth: number;
};

export const dashboardStats: DashboardStats = {
  aiCompleted: 23,
  pendingApproval: 5,
  avgResponseMin: 1.2,
  savedHoursThisMonth: 142,
};

export type RepairDetail = {
  id: string;
  propertyName: string;
  roomNo: string;
  tenantName: string;
  issue: string;
  receivedAt: string;
  status: string;
  aiTasks: string[];
  documents: {
    type: "report" | "invoice" | "history";
    title: string;
    sub: string;
  }[];
  vendor: {
    name: string;
    workCompletedAt: string;
    workDetail: string;
    warranty: string;
    note: string;
  };
  quotes: { vendor: string; amount: number; selected: boolean }[];
};

export const repairDetail: RepairDetail = {
  id: "RP-2024-0520-001",
  propertyName: "グランドメゾン青山 101号室",
  roomNo: "101号室",
  tenantName: "田中 太郎",
  issue: "エアコン故障 (冷風が出ない)",
  receivedAt: "2024/05/20 14:33",
  status: "対応完了 (承認待ち)",
  aiTasks: [
    "修繕報告書を作成しました",
    "請求書を整理・データ化しました",
    "修繕履歴を保存しました",
    "関連業者へ連絡・日程調整しました",
    "管理業法に基づく記録を作成しました",
  ],
  documents: [
    { type: "report", title: "修繕報告書", sub: "作成日時 2024/05/20 14:34" },
    { type: "invoice", title: "請求書 (株式会社○○設備)", sub: "金額 ¥28,600 (税込)" },
    { type: "history", title: "修繕履歴", sub: "最終更新 2024/05/20 14:34" },
  ],
  vendor: {
    name: "株式会社○○設備",
    workCompletedAt: "2024/05/21 10:00",
    workDetail: "エアコン本体交換 (8畳用 / 省エネ機種)",
    warranty: "1年間",
    note: "室外機も点検済み。冷媒漏れ等の異常なし。",
  },
  quotes: [
    { vendor: "A社 (○○空調)", amount: 28000, selected: false },
    { vendor: "B社 (株式会社○○設備)", amount: 26400, selected: true },
    { vendor: "C社 (△△サービス)", amount: 31000, selected: false },
  ],
};

export const flowSteps = [
  {
    no: 1,
    title: "写真受信",
    desc: "入居者からLINEで一次受付",
  },
  {
    no: 2,
    title: "AI故障判定",
    desc: "設備・症状・緊急度を自動推定",
  },
  {
    no: 3,
    title: "業者連絡",
    desc: "登録業者へ自動架電・チャット",
  },
  {
    no: 4,
    title: "見積整理",
    desc: "金額比較・最安業者を提案",
  },
  {
    no: 5,
    title: "履歴保存",
    desc: "修繕履歴をクラウド管理",
  },
  {
    no: 6,
    title: "管理業法対応",
    desc: "帳票・保存要件を自動充足",
  },
  {
    no: 7,
    title: "承認",
    desc: "担当者は承認するだけ",
  },
];
