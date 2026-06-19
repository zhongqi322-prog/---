import type { ServiceConfig, ServiceSlug } from "@/data/services";
import { huangli } from "@/data/services";
import { getApprovedClassicsForService } from "@/lib/classics";

export type ReportCitation = {
  id: string;
  bookTitle: string;
  chapter: string;
  sourceText: string;
  plainExplanation: string;
  relationToQuestion: string;
  riskReminder: string;
};

export type GeneratedReport = {
  summary: string;
  userProfile: string;
  restatedQuestion: string;
  analysis: string[];
  realitySuggestions: string[];
  avoidActions: string[];
  followUps: string[];
  citations: ReportCitation[];
  riskReminder: string;
};

type FormValues = Record<string, string>;

function formDataToValues(formData: FormData): FormValues {
  const values: FormValues = {};

  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      values[key] = value.trim();
    } else {
      values[key] = value.name;
    }
  }

  return values;
}

function firstFilled(values: FormValues, keys: string[], fallback: string) {
  for (const key of keys) {
    if (values[key]) {
      return values[key];
    }
  }

  return fallback;
}

function moduleLabel(slug: ServiceSlug) {
  const labels: Record<ServiceSlug, string> = {
    bazi: "八字 mock 推理",
    ziwei: "紫微斗数 mock 推理",
    marriage: "姻缘解惑 mock 分析",
    fengshui: "住宅风水 mock 初评",
    yijing: "易经 mock 起卦",
    wish: "祈福心愿 mock 记录",
    dream: "周公解梦 mock 解释",
    palm: "手相解析 mock 流程",
    classics: "古籍问答 mock 解释",
  };

  return labels[slug];
}

function buildMockAnalysis(service: ServiceConfig, values: FormValues): string[] {
  const focus = firstFilled(values, ["question", "focus", "issue", "dream", "wish", "topic"], service.highlight);
  const shared = [
    `本报告使用 ${moduleLabel(service.slug)}，当前仅用于验证产品流程和报告结构。`,
    `用户关注点被整理为：“${focus}”。`,
  ];

  if (service.slug === "bazi") {
    return [...shared, "mock 推理会把出生日期、时辰和当前问题整理为五行倾向、阶段节奏和行动建议三部分。"];
  }

  if (service.slug === "ziwei") {
    return [...shared, "mock 推理会展示命盘结构、重点宫位和付费增强报告的内容层级，但不做真实排盘。"];
  }

  if (service.slug === "fengshui") {
    return [...shared, "mock 初评优先关注采光、动线、整洁、安全和空间使用习惯，不承诺现实结果。"];
  }

  if (service.slug === "yijing") {
    return [...shared, "mock 起卦以固定示例卦象表达“先整理问题，再决定行动”的象征性建议。"];
  }

  if (service.slug === "dream") {
    return [...shared, "mock 解梦把梦境视为情绪、记忆和经验的整理线索，只提供传统文化角度的象征解释。"];
  }

  if (service.slug === "palm") {
    return [...shared, "第一版不做真实图像识别，只展示手相解析流程和传统相术引用方式。"];
  }

  if (service.slug === "wish") {
    return [...shared, "心愿模块只做心愿记录、祝福表达和 mock 流程展示，不承诺现实结果。"];
  }

  return [...shared, "古籍问答会优先把术语、出处和使用边界讲清楚，不生成无出处结论。"];
}

function buildRealitySuggestions(service: ServiceConfig): string[] {
  const base = ["先把问题拆成一个可以在 7 天内执行的小动作。", "记录执行后的反馈，再决定是否继续调整。"];

  if (service.slug === "fengshui") {
    return ["先处理采光、通风、杂物和安全隐患。", "调整空间前保留照片和动线记录，避免一次性大改。"];
  }

  if (service.slug === "wish") {
    return ["把心愿写成祝福语和行动清单。", "为家人祈愿时只表达祝福，不替对方承诺结果。"];
  }

  if (service.slug === "dream") {
    return ["记录梦醒后的情绪和近期压力来源。", "如果长期睡眠受影响，应优先寻求专业帮助。"];
  }

  return base;
}

function buildCitations(service: ServiceConfig, question: string): ReportCitation[] {
  return getApprovedClassicsForService(service.slug).map((entry) => ({
    id: entry.id,
    bookTitle: entry.book_title,
    chapter: entry.chapter,
    sourceText: entry.source_text,
    plainExplanation: entry.plain_explanation,
    relationToQuestion: `本条用于为“${question}”提供传统文化背景，不作为确定性预测。`,
    riskReminder: entry.risk_reminder,
  }));
}

export function generateMockReport(service: ServiceConfig, formData: FormData): GeneratedReport {
  const values = formDataToValues(formData);
  const question = firstFilled(values, ["question", "wish", "dream", "topic", "issue", "focus"], service.highlight);

  const analysis = buildMockAnalysis(service, values);
  const citations = buildCitations(service, question);
  const huangliLine =
    service.slug === "bazi" || service.slug === "yijing"
      ? `今日黄历 mock 提醒：宜${huangli.suitable[0]}，忌${huangli.avoid[0]}。`
      : null;

  return {
    summary: `${service.title}已生成结构化 mock 报告。当前结论只作为传统文化参考和产品流程验证。`,
    userProfile: Object.entries(values)
      .filter(([, value]) => value)
      .map(([key, value]) => `${key}: ${value}`)
      .join("；") || "用户未填写额外资料。",
    restatedQuestion: question,
    analysis: huangliLine ? [...analysis, huangliLine] : analysis,
    realitySuggestions: buildRealitySuggestions(service),
    avoidActions: service.cautions,
    followUps: ["你最想先验证哪一个小行动？", "是否需要把报告保存到我的记录？", "是否需要解锁完整 mock 报告结构？"],
    citations,
    riskReminder: "本报告为传统文化与产品 mock 展示，不构成医疗、法律、投资、心理诊断或现实结果承诺。",
  };
}
