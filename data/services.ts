export type ServiceSlug =
  | "bazi"
  | "ziwei"
  | "marriage"
  | "fengshui"
  | "yijing"
  | "wish"
  | "dream"
  | "palm"
  | "classics";

export type FieldType = "text" | "textarea" | "date" | "time" | "select" | "file";

export type FormField = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
};

export type ServiceConfig = {
  slug: ServiceSlug;
  title: string;
  subtitle: string;
  description: string;
  classicsIntro: string;
  category: string;
  paid: boolean;
  highlight: string;
  fields: FormField[];
  reportPoints: string[];
  cautions: string[];
};

export const services: ServiceConfig[] = [
  {
    slug: "bazi",
    title: "八字解读",
    subtitle: "整理出生年月日时，结合五行、节气和传统命理框架，生成一份用于自我观察的文化参考报告。",
    description:
      "适合想梳理性格倾向、阶段节奏、工作关系和行动习惯的用户。报告会把出生资料转成结构化摘要，再用白话说明可能关注的方向，不做绝对命运判断。",
    classicsIntro: "八字部分参考传统子平命理、五行生克、十神象义等框架；正式内容必须绑定已审核古籍片段，不编造出处。",
    category: "命理",
    paid: false,
    highlight: "适合梳理性格、阶段节奏和行动建议。",
    fields: [
      { name: "name", label: "称呼", type: "text", placeholder: "例如：阿明" },
      { name: "birthDate", label: "出生日期", type: "date" },
      { name: "birthTime", label: "出生时间", type: "time" },
      { name: "question", label: "当前最关心的问题", type: "textarea", placeholder: "例如：接下来半年事业怎么规划？" },
    ],
    reportPoints: ["五行倾向测试分析", "当前阶段可关注的节奏", "适合加强的行动习惯"],
    cautions: ["不输出必然命运", "不替代职业、医疗、法律建议"],
  },
  {
    slug: "ziwei",
    title: "紫微斗数",
    subtitle: "围绕星曜、宫位和人生议题做结构化整理，帮助用户看清当前最需要处理的问题。",
    description:
      "紫微斗数适合做长期议题梳理，例如事业、财务、关系和规划。当前为产品测试流程，先展示免费摘要和完整报告层级，后续接真实排盘前会另行校验算法与资料来源。",
    classicsIntro: "紫微部分会围绕星曜象义、宫位关系和传统术语做解释；古籍出处只使用项目中已审核的结构化资料。",
    category: "命理增强",
    paid: true,
    highlight: "先看免费摘要，再通过模拟解锁查看完整报告层级；当前不会真实扣款。",
    fields: [
      { name: "birthDate", label: "出生日期", type: "date" },
      { name: "birthTime", label: "出生时间", type: "time" },
      { name: "gender", label: "性别", type: "select", options: ["不透露", "男", "女"] },
      { name: "focus", label: "关注领域", type: "select", options: ["事业", "财务", "关系", "长期规划"] },
    ],
    reportPoints: ["命盘结构测试摘要", "重点宫位占位解释", "付费增强报告结构展示"],
    cautions: ["第一版不做真实排盘", "不输出绝对预测"],
  },
  {
    slug: "marriage",
    title: "姻缘解惑",
    subtitle: "把关系状态、真实困惑和沟通阻碍整理清楚，提供温和、可执行的关系参考。",
    description:
      "适合单身、暧昧、恋爱、婚姻或分手后的问题梳理。报告重点不是替用户做决定，而是帮助识别表达方式、期待落差和下一步沟通边界。",
    classicsIntro: "姻缘内容会引用传统文化中的关系观念和象征性解释，同时固定保留风险提醒，避免制造焦虑或依赖。",
    category: "关系",
    paid: false,
    highlight: "专注关系困惑和沟通建议，帮助用户把问题说清楚。",
    fields: [
      { name: "status", label: "关系状态", type: "select", options: ["单身", "暧昧", "恋爱", "婚姻", "分手后"] },
      { name: "question", label: "关系困惑", type: "textarea", placeholder: "请描述你希望厘清的问题。" },
    ],
    reportPoints: ["关系状态重述", "沟通风险提醒", "下一步行动建议"],
    cautions: ["不制造恐惧", "不诱导极端关系决策"],
  },
  {
    slug: "fengshui",
    title: "住宅风水",
    subtitle: "从采光、动线、门向、空间使用和居住感受入手，整理住宅环境的文化参考建议。",
    description:
      "适合用户描述住宅、办公室或店铺的空间问题。第一版不保存精确住址，不做建筑安全评估，只给出整理、动线、采光和心理感受层面的建议。",
    classicsIntro: "风水部分参考形势、方位、动静、明暗等传统概念；涉及现实安全的问题会提示优先咨询专业人士。",
    category: "空间",
    paid: false,
    highlight: "强调采光、动线、整洁和安全，不承诺现实结果。",
    fields: [
      { name: "homeType", label: "住宅类型", type: "select", options: ["公寓", "自建房", "办公室", "店铺"] },
      { name: "direction", label: "大门朝向", type: "select", options: ["东", "南", "西", "北", "不确定"] },
      { name: "issue", label: "想改善的问题", type: "textarea", placeholder: "例如：睡眠、工作效率、家庭沟通。" },
    ],
    reportPoints: ["空间格局测试初评", "可执行整理建议", "风险边界说明"],
    cautions: ["不替代建筑安全评估", "不承诺改运"],
  },
  {
    slug: "yijing",
    title: "易经问事",
    subtitle: "把模糊问题拆成背景、选择、风险和行动方向，提供易经象意层面的文化参考。",
    description:
      "适合在做选择前整理问题。报告会强调问题本身的结构，而不是替用户给出保证结果；投资、医疗、法律等场景会提示回到专业判断。",
    classicsIntro: "易经内容会围绕卦象、爻辞、象意和问题结构做白话说明；不把象征解释包装成确定预测。",
    category: "问事",
    paid: false,
    highlight: "适合用于决策梳理，不替代专业判断。",
    fields: [
      { name: "question", label: "要问的事", type: "textarea", placeholder: "问题越具体，测试报告越清晰。" },
      { name: "timeframe", label: "时间范围", type: "select", options: ["一周内", "一个月内", "三个月内", "半年内"] },
    ],
    reportPoints: ["示例卦象", "象意白话解释", "行动建议和不建议"],
    cautions: ["不做绝对决策", "不替代法律、投资、医疗判断"],
  },
  {
    slug: "wish",
    title: "祈福心愿",
    subtitle: "记录心愿、祝福对象和祈愿方向；后续可为用户在线下前往寺庙祈福点灯并回传记录。",
    description:
      "祈福心愿功能会把用户的心愿内容整理成祈福记录。正式运营阶段可提供线下代用户前往寺庙祈福、点灯、拍照或视频回传等服务记录，但只表达祝福与心愿，不承诺灵验、改命、治病或现实结果。",
    classicsIntro: "祈福内容以传统礼俗、祝福表达和心愿记录为主；不会使用官方寺庙背书、法术保证或追加付费提高灵验概率等表达。",
    category: "祝福",
    paid: true,
    highlight: "第一版只做模拟流程；正式阶段可设计线下寺庙祈福点灯记录，但不承诺现实结果。",
    fields: [
      { name: "wishType", label: "心愿类型", type: "select", options: ["为自己", "为家人", "事业", "健康祝福", "平安"] },
      { name: "wish", label: "心愿内容", type: "textarea", placeholder: "写下你想记录和祝福的内容。" },
    ],
    reportPoints: ["心愿记录", "点亮心愿灯模拟状态", "照片 / 视频回传说明占位"],
    cautions: ["不承诺灵验", "不提供治病、驱邪、法术或官方寺庙保证"],
  },
  {
    slug: "dream",
    title: "周公解梦",
    subtitle: "提取梦境里的人、事、物和醒来感受，结合传统象征做温和解释。",
    description:
      "适合把梦境当成情绪、经验和近期关注点的线索。报告会整理关键词、传统象征和现实自我观察建议，不把梦境当成必然预兆。",
    classicsIntro: "解梦内容会参考周公解梦类资料和已审核片段；涉及健康、恐惧或长期睡眠问题时，会提示寻求专业帮助。",
    category: "解梦",
    paid: false,
    highlight: "把梦境当作情绪和经验的整理线索。",
    fields: [
      { name: "dream", label: "梦境描述", type: "textarea", placeholder: "请描述梦里出现的人、事、物和醒来感受。" },
      { name: "feeling", label: "醒来感受", type: "select", options: ["平静", "焦虑", "开心", "害怕", "困惑"] },
    ],
    reportPoints: ["梦境关键词", "传统象征解释", "现实自我观察建议"],
    cautions: ["不把梦境当作必然预兆", "严重睡眠问题应咨询专业人士"],
  },
  {
    slug: "palm",
    title: "手相解析",
    subtitle: "围绕手别、关注方向和手纹观察项，展示相术文化参考报告的完整流程。",
    description:
      "适合想了解手相产品流程的用户。当前不做真实图像识别，也不保存手相图片；后续若接入图片能力，必须先补充隐私、存储和删除机制。",
    classicsIntro: "手相内容会以传统相术术语和观察项做解释，正式版本不得把手纹描述写成绝对命运结论。",
    category: "相术",
    paid: false,
    highlight: "第一版不做真实图像识别，只展示产品流程。",
    fields: [
      { name: "hand", label: "手别", type: "select", options: ["左手", "右手"] },
      { name: "photo", label: "手相图片", type: "file" },
      { name: "question", label: "想了解的方向", type: "text", placeholder: "例如：性格、关系、行动建议。" },
    ],
    reportPoints: ["图片接收测试状态", "掌纹观察占位", "现实建议"],
    cautions: ["不做真实图像识别", "不输出绝对预测"],
  },
  {
    slug: "classics",
    title: "古籍问答",
    subtitle: "围绕五行、宫位、卦象、术语和古籍片段，提供可追溯出处的白话解释。",
    description:
      "适合用户直接提问传统术数术语。回答会尽量说明概念来源、使用边界和现代语境下的理解方式，不生成无出处结论。",
    classicsIntro: "古籍问答只围绕项目已录入、已审核、可追溯到 raw 文件的资料展开；没有出处时会明确说明。",
    category: "知识",
    paid: false,
    highlight: "围绕已审核古籍片段做白话解释和边界说明。",
    fields: [
      { name: "topic", label: "想问的术语或主题", type: "text", placeholder: "例如：五行、纳音、太极、宫位。" },
      { name: "question", label: "具体问题", type: "textarea", placeholder: "请说明你想理解什么。" },
    ],
    reportPoints: ["概念解释占位", "古籍出处占位", "现实应用边界"],
    cautions: ["不生成无出处结论", "不编造古籍原文"],
  },
];

export const huangli = {
  dateLabel: "今日黄历测试版",
  suitable: ["整理计划", "学习研究", "沟通协商", "记录心愿"],
  avoid: ["冲动决策", "恐惧消费", "绝对化判断"],
  wuxing: "五行提示测试版",
  clash: "冲煞信息测试版",
  luckyHours: ["辰时", "午时", "申时"],
  reminder: "今日适合把问题写清楚，再做下一步判断。",
};

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
