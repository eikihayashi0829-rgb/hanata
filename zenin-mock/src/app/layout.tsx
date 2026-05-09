import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "全任 -ZENIN- | 不動産管理AIエージェント",
  description:
    "不動産管理会社の三者間調整を肩代わりする、実行型AIエージェント。電話の鳴らない、管理事務所を創る。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
