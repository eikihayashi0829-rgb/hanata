# 全任 -ZENIN- AI 修繕受付システム (LINE 連携対応)

不動産管理会社の「入居者・修繕業者・オーナー」三者間の電話調整を肩代わりする、
実行型 AI エージェント **「全任 -ZENIN-」**。

入居者は **LINE 公式アカウント** を友だち追加するだけで利用できます。
修繕の連絡 → AI による故障判定 → 自動返信 → 管理ダッシュボードへの即時反映までを、
**実装済みのLINE Messaging API + OpenAI Vision** で本物のフローとして動かせます。

---

## 機能 (実装済み)

| 機能 | 状態 |
|---|---|
| **LINE Webhook 受信** (`POST /api/line/webhook`) | ✅ 署名検証あり |
| **テキスト/画像メッセージの受信処理** | ✅ |
| **LINE 自動返信** (Reply / Push 両対応) | ✅ |
| **画像ダウンロード** (LINE Content API) | ✅ |
| **AI による故障判定** (OpenAI Vision) | ✅ APIキー無時はキーワード判定にフォールバック |
| **Flex Message での AI 判定カード返信** | ✅ |
| **管理ダッシュボードへのライブ反映** | ✅ 5秒ごとにポーリング |
| **投資家ピッチ用デモ画面** (`/`, `/line`, `/split` 等) | ✅ |

## 技術スタック

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- LINE Messaging API (Webhook + Reply + Push + Content)
- OpenAI Chat Completions API (Vision)
- 永続層: モジュールスコープ Map (in-memory)
  - **MVP-α 仕様**。Vercel serverless では関数インスタンスごとに独立。本格運用は Vercel KV / Upstash Redis / Postgres へ差し替え可能 (`src/lib/store.ts`)

---

## クイックスタート (ローカルで動かす)

```bash
cd zenin-mock
npm install
cp .env.example .env.local        # 値はあとで埋める
npm run dev                       # http://localhost:3000
```

LINE 連携なしでも UIモック (`/`, `/line`, `/split`, `/dashboard` など) はそのまま動きます。

---

## LINE 連携を有効化する手順 (本物のBotとして動かす)

### 1. LINE Developers でチャネルを作成

1. <https://developers.line.biz/console/> にログイン
2. **Provider** を作成 (なければ)
3. **新規チャネル作成** → **Messaging API**
4. チャネル名・アイコン (例: 「全任サポート」)、カテゴリーを設定
5. 作成後、以下を控える:
   - **Basic settings** タブの **Channel secret**
   - **Messaging API** タブの **Channel access token (long-lived)** → 「Issue」ボタンで発行

### 2. OpenAI APIキー (任意)

- <https://platform.openai.com/api-keys> で API キーを発行
- 未設定でもキーワードベースの簡易判定で動作します
- 設定すると画像から実際に故障内容を AI 判定します (推奨モデル: `gpt-4o-mini`)

### 3. Vercel にデプロイ

1. <https://vercel.com/new> で GitHub リポジトリを Import
2. **Root Directory** を `zenin-mock` に変更 (必須)
3. **Branch** を `claude/zenin-demo-mockup-mHntu` に変更
4. **Environment Variables** に以下を追加:

   | Name | Value |
   |---|---|
   | `LINE_CHANNEL_SECRET` | LINEで控えた Channel secret |
   | `LINE_CHANNEL_ACCESS_TOKEN` | LINEで控えた長期 Access token |
   | `OPENAI_API_KEY` | (任意) OpenAI のキー |
   | `OPENAI_MODEL` | (任意) 既定 `gpt-4o-mini` |

5. Deploy → URLが発行される (例: `https://zenin-mock.vercel.app`)

### 4. LINE Webhook URL を設定

1. LINE Developers Console → 該当チャネル → **Messaging API** タブ
2. **Webhook URL** に以下を設定:
   ```
   https://<あなたのVercel URL>/api/line/webhook
   ```
3. **Use webhook** を **ON**
4. **Verify** ボタンで疎通確認 (200 が返れば OK)
5. **Auto-reply messages** と **Greeting messages** は不要なら OFF にする
   (LINE 公式デフォルトの応答メッセージと衝突するため)

### 5. 動作確認

1. LINE Developers Console の QR コードからLINE公式アカウントを「友だち追加」
2. LINE で「エアコンが冷えません」のように送る
3. AIから「お写真を送ってください」と自動返信が届く
4. 任意の写真を送る
5. AI が画像解析した結果が **Flex Message のカード** で返ってくる
6. ブラウザで `https://<your-app>.vercel.app/dashboard` を開くと、
   上部「LINE経由の受付 (Live)」セクションに **5 秒以内に反映**される

ローカル開発で動作確認したい場合は ngrok 等で `localhost:3000` を HTTPS 公開し、
Webhook URL に指定してください。

```bash
# 例
ngrok http 3000
# → https://xxxx.ngrok.io/api/line/webhook を Webhook URL に設定
```

### 6. ヘルスチェック

ブラウザで以下を開いて環境変数の設定状況を確認できます:

```
https://<your-app>.vercel.app/api/line/webhook
```

`{"ok":true,"configured":{"lineSecret":true,"lineToken":true,"openaiKey":true}}` のように返れば OK。

---

## 画面一覧

| パス | 概要 |
|---|---|
| `/` | ランディング (LINE訴求 + 3バリュー) |
| `/line` | 入居者の LINE 画面 (iPhone風 UI モック / 投資家説明用) |
| `/split` | 入居者LINE × 管理ダッシュボードの二画面ライブデモ (シナリオ自動再生) |
| `/flow` | 業務フロー俯瞰図 (7ステップ) |
| `/dashboard` | 管理ダッシュボード (上部に **LINE Live 受付パネル**, 下にモック案件) |
| `/repair/[id]` | 修繕依頼詳細 + 最終承認バー |
| `/approved/[id]` | 承認完了アニメーション |
| `/document/[type]` | 修繕報告書 / 請求書 / 修繕履歴 のA4風プレビュー |
| `/api/line/webhook` | LINE Messaging API の Webhook エンドポイント (POST) |
| `/api/repairs` | LINE 経由で受信した案件一覧 (GET, JSON) |

## ディレクトリ構成

```
zenin-mock/
  .env.example                # 環境変数テンプレート
  src/
    app/
      page.tsx                # / (ランディング)
      line/                   # /line (LINE画面モック)
      split/                  # /split (二画面ライブデモ)
      flow/                   # /flow
      dashboard/              # /dashboard
      repair/[id]/            # /repair/[id]
      approved/[id]/          # /approved/[id]
      document/[type]/        # /document/[type]
      api/
        line/webhook/route.ts # ★ LINE Webhook 本体
        repairs/route.ts      # 案件一覧 API
    components/
      Logo.tsx, Sidebar.tsx
      LiveLinePanel.tsx       # ダッシュボード用 Live パネル
    lib/
      line.ts                 # LINE API 呼び出し + 署名検証
      ai.ts                   # OpenAI Vision + フォールバック
      store.ts                # 受信案件のストア (in-memory)
      mockData.ts             # 既存モック画面用のダミーデータ
```

---

## 投資家プレゼン手順 (推奨, 4〜5分)

### Aパターン: ストーリー重視 (おすすめ)

1. **`/`** ランディング → 「ライブデモを見る」
2. **`/split`** → 「自動再生」 → 二画面同時進行を見せる ★ピッチの山場
3. 完了 → 「承認画面を見る」 → **`/repair/RP-2024-0520-001`**
4. 緑バナーと2x2グリッドの説明 → 「承認する」
5. **`/approved/...`** で後続自動処理アニメ

### Bパターン: 実機デモ込み (LINE設定済みの場合)

1. **`/`** で価値訴求
2. **その場で投資家のスマホで LINE 公式アカウント友だち追加 → 試してもらう**
3. 直後に **`/dashboard`** を開くと「LINE経由の受付 (Live)」セクションに即反映 ← 一番刺さる

---

## 既知の制約 / 本番化に向けた TODO

| 項目 | 現状 | 本番化 |
|---|---|---|
| データ永続化 | in-memory Map | Vercel KV / Postgres へ差し替え (src/lib/store.ts) |
| 業者への自動連絡 | 未実装 (LINE上では「連絡中」と返信) | メール/SMS/LINE通知の自動配信 |
| 書類PDF生成 | UIモックのみ (画面表示) | react-pdf / puppeteer での出力 |
| マルチテナント | 単一の管理会社想定 | 物件・テナント分離設計 |
| 会計連携 | 未実装 | freee / マネーフォワード API |
| 法定書類保存 | 未実装 | 暗号化 + S3 / Box 保管 |
| 認証 | なし (`/dashboard` 等が公開) | NextAuth + 役割管理 |

これらは一気に実装するとリスクが高いので、**ピッチ → パイロット顧客獲得 → MVP-β** の順で段階的に積み上げるのが現実的です。
