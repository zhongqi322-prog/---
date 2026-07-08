import { NextResponse } from "next/server";
import { getApprovedClassicsForService } from "@/lib/classics";
import type { GeneratedReport, ReportCitation } from "@/lib/mock-report";
import { getService, type ServiceSlug } from "@/data/services";

type ReportRequest = {
  serviceSlug?: string;
  values?: Record<string, unknown>;
};

type AiReportPayload = {
  summary: string;
  userProfile: string;
  restatedQuestion: string;
  analysis: string[];
  realitySuggestions: string[];
  avoidActions: string[];
  followUps: string[];
};

const fixedRiskReminder =
  "本报告由 AI 根据用户填写资料、已审核古籍片段和固定风险边界生成，只作为传统文化参考和自我整理，不构成医疗、法律、投资、心理诊断或重大人生决策建议，也不承诺任何现实结果。";

function cleanValues(values: Record<string, unknown> = {}) {
  const cleaned: Record<string, string> = {};

  for (const [key, value] of Object.entries(values)) {
    const text = String(value ?? "").trim();
    if (text) {
      cleaned[key] = text.slice(0, 600);
    }
  }

  return cleaned;
}

function firstFilled(values: Record<string, string>, keys: string[], fallback: string) {
  for (const key of keys) {
    if (values[key]) {
      return values[key];
    }
  }

  return fallback;
}

function toCitations(serviceSlug: ServiceSlug): ReportCitation[] {
  return getApprovedClassicsForService(serviceSlug).map((entry) => ({
    id: entry.id,
    bookTitle: entry.book_title,
    chapter: entry.chapter,
    sourceText: entry.source_text,
    plainExplanation: entry.plain_explanation,
    relationToQuestion: "该条古籍片段仅用于提供传统文化背景，不作为确定性预测。",
    riskReminder: entry.risk_reminder,
  }));
}

function extractDeepSeekOutputText(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const maybe = payload as {
    choices?: Array<{ message?: { content?: unknown } }>;
  };

  const content = maybe.choices?.[0]?.message?.content;
  if (typeof content === "string") {
    return content;
  }

  return null;
}

function ensureStringArray(value: unknown, fallback: string[]) {
  const aiItems = Array.isArray(value)
    ? value
        .map((item) => String(item ?? "").trim())
        .filter(Boolean)
    : [];

  const items = [...aiItems, ...fallback].filter(
    (item, index, list) => list.findIndex((candidate) => candidate === item) === index,
  );

  return items.slice(0, 5);
}

function normalizeAiPayload(rawText: string, fallbackQuestion: string): AiReportPayload {
  const parsed = JSON.parse(rawText) as Partial<AiReportPayload>;

  return {
    summary: String(parsed.summary || "已根据用户填写资料生成 AI 文化参考报告。").slice(0, 500),
    userProfile: String(parsed.userProfile || "用户资料已做最小化整理。").slice(0, 800),
    restatedQuestion: String(parsed.restatedQuestion || fallbackQuestion).slice(0, 500),
    analysis: ensureStringArray(parsed.analysis, [
      "当前资料已完成整理，但本功能不自行完成真实排盘、起卦、图像识别或确定性预测。",
      "以下内容只把用户填写信息放入传统文化语境中做白话梳理，不代表现实结果。",
      "古籍片段仅作为背景解释来源，不用于推出唯一结论。",
    ]),
    realitySuggestions: ensureStringArray(parsed.realitySuggestions, [
      "先把问题拆成一个 7 天内可执行的小行动，再观察反馈。",
      "涉及健康、投资、法律、建筑安全或重大关系决策时，优先咨询对应专业人士。",
      "把报告当作复盘提纲使用，保留现实证据和个人判断。",
    ]),
    avoidActions: ensureStringArray(parsed.avoidActions, [
      "不要把本报告作为医疗、投资、法律或重大人生决策依据。",
      "不要因为报告内容产生恐惧消费、冲动付款或极端行动。",
      "不要把传统象征解释理解为保证、改命、治病或必然预兆。",
    ]),
    followUps: ensureStringArray(parsed.followUps, [
      "你最想继续细化哪一部分？",
      "是否有更具体的现实背景、时间范围或限制条件需要补充？",
      "你希望下一步更偏向行动建议、关系沟通，还是文化解释？",
    ]),
  };
}

function getServiceBoundary(slug: ServiceSlug) {
  const boundaries: Record<ServiceSlug, string> = {
    bazi: "八字解读当前不得自行换算四柱、日主、十神、大运、流年；除非用户或系统提供已验证排盘结果，否则只能做出生资料与问题的文化参考整理。",
    ziwei: "紫微斗数当前不得自行推算命盘、宫位、星曜落点、四化或大限流年；只能说明关注议题和传统术语背景。",
    marriage: "姻缘解惑不得替用户决定分手、结婚、复合或其他重大关系选择，不得制造依赖或恐惧。",
    fengshui: "住宅风水不得断定吉凶、改运或化煞，不得替代建筑安全、消防、装修、医疗和心理专业判断。",
    yijing: "易经问事不得声称已完成真实起卦、得卦或断卦；除非用户提供已验证卦象，否则只能做问题结构和象意背景整理。",
    wish: "祈福心愿不得承诺灵验、改命、治病、消灾或官方寺庙背书；当前只做心愿记录、祝福表达和文化参考。",
    dream: "周公解梦不得把梦境解释成必然预兆，不得替代睡眠、心理或医疗专业建议。",
    palm: "手相解析当前不得声称完成真实图片识别、掌纹判断或命运预测；只能围绕用户填写方向做文化参考。",
    classics: "古籍问答只能围绕提供的已审核古籍片段解释；没有出处时必须说明资料不足，不得编造书名、章节或原文。",
  };

  return boundaries[slug];
}

function buildPrompt(input: {
  serviceSlug: ServiceSlug;
  serviceTitle: string;
  serviceHighlight: string;
  values: Record<string, string>;
  citations: ReportCitation[];
}) {
  return [
    "你是传统文化参考报告撰写助手，只能基于用户填写资料和提供的古籍片段做白话整理。",
    "必须遵守：不承诺现实结果；不替代医疗、法律、投资、心理诊断或重大人生决策；不编造古籍；不使用恐吓和诱导消费话术。",
    "禁止自行完成真实八字排盘、紫微排盘、易经起卦、手相图片识别、梦境预兆断定或风水吉凶断定。",
    "如果用户问题涉及健康、投资、法律、建筑安全或重大人生选择，必须提醒回到专业意见和现实证据。",
    getServiceBoundary(input.serviceSlug),
    "输出必须是 JSON，不要包含 Markdown。",
    "JSON 字段：summary, userProfile, restatedQuestion, analysis, realitySuggestions, avoidActions, followUps。",
    "analysis、realitySuggestions、avoidActions、followUps 必须分别输出 3-5 条字符串；每条用温和、可执行、非绝对化的中文表达。",
    `服务：${input.serviceTitle}`,
    `服务说明：${input.serviceHighlight}`,
    `用户填写资料：${JSON.stringify(input.values, null, 2)}`,
    `可用古籍片段：${JSON.stringify(
      input.citations.map((citation) => ({
        id: citation.id,
        bookTitle: citation.bookTitle,
        chapter: citation.chapter,
        sourceText: citation.sourceText,
        plainExplanation: citation.plainExplanation,
      })),
      null,
      2,
    )}`,
  ].join("\n\n");
}

export async function POST(request: Request) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  const model = process.env.DEEPSEEK_MODEL || "deepseek-v4-pro";

  if (!apiKey) {
    return NextResponse.json({ error: "DEEPSEEK_API_KEY is not configured." }, { status: 503 });
  }

  const body = (await request.json()) as ReportRequest;
  const service = body.serviceSlug ? getService(body.serviceSlug) : null;

  if (!service) {
    return NextResponse.json({ error: "Unknown service." }, { status: 400 });
  }

  const values = cleanValues(body.values);
  const question = firstFilled(values, ["question", "wish", "dream", "topic", "issue", "focus"], service.highlight);
  const citations = toCitations(service.slug);

  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content:
              "你是传统文化参考报告撰写助手。只输出 JSON，不要输出 Markdown。不得承诺现实结果，不得替代医疗、法律、投资、心理诊断或重大人生决策，不得编造古籍出处。",
          },
          {
            role: "user",
            content: buildPrompt({
              serviceSlug: service.slug,
              serviceTitle: service.title,
              serviceHighlight: service.highlight,
              values,
              citations,
            }),
          },
        ],
        response_format: { type: "json_object" },
        stream: false,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: `AI request failed with ${response.status}.` }, { status: 502 });
    }

    const payload = await response.json();
    const outputText = extractDeepSeekOutputText(payload);

    if (!outputText) {
      return NextResponse.json({ error: "AI response did not contain output text." }, { status: 502 });
    }

    const aiReport = normalizeAiPayload(outputText, question);
    const report: GeneratedReport = {
      ...aiReport,
      citations,
      riskReminder: fixedRiskReminder,
    };

    return NextResponse.json({ report });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown AI generation error.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
