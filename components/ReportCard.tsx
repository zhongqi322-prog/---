"use client";

import { useState } from "react";
import type { ServiceConfig } from "@/data/services";
import { generateMockReport } from "@/lib/mock-report";
import type { StoredReport } from "@/lib/records";
import { saveRecord } from "@/lib/records";
import { ClassicsCitation } from "./ClassicsCitation";
import { PaymentModal } from "./PaymentModal";
import { RiskNotice } from "./RiskNotice";

type ReportCardProps = {
  service: ServiceConfig;
  report: StoredReport;
};

export function ReportCard({ service, report }: ReportCardProps) {
  const [unlocked, setUnlocked] = useState(report.unlocked);
  const [open, setOpen] = useState(false);
  const generatedReport =
    report.generatedReport ??
    generateMockReport(service, new FormData());

  const unlock = () => {
    const nextReport = { ...report, unlocked: true, generatedReport };
    setUnlocked(true);
    saveRecord(nextReport);
    setOpen(false);
  };

  return (
    <article className="space-y-5 rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-card">
      <div>
        <p className="text-sm font-semibold text-cinnabar">mock 报告</p>
        <h2 className="mt-2 text-2xl font-semibold text-ink">{service.title}</h2>
        <p className="mt-2 text-sm leading-7 text-muted">报告编号：{report.id}</p>
      </div>

      <section className="grid gap-3 md:grid-cols-2">
        <div className="rounded-3xl bg-paper p-4">
          <p className="text-sm font-semibold text-ink">简要结论</p>
          <p className="mt-2 text-sm leading-7 text-muted">{generatedReport.summary}</p>
        </div>
        <div className="rounded-3xl bg-paper p-4">
          <p className="text-sm font-semibold text-ink">当前问题重述</p>
          <p className="mt-2 text-sm leading-7 text-muted">{generatedReport.restatedQuestion}</p>
        </div>
      </section>

      <section className="rounded-3xl bg-paper p-4">
        <p className="text-sm font-semibold text-ink">用户资料整理</p>
        <p className="mt-2 text-sm leading-7 text-muted">{generatedReport.userProfile}</p>
      </section>

      <section className="rounded-3xl bg-paper p-4">
        <p className="text-sm font-semibold text-ink">分析结果</p>
        <ul className="mt-3 space-y-2 text-sm leading-7 text-muted">
          {generatedReport.analysis.map((point) => (
            <li key={point}>- {point}</li>
          ))}
        </ul>
      </section>

      {unlocked ? (
        <section className="space-y-4 rounded-3xl bg-emerald-50 p-4">
          <div>
            <p className="text-sm font-semibold text-emerald-900">完整报告已 mock 解锁</p>
            <p className="mt-2 text-sm leading-7 text-emerald-900/75">
              以下内容仍为本地 mock 报告，用于验证付费解锁后的报告层级，不产生真实扣款。
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-emerald-900">现实建议</p>
            <ul className="mt-2 space-y-2 text-sm leading-7 text-emerald-900/75">
              {generatedReport.realitySuggestions.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-emerald-900">可继续追问</p>
            <ul className="mt-2 space-y-2 text-sm leading-7 text-emerald-900/75">
              {generatedReport.followUps.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <section className="rounded-3xl border border-dashed border-gold/50 bg-amber-50/70 p-4">
          <p className="text-sm font-semibold text-ink">完整报告未解锁</p>
          <p className="mt-2 text-sm leading-7 text-muted">
            免费摘要、分析结果和古籍出处已生成。点击下方按钮进入 mock 支付弹窗，不会产生真实扣款。
          </p>
          <button
            className="mt-4 rounded-full bg-cinnabar px-5 py-3 text-sm font-semibold text-white"
            onClick={() => setOpen(true)}
            type="button"
          >
            解锁完整报告
          </button>
        </section>
      )}

      <ClassicsCitation citations={generatedReport.citations} />

      <section className="rounded-3xl bg-paper p-4">
        <p className="text-sm font-semibold text-ink">不建议做的事</p>
        <ul className="mt-3 space-y-2 text-sm leading-7 text-muted">
          {generatedReport.avoidActions.map((caution) => (
            <li key={caution}>- {caution}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl bg-paper p-4">
        <p className="text-sm font-semibold text-ink">报告风险提醒</p>
        <p className="mt-2 text-sm leading-7 text-muted">{generatedReport.riskReminder}</p>
      </section>

      <RiskNotice />
      <PaymentModal open={open} onClose={() => setOpen(false)} onUnlock={unlock} />
    </article>
  );
}
