import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "传统术数古籍 AI 解读平台",
  description: "中文版传统术数古籍 AI 解读平台 MVP，可点击 mock 原型。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8">
          <header className="sticky top-0 z-20 mb-6 rounded-3xl border border-white/60 bg-paper/88 px-4 py-3 shadow-card backdrop-blur">
            <nav className="flex flex-wrap items-center justify-between gap-3">
              <Link href="/" className="text-lg font-semibold tracking-tight text-ink">
                老祖宗玄学
              </Link>
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
                <Link className="rounded-full px-3 py-1.5 hover:bg-white" href="/#services">
                  功能入口
                </Link>
                <Link className="rounded-full px-3 py-1.5 hover:bg-white" href="/records">
                  我的记录
                </Link>
                <Link className="rounded-full px-3 py-1.5 hover:bg-white" href="/#risk">
                  风险说明
                </Link>
              </div>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="mt-10 rounded-3xl border border-white/70 bg-white/60 p-5 text-sm leading-7 text-muted">
            本站当前为 P2 可点击 mock 原型。内容仅用于传统文化参考、自我整理与产品流程测试，不构成现实结果承诺，不替代医疗、法律、投资等专业建议。
          </footer>
        </div>
      </body>
    </html>
  );
}
