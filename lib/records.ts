import type { ServiceSlug } from "@/data/services";
import type { GeneratedReport } from "@/lib/mock-report";

export type StoredReport = {
  id: string;
  serviceSlug: ServiceSlug;
  serviceTitle: string;
  question: string;
  createdAt: string;
  unlocked: boolean;
  generatedReport?: GeneratedReport;
  reportSource?: "ai" | "local-test";
  generationNote?: string;
};

export const recordsKey = "fengshui-ai-site:mock-reports";

export function loadRecords(): StoredReport[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(recordsKey);
    return raw ? (JSON.parse(raw) as StoredReport[]) : [];
  } catch {
    return [];
  }
}

export function saveRecord(report: StoredReport) {
  if (typeof window === "undefined") {
    return;
  }

  const records = loadRecords();
  const nextRecords = [report, ...records.filter((item) => item.id !== report.id)].slice(0, 12);
  window.localStorage.setItem(recordsKey, JSON.stringify(nextRecords));
}
