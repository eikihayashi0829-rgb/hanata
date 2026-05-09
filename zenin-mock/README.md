# 全任 -ZENIN- 投資家デモ用モックアップ

不動産管理会社の「入居者・修繕業者・オーナー」三者間の電話調整を肩代わりする、
実行型 AI エージェント **「全任 -ZENIN-」** の投資家ピッチ用 Web デモです。

入居者は **LINE 公式アカウント** を友だち追加するだけで利用できる、という導入動線を
そのまま再現しています。

---

## 技術スタック

- Next.js 14 (App Router) / TypeScript
- Tailwind CSS
- lucide-react (アイコン)
- Inter + Noto Sans JP (Google Fonts)

すべてフロントエンド内のモックデータで動作。API・DB・LINE Messaging API
への実接続は行っていません (= API キー不要、Vercel に置けばそのまま動く)。

## セットアップ & 起動

```bash
cd zenin-mock
npm install
npm run dev          # http://localhost:3000
```

本番ビルド:

```bash
npm run build
npm run start
```

## デプロイ (Vercel)

1. <https://vercel.com/new> で GitHub リポジトリ `eikihayashi0829-rgb/hanata` を Import
2. **Root Directory**: `zenin-mock` に変更 (← 必須)
3. **Branch**: `claude/zenin-demo-mockup-mHntu`
4. Deploy → 1〜2分で公開URL発行

## 画面一覧

| パス | 概要 |
|---|---|
| `/` | ランディング (LINE訴求 + 3バリュー) |
| `/line` | **入居者の LINE 画面 (iPhone風フレーム + 対話進行)** ★ |
| `/split` | **入居者LINE + 管理ダッシュボードの二画面ライブデモ** ★最強 |
| `/flow` | 業務フロー俯瞰図 (7ステップ + 自動実行帯) |
| `/dashboard` | 管理ダッシュボード (サマリー / 承認待ち / 活動フィード) |
| `/repair/[id]` | 修繕依頼詳細 (2x2カード + 最終承認バー) |
| `/approved/[id]` | 承認完了アニメーション |
| `/document/[type]` | 修繕報告書 / 請求書 / 修繕履歴 のA4風プレビュー |

## 投資家デモ手順 (推奨)

ピッチ中はブラウザで以下の順に遷移してください。所要時間 約4〜5分。

### Aパターン: ストーリー重視 (おすすめ)

1. **`/`** ランディング
   - 「電話の鳴らない、管理事務所を創る。」で価値の輪郭。
   - 「ライブデモを見る」をクリック。

2. **`/split` ライブ二画面デモ** ★ピッチの山場
   - 上の **「自動再生」** ボタンを押す → 9ステップが自動で進行。
   - **左のLINEに入居者からのメッセージが現れる** と同時に、
     **右のダッシュボードに自動処理ログがリアルタイムに追加される** 様子を見せる。
   - 「これがLINE1本で動く全任の世界です」と説明。
   - 完了後の「承認画面を見る」をクリック。

3. **`/repair/RP-2024-0520-001`** 修繕依頼詳細
   - 緑バナー: 「AIが修繕業務を自動処理しました」を読み上げ。
   - 2x2 グリッドで「サマリー / AI処理済みタスク / 作成書類 / 関連情報」を順に紹介。
   - 必要なら **[プレビュー]** で A4 風書類を見せる。
   - 画面下部の **[承認する]** をクリック。

4. **`/approved/RP-2024-0520-001`**
   - 「オーナー報告」「会計連携」が順次完了するアニメで締める。
   - 「担当者がやったのは緑のボタン1回だけ」というメッセージで価値を確定。

### Bパターン: プロダクト重視

LINE 単独画面、業務フロー、ダッシュボードを個別に深掘りしたい場合:
**`/`** → **`/line`** (LINE単独で対話を進める) → **`/flow`** → **`/dashboard`** → **[確認]** → **`/repair/...`** → **[承認する]** → **`/approved/...`**

## ディレクトリ構成

```
zenin-mock/
  src/
    app/
      layout.tsx, globals.css
      page.tsx                       # / (ランディング)
      line/page.tsx                  # /line (LINE画面)
      line/LineChat.tsx              #   インタラクティブチャット (Client)
      split/page.tsx                 # /split (二画面デモ)
      split/SplitDemo.tsx            #   ライブ進行ロジック (Client)
      flow/page.tsx                  # /flow
      dashboard/page.tsx             # /dashboard
      repair/[id]/page.tsx           # /repair/[id]
      repair/[id]/ApprovalBar.tsx
      approved/[id]/page.tsx
      approved/[id]/ApprovedAnimation.tsx
      document/[type]/page.tsx
      document/[type]/CloseButton.tsx
    components/
      Logo.tsx
      Sidebar.tsx
    lib/
      mockData.ts                    # モックデータ一式
```

## 注意 / 現状の制約

- このリポジトリは **投資家プレゼン用の UI モック** です。LINE Messaging API
  との実接続、LLM 呼び出し、業者への自動連絡などは含まれていません。
- 本番化する場合の実装ガイドは `docs/PRODUCTION.md` (作成予定) を参照。
- PC 表示 (1280px 以上) を前提に設計しています。
- 書類プレビューの「ダウンロード」は UI のみで実ファイルは出力されません。
