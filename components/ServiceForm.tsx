"use client";

import { FormEvent, useState } from "react";
import type { ServiceConfig } from "@/data/services";
import { generateMockReport } from "@/lib/mock-report";
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
    const generatedReport = generateMockReport(service, formData);
    const nextReport: StoredReport = {
      id: `R-${Date.now()}`,
      serviceSlug: service.slug,
      serviceTitle: service.title,
      question,
      createdAt: new Date().toISOString(),
      unlocked: false,
      generatedReport,
    };

    saveRecord(nextReport);
    setReport(nextReport);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <form className="paper-panel space-y-4 p-5" onSubmit={submit}>
        <div>
          <p className="text-sm font-semibold text-[#9f3f2f]">填写资料</p>
          <h2 className="mt-1 text-2xl font-semibold">生成文化参考报告</h2>
        </div>
        {service.fields.map((field) => (
          <label className="block" key={field.name}>
            <span className="mb-2 block text-sm font-semibold text-[#2f241d]">{field.label}</span>
            {field.type === "textarea" ? (
              <textarea
                className="field-control min-h-28"
                name={field.name}
                placeholder={field.placeholder}
              />
            ) : field.type === "select" ? (
              <select
                className="field-control"
                name={field.name}
              >
                {field.options?.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                className="field-control"
                name={field.name}
                placeholder={field.placeholder}
                type={field.type}
              />
            )}
          </label>
        ))}

        <button className="gold-button w-full" type="submit">
          生成 mock 报告
          <span className="ml-2">→</span>
        </button>
        <p className="text-xs leading-6 text-[#5f4a37]">
          当前不接真实 AI。提交后只生成本地 mock 报告，并写入 localStorage。
        </p>
      </form>

      {report ? (
        <ReportCard report={report} service={service} />
      ) : (
        <div className="mystic-panel flex min-h-80 items-center p-6 text-sm leading-7 text-[#c9b38b]">
          填写左侧表单后，这里会展示统一报告结构：简要结论、用户资料整理、分析结果、古籍出处占位、现实建议和风险提醒。
        </div>
      )}
    </div>
  );
}
