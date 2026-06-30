"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { StoredReport } from "@/lib/records";
import { loadRecords } from "@/lib/records";

export function RecordsClient() {
  const [records, setRecords] = useState<StoredReport[]>([]);

  useEffect(() => {
    setRecords(loadRecords());
  }, []);

  return (
    <div className="space-y-6">
      <Link className="text-sm font-semibold text-[#e8c990]" href="/">
        ← 返回首页
      </Link>
      <section className="mystic-panel relative overflow-hidden p-6 sm:p-8">
        <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full border border-gold/25" />
        <p className="text-sm font-semibold tracking-[0.24em] text-[#d9a85f]">LOCAL STORAGE</p>
        <h1 className="mt-2 text-4xl font-semibold text-[#f9e6bf]">我的记录轻量版</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#d8c5a1]">
          第一版不做完整账户系统，只读取本机浏览器 localStorage。清除浏览器数据后记录会丢失。
        </p>
      </section>

      {records.length === 0 ? (
        <div className="paper-panel p-6 text-sm leading-7 text-[#5f4a37]">
          暂无记录。请先进入任意功能页生成 mock 报告。
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {records.map((record) => (
            <Link
              className="paper-panel p-5 transition hover:-translate-y-1 hover:border-[#f3c77b]"
              href={`/service/${record.serviceSlug}`}
              key={record.id}
            >
              <p className="text-xs font-semibold text-[#9f3f2f]">{record.id}</p>
              <h2 className="mt-2 text-xl font-semibold text-[#2f241d]">{record.serviceTitle}</h2>
              <p className="mt-3 line-clamp-2 text-sm leading-7 text-[#5f4a37]">{record.question}</p>
              <p className="mt-3 text-xs text-[#5f4a37]">{new Date(record.createdAt).toLocaleString("zh-CN")}</p>
              <p className="mt-3 text-sm font-semibold text-[#7a431f]">{record.unlocked ? "已 mock 解锁" : "免费摘要"}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
