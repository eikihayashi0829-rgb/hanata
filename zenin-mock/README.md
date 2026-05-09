# 全任 -ZENIN- 投資家デモ用モックアップ

不動産管理会社の「入居者・修繕業者・オーナー」三者間の電話調整を肩代わりする、
実行型AIエージェント **「全任 -ZENIN-」** の投資家ピッチ用 Web モックアップです。

すべてフロントエンドの静的データで動作し、API・DB は使用しません。

---

## 技術スタック

- Next.js 14 (App Router) / TypeScript
- Tailwind CSS
- lucide-react (アイコン)
- Inter + Noto Sans JP (Google Fonts)

## セットアップ & 起動

```bash
cd zenin-mock
npm install
npm run dev
```

開発サーバが <http://localhost:3000> で立ち上がります。

本番ビルドの確認:

```bash
npm run build
npm run start
```

## 画面一覧

| パス | 概要 |
|---|---|
| `/` | ランディング (ヒーロー + 3つのバリュー) |
| `/flow` | 業務フロー俯瞰図 (7ステップ + 自動実行帯) |
| `/dashboard` | ダッシュボード (サマリー4枚 + 承認待ちテーブル + リアルタイム活動フィード) |
| `/repair/[id]` | 修繕依頼詳細 (★目玉画面 / 2x2カード + 最終承認バー) |
| `/approved/[id]` | 承認完了 (大チェック + 後続処理アニメーション) |
| `/document/[type]` | 書類プレビュー (`report` / `invoice` / `history` の A4風サンプル) |

## 投資家デモ手順

ピッチ中はブラウザで以下の順に遷移してください。所要時間 約3〜4分。

1. **`/` ランディング**
   - 「電話の鳴らない、管理事務所を創る。」のキャッチコピーで掴む。
   - 3つのバリュー (対応時間80%削減 / 人的ミスゼロ / 管理業法対応) で価値の輪郭を提示。
   - **「デモを見る」 をクリック → `/dashboard`**

   …の前に、製品の中身を見せたい場合はヘッダーの「業務フロー」リンクから先に
   `/flow` へ寄り道するのもおすすめです。

2. **`/flow` 業務フロー俯瞰図**
   - 横並び7ステップを見せ、「ここまで全部AIが自動でやります」と説明。
   - 下部の緑帯「AIがすべて自動で実行 → 承認するだけで完了」で締める。
   - 「実際のダッシュボードを見る」 → `/dashboard`

3. **`/dashboard` ダッシュボード**
   - 上部サマリー: 今日 23件処理 / 削減142時間 を強調。
   - 「承認待ちタスク一覧」最上行 (グランドメゾン青山 101) の **[確認]** をクリック。

4. **`/repair/RP-2024-0520-001` 修繕依頼詳細** ★ ピッチの山場
   - 緑のサクセスバナー: 「AIが修繕業務を自動処理しました」を読み上げる。
   - 2x2 グリッドで「サマリー / AI処理済みタスク / 作成書類 / 関連情報」を順に紹介。
   - 必要なら書類カードの **[プレビュー]** をクリックして A4 風書類を見せる
     (戻るときはブラウザの戻る、または「閉じる」)。
   - 画面下部の **[承認する]** をクリック。

5. **`/approved/RP-2024-0520-001` 承認完了**
   - 「オーナー報告」「会計連携」が順にチェックマーク化されるアニメーションを見せる。
   - 「担当者がやったのは緑のボタン1回だけ」というメッセージで締める。
   - 「ダッシュボードへ戻る」で `/dashboard` に復帰。

## ディレクトリ構成

```
zenin-mock/
  src/
    app/
      layout.tsx, globals.css
      page.tsx                       # /
      flow/page.tsx                  # /flow
      dashboard/page.tsx             # /dashboard
      repair/[id]/page.tsx           # /repair/[id]
      repair/[id]/ApprovalBar.tsx    #   承認バー (Client)
      approved/[id]/page.tsx         # /approved/[id]
      approved/[id]/ApprovedAnimation.tsx
      document/[type]/page.tsx       # /document/[type]
      document/[type]/CloseButton.tsx
    components/
      Logo.tsx
      Sidebar.tsx
    lib/
      mockData.ts                    # モックデータ一式
  package.json, tailwind.config.ts, tsconfig.json, ...
```

## 注意

- PC 表示 (1280px 以上) を前提に設計しています。投資家デモはノートPC + 外部
  ディスプレイで行ってください。
- サイドバーの「ダッシュボード」以外の項目は、現状すべて `/dashboard` に戻る
  ダミーリンクです。デモ動線上は使用しません。
- 書類プレビュー画面の「ダウンロード」は UI のみで、実ファイルは出力されません。
