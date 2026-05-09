// All hardcoded mock data for the presentation prototype.
// No backend, no database. Just enough fiction to feel real.

export type JobStatus = "見積待ち" | "業者選定中" | "作業中" | "完了" | "キャンセル";
export type JobUrgency = "即時" | "24時間以内" | "1週間以内" | "期限指定";
export type JobCategory = "水回り" | "電気" | "内装" | "外装" | "清掃" | "その他";

export type Quote = {
  contractorId: string;
  name: string;
  price: number;
  eta: string;
  rating: number;
  pastJobs: number;
  comment?: string;
};

export type Job = {
  id: string;
  title: string;
  propertyName: string;
  propertyAddress: string;
  category: JobCategory;
  urgency: JobUrgency;
  description: string;
  photos: string[];
  budget: number;
  status: JobStatus;
  postedAt: string;
  ownerName: string;
  managerName: string;
  selectedContractorId?: string;
  quotes: Quote[];
};

export const mockJobs: Job[] = [
  {
    id: "job-001",
    title: "水漏れ緊急対応",
    propertyName: "サンライズマンション 301",
    propertyAddress: "東京都新宿区西新宿2-8-1",
    category: "水回り",
    urgency: "即時",
    description:
      "キッチンシンク下から水漏れ。入居者から夜10時に連絡あり。床への漏れは現状なし、応急処置済み。",
    photos: ["leak1", "leak2"],
    budget: 30000,
    status: "見積待ち",
    postedAt: "2026-05-09 22:13",
    ownerName: "山田 一郎",
    managerName: "鈴木（管理担当）",
    quotes: [
      {
        contractorId: "c-001",
        name: "佐藤水道工事",
        price: 25000,
        eta: "30分以内",
        rating: 4.8,
        pastJobs: 142,
        comment: "夜間料金込み。すぐ向かえます。",
      },
      {
        contractorId: "c-002",
        name: "ABC設備サービス",
        price: 32000,
        eta: "1時間以内",
        rating: 4.5,
        pastJobs: 87,
        comment: "深夜帯の対応可能です。",
      },
      {
        contractorId: "c-003",
        name: "新宿水道センター",
        price: 28000,
        eta: "45分以内",
        rating: 4.7,
        pastJobs: 213,
      },
    ],
  },
  {
    id: "job-002",
    title: "エアコン効きが悪い",
    propertyName: "グリーンハイツ 202",
    propertyAddress: "東京都中野区中央4-12-3",
    category: "電気",
    urgency: "24時間以内",
    description:
      "リビングのエアコンの効きが弱い。ガス漏れの可能性あり。入居者は明日午後在宅。",
    photos: ["ac1"],
    budget: 20000,
    status: "業者選定中",
    postedAt: "2026-05-09 14:02",
    ownerName: "田中 美咲",
    managerName: "鈴木（管理担当）",
    quotes: [
      {
        contractorId: "c-004",
        name: "中野電機工房",
        price: 18000,
        eta: "明日10:00",
        rating: 4.6,
        pastJobs: 64,
      },
      {
        contractorId: "c-005",
        name: "クールテック",
        price: 22000,
        eta: "明日13:00",
        rating: 4.9,
        pastJobs: 198,
      },
    ],
  },
  {
    id: "job-003",
    title: "退去後クロス張替え",
    propertyName: "パークサイド吉祥寺 405",
    propertyAddress: "東京都武蔵野市吉祥寺本町1-5-7",
    category: "内装",
    urgency: "1週間以内",
    description:
      "退去後の原状回復。リビング・寝室のクロス張替え、軽微な床補修。約45㎡。",
    photos: ["wall1", "wall2", "wall3"],
    budget: 120000,
    status: "作業中",
    postedAt: "2026-05-06 09:30",
    ownerName: "佐々木 健",
    managerName: "鈴木（管理担当）",
    selectedContractorId: "c-006",
    quotes: [
      {
        contractorId: "c-006",
        name: "リフォーム匠",
        price: 105000,
        eta: "5/12着工",
        rating: 4.8,
        pastJobs: 312,
      },
    ],
  },
  {
    id: "job-004",
    title: "玄関ドアの鍵交換",
    propertyName: "メゾン目黒 102",
    propertyAddress: "東京都目黒区目黒1-2-3",
    category: "その他",
    urgency: "即時",
    description:
      "入居者が鍵を紛失。本人はオートロック内で待機中。立会い必要。",
    photos: [],
    budget: 18000,
    status: "完了",
    postedAt: "2026-05-08 19:45",
    ownerName: "斉藤 真理子",
    managerName: "鈴木（管理担当）",
    selectedContractorId: "c-007",
    quotes: [
      {
        contractorId: "c-007",
        name: "鍵の救急24",
        price: 15000,
        eta: "20分以内",
        rating: 4.9,
        pastJobs: 421,
      },
    ],
  },
  {
    id: "job-005",
    title: "共用部清掃（月次）",
    propertyName: "リバーサイド両国 全戸",
    propertyAddress: "東京都墨田区両国3-1-1",
    category: "清掃",
    urgency: "1週間以内",
    description: "月次の階段・エントランス・ゴミ置き場清掃。鍵の受け渡しは管理人室。",
    photos: [],
    budget: 35000,
    status: "見積待ち",
    postedAt: "2026-05-09 10:00",
    ownerName: "高橋 雅彦",
    managerName: "鈴木（管理担当）",
    quotes: [
      {
        contractorId: "c-008",
        name: "クリーンサービス東京",
        price: 32000,
        eta: "5/15対応可",
        rating: 4.7,
        pastJobs: 256,
      },
    ],
  },
  {
    id: "job-006",
    title: "外壁ひび割れ点検",
    propertyName: "ヒルズ池袋 全棟",
    propertyAddress: "東京都豊島区西池袋3-5-9",
    category: "外装",
    urgency: "1週間以内",
    description:
      "築15年。北側外壁にひび割れの報告。点検と補修見積をお願いしたい。",
    photos: ["wall_outside"],
    budget: 50000,
    status: "見積待ち",
    postedAt: "2026-05-09 11:20",
    ownerName: "渡辺 浩二",
    managerName: "鈴木（管理担当）",
    quotes: [],
  },
];

export type Contractor = {
  id: string;
  name: string;
  representative: string;
  categories: JobCategory[];
  areas: string[];
  rating: number;
  pastJobs: number;
  responseRate: number;
  nightAvailable: boolean;
};

export const mockContractors: Contractor[] = [
  {
    id: "c-001",
    name: "佐藤水道工事",
    representative: "佐藤 健太",
    categories: ["水回り"],
    areas: ["新宿区", "中野区", "渋谷区"],
    rating: 4.8,
    pastJobs: 142,
    responseRate: 98,
    nightAvailable: true,
  },
  {
    id: "c-002",
    name: "ABC設備サービス",
    representative: "山口 浩",
    categories: ["水回り", "電気"],
    areas: ["新宿区", "中野区", "杉並区"],
    rating: 4.5,
    pastJobs: 87,
    responseRate: 92,
    nightAvailable: true,
  },
  {
    id: "c-003",
    name: "新宿水道センター",
    representative: "中村 翔",
    categories: ["水回り"],
    areas: ["新宿区", "豊島区"],
    rating: 4.7,
    pastJobs: 213,
    responseRate: 95,
    nightAvailable: true,
  },
  {
    id: "c-004",
    name: "中野電機工房",
    representative: "井上 大輔",
    categories: ["電気"],
    areas: ["中野区", "練馬区"],
    rating: 4.6,
    pastJobs: 64,
    responseRate: 89,
    nightAvailable: false,
  },
  {
    id: "c-005",
    name: "クールテック",
    representative: "森 雄一",
    categories: ["電気"],
    areas: ["中野区", "杉並区", "世田谷区"],
    rating: 4.9,
    pastJobs: 198,
    responseRate: 96,
    nightAvailable: true,
  },
  {
    id: "c-006",
    name: "リフォーム匠",
    representative: "藤本 茂",
    categories: ["内装", "外装"],
    areas: ["武蔵野市", "三鷹市", "杉並区"],
    rating: 4.8,
    pastJobs: 312,
    responseRate: 91,
    nightAvailable: false,
  },
  {
    id: "c-007",
    name: "鍵の救急24",
    representative: "小林 義雄",
    categories: ["その他"],
    areas: ["目黒区", "品川区", "渋谷区"],
    rating: 4.9,
    pastJobs: 421,
    responseRate: 99,
    nightAvailable: true,
  },
  {
    id: "c-008",
    name: "クリーンサービス東京",
    representative: "横山 由紀",
    categories: ["清掃"],
    areas: ["墨田区", "江東区", "台東区"],
    rating: 4.7,
    pastJobs: 256,
    responseRate: 94,
    nightAvailable: false,
  },
  {
    id: "c-009",
    name: "東京外装パートナーズ",
    representative: "伊藤 隆志",
    categories: ["外装"],
    areas: ["豊島区", "板橋区", "北区"],
    rating: 4.6,
    pastJobs: 178,
    responseRate: 88,
    nightAvailable: false,
  },
];

export type ChatMessage = {
  id: string;
  sender: "manager" | "contractor" | "system";
  text: string;
  time: string;
  attachment?: { type: "photo"; label: string };
};

export const mockChats: Record<string, ChatMessage[]> = {
  "job-001": [
    {
      id: "m-1",
      sender: "system",
      text: "佐藤水道工事と作業を開始しました",
      time: "22:18",
    },
    {
      id: "m-2",
      sender: "contractor",
      text: "ご依頼ありがとうございます。これより向かいます。到着予定 22:45 です。",
      time: "22:19",
    },
    {
      id: "m-3",
      sender: "manager",
      text: "よろしくお願いします。入居者には連絡済みです。",
      time: "22:20",
    },
    {
      id: "m-4",
      sender: "contractor",
      text: "現場到着しました。確認後、応急処置に入ります。",
      time: "22:43",
    },
    {
      id: "m-5",
      sender: "contractor",
      text: "原因はパッキンの劣化でした。部品交換で対応できます。",
      time: "22:55",
      attachment: { type: "photo", label: "現場写真" },
    },
    {
      id: "m-6",
      sender: "manager",
      text: "了解しました。お願いします。",
      time: "22:57",
    },
    {
      id: "m-7",
      sender: "contractor",
      text: "作業完了しました。漏れも止まっています。報告書をお送りします。",
      time: "23:21",
      attachment: { type: "photo", label: "完了写真" },
    },
  ],
};

export type ContractorJob = {
  id: string;
  title: string;
  propertyName: string;
  area: string;
  category: JobCategory;
  urgency: JobUrgency;
  budgetRange: string;
  postedMinutesAgo: number;
  description: string;
  status: "応募可能" | "見積送信済" | "受注" | "完了";
  myQuote?: { price: number; eta: string };
};

export const mockContractorJobs: ContractorJob[] = [
  {
    id: "cj-001",
    title: "水漏れ緊急対応",
    propertyName: "サンライズマンション 301",
    area: "新宿区西新宿",
    category: "水回り",
    urgency: "即時",
    budgetRange: "¥25,000 〜 ¥35,000",
    postedMinutesAgo: 4,
    description:
      "キッチン下水漏れ。入居者対応中。応急処置済。深夜帯対応可能な業者を探しています。",
    status: "応募可能",
  },
  {
    id: "cj-002",
    title: "洗面台つまり",
    propertyName: "パレス代々木 504",
    area: "渋谷区代々木",
    category: "水回り",
    urgency: "24時間以内",
    budgetRange: "¥15,000 〜 ¥20,000",
    postedMinutesAgo: 23,
    description: "洗面台が完全につまった。明日午前中の対応希望。",
    status: "応募可能",
  },
  {
    id: "cj-003",
    title: "トイレ便器交換",
    propertyName: "メイプル中野 203",
    area: "中野区中野",
    category: "水回り",
    urgency: "1週間以内",
    budgetRange: "¥45,000 〜 ¥80,000",
    postedMinutesAgo: 132,
    description:
      "築20年、便器のひび割れ。既設タイプ温水洗浄付き。標準グレードへの交換希望。",
    status: "応募可能",
  },
  {
    id: "cj-004",
    title: "シャワー水栓不良",
    propertyName: "サンライズ高田馬場 308",
    area: "新宿区高田馬場",
    category: "水回り",
    urgency: "24時間以内",
    budgetRange: "¥18,000 〜 ¥25,000",
    postedMinutesAgo: 215,
    description: "シャワーから水が出ない。混合水栓の不具合と思われる。",
    status: "見積送信済",
    myQuote: { price: 21000, eta: "明日午前" },
  },
  {
    id: "cj-005",
    title: "給湯器お湯出ない",
    propertyName: "リバーハイム神田 1102",
    area: "千代田区神田",
    category: "水回り",
    urgency: "即時",
    budgetRange: "¥50,000 〜 ¥120,000",
    postedMinutesAgo: 380,
    description: "給湯器の故障。エラーコード111。築16年。",
    status: "受注",
    myQuote: { price: 88000, eta: "本日18:00" },
  },
];

export const mockStats = {
  totalManagers: 247,
  totalContractors: 1842,
  monthlyMatches: 3421,
  avgResponseMinutes: 18,
  hoursReducedPerCompany: 42,
  customerSatisfaction: 4.7,
  monthlyGmv: 124800000, // GMV in JPY
  growthMom: 23, // % MoM growth
};

export const mockMonthlyTrend = [
  { month: "11月", matches: 1840, gmv: 62000000 },
  { month: "12月", matches: 2120, gmv: 73000000 },
  { month: "1月", matches: 2280, gmv: 81000000 },
  { month: "2月", matches: 2510, gmv: 89000000 },
  { month: "3月", matches: 2780, gmv: 96000000 },
  { month: "4月", matches: 3140, gmv: 108000000 },
  { month: "5月", matches: 3421, gmv: 124800000 },
];

export const mockCategoryShare: { name: JobCategory; value: number; color: string }[] = [
  { name: "水回り", value: 1320, color: "#1E40AF" },
  { name: "電気", value: 720, color: "#3b62f4" },
  { name: "内装", value: 580, color: "#6088f9" },
  { name: "外装", value: 310, color: "#93b1fd" },
  { name: "清掃", value: 380, color: "#bfd1fe" },
  { name: "その他", value: 111, color: "#dbe5fe" },
];

export const mockUrgencyMix = [
  { name: "即時", value: 28 },
  { name: "24時間以内", value: 34 },
  { name: "1週間以内", value: 31 },
  { name: "期限指定", value: 7 },
];

export const mockOwnerReport = {
  reportId: "rep-001",
  period: "2026年5月",
  ownerName: "山田 一郎",
  propertyName: "サンライズマンション",
  totalIncidents: 3,
  totalCost: 87000,
  avgResolutionHours: 1.2,
  satisfaction: 4.8,
  incidents: [
    {
      date: "5/3",
      title: "玄関灯交換",
      contractor: "中野電機工房",
      cost: 12000,
      status: "完了",
    },
    {
      date: "5/8",
      title: "玄関ドア鍵交換",
      contractor: "鍵の救急24",
      cost: 15000,
      status: "完了",
    },
    {
      date: "5/9",
      title: "キッチン水漏れ修繕",
      contractor: "佐藤水道工事",
      cost: 60000,
      status: "完了",
    },
  ],
  recommendations: [
    {
      title: "給湯器の予防保全",
      detail:
        "築16年の給湯器が2台。直近の故障率データから、6ヶ月以内の交換を推奨します。",
    },
    {
      title: "共用部LED化",
      detail:
        "現状の蛍光灯をLED化することで、年間の電気代を約32%削減できる試算です。",
    },
  ],
};
