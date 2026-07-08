"use client";

import type { FormEvent } from "react";
import { useRef, useState } from "react";
import type { ServiceConfig } from "@/data/services";
import { generateMockReport } from "@/lib/mock-report";
import type { StoredReport } from "@/lib/records";
import { saveRecord } from "@/lib/records";
import { ReportCard } from "./ReportCard";

type ServiceFormProps = {
  service: ServiceConfig;
};

function formDataToPayload(formData: FormData) {
  const values: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    values[key] = typeof value === "string" ? value.trim() : value.name;
  }

  return values;
}

export function ServiceForm({ service }: ServiceFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [report, setReport] = useState<StoredReport | null>(null);
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const submit = async () => {
    if (!formRef.current || status === "loading") {
      return;
    }

    const formData = new FormData(formRef.current);
    const values = formDataToPayload(formData);
    const question =
      String(formData.get("question") || formData.get("wish") || formData.get("dream") || formData.get("topic") || "").trim() ||
      service.highlight;
    const localReport = generateMockReport(service, formData);
    let generatedReport = localReport;
    let reportSource: StoredReport["reportSource"] = "local-test";
    let generationNote: string | undefined;

    setStatus("loading");
    setMessage(null);

    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceSlug: service.slug, values }),
      });

      if (!response.ok) {
        throw new Error("AI 生成暂不可用，已改用本地测试报告。");
      }

      const payload = (await response.json()) as { report?: typeof localReport };

      if (!payload.report) {
        throw new Error("AI 返回内容为空，已改用本地测试报告。");
      }

      generatedReport = payload.report;
      reportSource = "ai";
      generationNote = "本报告已优先使用服务端 AI 根据用户填写资料生成。";
    } catch (error) {
      generationNote = error instanceof Error ? error.message : "AI 生成暂不可用，已改用本地测试报告。";
      setMessage(generationNote);
    }

    const nextReport: StoredReport = {
      id: `R-${Date.now()}`,
      serviceSlug: service.slug,
      serviceTitle: service.title,
      question,
      createdAt: new Date().toISOString(),
      unlocked: false,
      generatedReport,
      reportSource,
      generationNote,
    };

    saveRecord(nextReport);
    setReport(nextReport);
    setStatus("idle");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <form className="paper-panel space-y-5 p-5 sm:p-6" onSubmit={(event: FormEvent<HTMLFormElement>) => event.preventDefault()} ref={formRef}>
        <div>
          <p className="text-sm font-semibold text-[#9f3f2f]">填写资料</p>
          <h2 className="mt-1 text-2xl font-semibold">生成文化参考报告</h2>
          <p className="mt-2 text-sm leading-7 text-[#5f4a37]">
            请按实际情况填写。留言或咨询内容可以写具体一些，报告会优先围绕这段内容整理。
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {service.fields.map((field) => (
          <label className={field.type === "textarea" || field.type === "file" ? "block sm:col-span-2" : "block"} key={field.name}>
            <span className="mb-2 block text-sm font-semibold text-[#2f241d]">{field.label}</span>
            {field.type === "textarea" ? (
              <textarea
                className="field-control min-h-44 resize-y"
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
        </div>

        <button className="gold-button w-full" disabled={status === "loading"} onClick={submit} type="button">
          {status === "loading" ? "AI 生成中..." : "生成 AI 参考报告"}
          <span className="ml-2">→</span>
        </button>
        <p className="text-xs leading-6 text-[#5f4a37]">
          当前跳过支付，优先使用服务端 AI 根据填写资料生成文化参考报告；不会真实扣款。
        </p>
        {message ? <p className="text-xs leading-6 text-[#9f3f2f]">{message}</p> : null}
      </form>

      {report ? (
        <ReportCard report={report} service={service} />
      ) : (
        <div className="mystic-panel flex min-h-80 flex-col justify-center p-6 text-sm leading-7 text-[#f1d9aa]">
          <p className="text-lg font-semibold text-[#fff0c7]">报告预览区</p>
          <p className="mt-3">
            填写左侧表单后，这里会展示统一报告结构：简要结论、用户资料整理、分析结果、古籍出处占位、现实建议和风险提醒。
          </p>
        </div>
      )}
    </div>
  );
}
