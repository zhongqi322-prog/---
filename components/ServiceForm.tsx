"use client";

import { FormEvent, useState } from "react";
import type { ServiceConfig } from "@/data/services";
import type { StoredReport } from "@/lib/records";
import { saveRecord } from "@/lib/records";
import { ReportCard } from "./ReportCard";

type ServiceFormProps = {
  service: ServiceConfig;
};

export function ServiceForm({ service }: ServiceFormProps) {
  const [report, setReport] = useState<StoredReport | null>(null);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const question =
      String(formData.get("question") || formData.get("wish") || formData.get("dream") || formData.get("topic") || "").trim() ||
      service.highlight;
    const nextReport: StoredReport = {
      id: `R-${Date.now()}`,
      serviceSlug: service.slug,
      serviceTitle: service.title,
      question,
      createdAt: new Date().toISOString(),
      unlocked: false,
    };

    saveRecord(nextReport);
    setReport(nextReport);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <form className="space-y-4 rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-card" onSubmit={submit}>
        {service.fields.map((field) => (
          <label className="block" key={field.name}>
            <span className="mb-2 block text-sm font-semibold text-ink">{field.label}</span>
            {field.type === "textarea" ? (
              <textarea
                className="min-h-28 w-full rounded-2xl border border-muted/15 bg-paper px-4 py-3 text-sm outline-none focus:border-cinnabar"
                name={field.name}
                placeholder={field.placeholder}
              />
            ) : field.type === "select" ? (
              <select
                className="w-full rounded-2xl border border-muted/15 bg-paper px-4 py-3 text-sm outline-none focus:border-cinnabar"
                name={field.name}
              >
                {field.options?.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                className="w-full rounded-2xl border border-muted/15 bg-paper px-4 py-3 text-sm outline-none focus:border-cinnabar"
                name={field.name}
                placeholder={field.placeholder}
                type={field.type}
              />
            )}
          </label>
        ))}

        <button className="w-full rounded-full bg-cinnabar px-5 py-3 text-sm font-semibold text-white" type="submit">
          生成 mock 报告
        </button>
        <p className="text-xs leading-6 text-muted">
          当前不接真实 AI。提交后只生成本地 mock 报告，并写入 localStorage。
        </p>
      </form>

      {report ? (
        <ReportCard report={report} service={service} />
      ) : (
        <div className="rounded-[2rem] border border-dashed border-gold/50 bg-white/45 p-6 text-sm leading-7 text-muted">
          填写左侧表单后，这里会展示统一报告结构：简要结论、用户资料整理、分析结果、古籍出处占位、现实建议和风险提醒。
        </div>
      )}
    </div>
  );
}
