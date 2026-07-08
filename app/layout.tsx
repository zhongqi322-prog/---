import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "老祖宗玄学｜传统术数古籍 AI 解读平台",
  description: "中文版传统术数古籍 AI 解读平台 MVP，基于古籍出处、结构化规则与风险边界生成测试解读报告。",
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
          <header className="sticky top-0 z-20 mb-6 rounded-3xl border border-gold/35 bg-[#07100f]/90 px-4 py-3 shadow-[0_18px_48px_rgba(0,0,0,0.26)] backdrop-blur">
            <nav className="flex items-center justify-between gap-3">
              <Link href="/" className="flex items-center gap-3 text-[#f5d7a0]">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#d9a85f] text-lg font-semibold">
                  玄
                </span>
                <span className="text-xl font-semibold tracking-tight">老祖宗玄学</span>
                <span className="hidden rounded-md border border-gold/45 px-2 py-1 text-xs text-[#e8c990] sm:inline">
                  古籍 AI 解读
                </span>
              </Link>
              <div className="flex flex-wrap justify-end gap-1 text-xs text-[#d8c5a1] sm:items-center sm:gap-2 sm:text-sm">
                <Link className="rounded-full px-3 py-1.5 hover:bg-gold/10" href="/#services">
                  功能入口
                </Link>
                <Link className="rounded-full px-3 py-1.5 hover:bg-gold/10" href="/records">
                  我的记录
                </Link>
                <Link className="rounded-full px-3 py-1.5 hover:bg-gold/10" href="/#risk">
                  风险说明
                </Link>
              </div>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="mt-10 rounded-3xl border border-gold/35 bg-[#fff8e8] p-5 text-sm font-medium leading-7 text-[#4f3b2c] shadow-card">
            本站当前为可点击测试版。内容仅用于传统文化参考、自我整理与产品流程测试，不构成现实结果承诺，不替代医疗、法律、投资等专业建议。
          </footer>
        </div>
      </body>
    </html>
  );
}
