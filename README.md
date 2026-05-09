# ハナタ — 賃貸管理 × 修繕業者マッチングプラットフォーム

投資家プレゼン用の動くモック。中小賃貸管理会社と地域の修繕・メンテナンス業者を即マッチングする SaaS のプロトタイプです。

> 実データベースはありません。すべてのデータは `lib/mockData.ts` にハードコードされています。

## 技術スタック

- Next.js 14 (App Router) / TypeScript
- Tailwind CSS（カスタムテーマ：ブランドブルー + 危険レッド）
- Lucide React（アイコン）
- Recharts（管理者ダッシュボード）
- Noto Sans JP

## セットアップ

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開く。

本番ビルドの確認：

```bash
npm run build
npm start
```

## 画面一覧（全11画面）

### 共通
- `/` — ランディングページ

### 管理会社向け
- `/manager/dashboard` — ダッシュボード（緊急アラート、進行中案件、節約工数）
- `/manager/jobs/new` — 新規案件投稿フォーム（カテゴリ・緊急度・写真）
- `/manager/jobs/job-001` — 案件詳細・見積比較
- `/manager/jobs/job-001/chat` — 業者とのチャット
- `/manager/report/rep-001` — オーナー向け自動生成レポート

### 業者向け
- `/contractor/dashboard` — 業者ダッシュボード（新着・売上）
- `/contractor/jobs/available` — 応募可能な案件リスト
- `/contractor/jobs/cj-001` — 案件詳細・見積回答
- `/contractor/jobs/cj-005/complete` — 完了報告（写真アップロード風）

### 運営
- `/admin/stats` — 投資家向け統計ダッシュボード（KPI、グラフ、LIVEフィード）

## プレゼン時のおすすめデモフロー

8〜10分でひと通り見せられる順序です。

1. **`/`** — サービス紹介。「夜間の水漏れも、アプリで即マッチング。」
2. **`/manager/dashboard`** — 管理会社の現場感。緊急2件アラート、節約工数42時間。
3. **`/manager/jobs/new`** — 案件投稿の体験。カテゴリ・緊急度・写真 → 「マッチング中...」演出。
4. **`/manager/jobs/job-001`** — 業者からの3社見積を比較。最安・最速バッジ。
5. **`/manager/jobs/job-001/chat`** — 現場のやりとり。LINE風UIで自分でメッセージも送れる。
6. **`/manager/report/rep-001`** — 月次レポート。AIサマリーと提案で「月末作業30分→3分」。
7. **`/contractor/dashboard`** — 業者側。新着案件・売上・評価。
8. **`/contractor/jobs/available`** — 応募可能な案件一覧。
9. **`/contractor/jobs/cj-001`** — 見積を入れる体験（送信で完了モーダル）。
10. **`/admin/stats`** — **大トリ**。KPIカード、月次推移グラフ、カテゴリ円グラフ、LIVE フィードで「実運用感」を演出。

## スクリーンショット撮影のおすすめサイズ

| 用途 | サイズ |
|------|--------|
| モバイル（管理会社／業者画面） | **375 × 812** (iPhone 13/14) |
| モバイル（縦長スクロール用） | **390 × 1500** |
| デスクトップ（LP・運営ダッシュボード） | **1440 × 900** |
| プレゼン埋め込み（16:9） | **1920 × 1080** |

> 管理会社・業者の画面はモバイル幅で美しく見えるよう設計されています。スマホで撮影 or DevTools のレスポンシブモードでどうぞ。

## デザイン方針

- 配色：ブランド `#1E40AF`（深い青）／緊急 `#DC2626`（赤）
- 余白多め、角丸、ソフトシャドウ。SmartHR / freee / Stripe 系の落ち着いた業務 SaaS
- 派手なアニメーションは控えめ（緊急アラートのパルスとフェードイン程度）

## ディレクトリ構成

```
app/
  page.tsx                      # ランディング
  manager/                       # 管理会社向け5画面
  contractor/                    # 業者向け4画面
  admin/stats/                   # 運営ダッシュボード
components/
  AppShell.tsx                   # モバイル用ヘッダ付きシェル
  Logo.tsx
  ui/                            # Button, Card, Badge, Input
lib/
  mockData.ts                    # 全ダミーデータ（案件・業者・統計）
  utils.ts
```

## 制約（意図的）

- 認証なし（いきなりダッシュボード）
- バックエンドAPIなし
- データベースなし
- 決済なし

ハードコードのダミーデータで画面間遷移を再現し、プレゼンで「リアルに見える」ことが最優先です。
