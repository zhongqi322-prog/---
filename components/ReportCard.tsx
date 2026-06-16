"use client";

import { useState } from "react";
import type { ServiceConfig } from "@/data/services";
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

  const unlock = () => {
    const nextReport = { ...report, unlocked: true };
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
          <p className="mt-2 text-sm leading-7 text-muted">
            当前结果为 mock 摘要，用于验证产品流程。建议先把问题拆成可行动的小步骤，再结合现实信息判断。
          </p>
        </div>
        <div className="rounded-3xl bg-paper p-4">
          <p className="text-sm font-semibold text-ink">用户问题</p>
          <p className="mt-2 text-sm leading-7 text-muted">{report.question || "用户暂未填写具体问题。"}</p>
        </div>
      </section>

      <section className="rounded-3xl bg-paper p-4">
        <p className="text-sm font-semibold text-ink">分析结果</p>
        <ul className="mt-3 space-y-2 text-sm leading-7 text-muted">
          {service.reportPoints.map((point) => (
            <li key={point}>- {point}</li>
          ))}
        </ul>
      </section>

      {unlocked ? (
        <section className="rounded-3xl bg-emerald-50 p-4">
          <p className="text-sm font-semibold text-emerald-900">完整报告已 mock 解锁</p>
          <p className="mt-2 text-sm leading-7 text-emerald-900/75">
            这里展示完整报告区域：用户资料整理、问题重述、现实建议、不建议做的事和可继续追问。后续 P4 再接入推理逻辑。
          </p>
        </section>
      ) : (
        <section className="rounded-3xl border border-dashed border-gold/50 bg-amber-50/70 p-4">
          <p className="text-sm font-semibold text-ink">完整报告未解锁</p>
          <p className="mt-2 text-sm leading-7 text-muted">
            免费摘要已生成。点击下方按钮进入 mock 支付弹窗，不会产生真实扣款。
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

      <ClassicsCitation />

      <section className="rounded-3xl bg-paper p-4">
        <p className="text-sm font-semibold text-ink">不建议做的事</p>
        <ul className="mt-3 space-y-2 text-sm leading-7 text-muted">
          {service.cautions.map((caution) => (
            <li key={caution}>- {caution}</li>
          ))}
        </ul>
      </section>

      <RiskNotice />
      <PaymentModal open={open} onClose={() => setOpen(false)} onUnlock={unlock} />
    </article>
  );
}
