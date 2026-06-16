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
      <Link className="text-sm font-semibold text-cinnabar" href="/">
        ← 返回首页
      </Link>
      <section className="rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-card">
        <p className="text-sm font-semibold text-cinnabar">localStorage</p>
        <h1 className="mt-2 text-3xl font-semibold text-ink">我的记录轻量版</h1>
        <p className="mt-3 text-sm leading-7 text-muted">
          第一版不做完整账户系统，只读取本机浏览器 localStorage。清除浏览器数据后记录会丢失。
        </p>
      </section>

      {records.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-gold/50 bg-white/50 p-6 text-sm leading-7 text-muted">
          暂无记录。请先进入任意功能页生成 mock 报告。
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {records.map((record) => (
            <Link
              className="rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-card"
              href={`/service/${record.serviceSlug}`}
              key={record.id}
            >
              <p className="text-xs font-semibold text-cinnabar">{record.id}</p>
              <h2 className="mt-2 text-xl font-semibold text-ink">{record.serviceTitle}</h2>
              <p className="mt-3 line-clamp-2 text-sm leading-7 text-muted">{record.question}</p>
              <p className="mt-3 text-xs text-muted">{new Date(record.createdAt).toLocaleString("zh-CN")}</p>
              <p className="mt-3 text-sm font-semibold text-gold">{record.unlocked ? "已 mock 解锁" : "免费摘要"}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
