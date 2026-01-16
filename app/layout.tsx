import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "个人技术博客",
  description: "Personal tech blog for knowledge management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
