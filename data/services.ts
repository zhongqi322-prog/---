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
    subtitle: "基于出生资料和当前问题生成 mock 八字文化参考报告。",
    category: "命理",
    paid: false,
    highlight: "适合梳理性格、阶段节奏和行动建议。",
    fields: [
      { name: "name", label: "称呼", type: "text", placeholder: "例如：阿明" },
      { name: "birthDate", label: "出生日期", type: "date" },
      { name: "birthTime", label: "出生时间", type: "time" },
      { name: "question", label: "当前最关心的问题", type: "textarea", placeholder: "例如：接下来半年事业怎么规划？" },
    ],
    reportPoints: ["五行倾向 mock 分析", "当前阶段可关注的节奏", "适合加强的行动习惯"],
    cautions: ["不输出必然命运", "不替代职业、医疗、法律建议"],
  },
  {
    slug: "ziwei",
    title: "紫微斗数付费报告",
    subtitle: "作为付费增强内容展示更细分的人生领域 mock 分析。",
    category: "命理增强",
    paid: true,
    highlight: "先看免费摘要，再通过 mock 支付解锁完整报告。",
    fields: [
      { name: "birthDate", label: "出生日期", type: "date" },
      { name: "birthTime", label: "出生时间", type: "time" },
      { name: "gender", label: "性别", type: "select", options: ["不透露", "男", "女"] },
      { name: "focus", label: "关注领域", type: "select", options: ["事业", "财务", "关系", "长期规划"] },
    ],
    reportPoints: ["命盘结构 mock 摘要", "重点宫位占位解释", "付费增强报告结构展示"],
    cautions: ["第一版不做真实排盘", "不输出绝对预测"],
  },
  {
    slug: "marriage",
    title: "姻缘解惑",
    subtitle: "帮助用户把关系问题结构化，得到有边界的文化参考。",
    category: "关系",
    paid: false,
    highlight: "替代宝宝起名入口，专注关系困惑和沟通建议。",
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
    subtitle: "基于住宅信息给出 mock 空间观察和现实可执行建议。",
    category: "空间",
    paid: false,
    highlight: "强调采光、动线、整洁和安全，不承诺现实结果。",
    fields: [
      { name: "homeType", label: "住宅类型", type: "select", options: ["公寓", "自建房", "办公室", "店铺"] },
      { name: "direction", label: "大门朝向", type: "select", options: ["东", "南", "西", "北", "不确定"] },
      { name: "issue", label: "想改善的问题", type: "textarea", placeholder: "例如：睡眠、工作效率、家庭沟通。" },
    ],
    reportPoints: ["空间格局 mock 初评", "可执行整理建议", "风险边界说明"],
    cautions: ["不替代建筑安全评估", "不承诺改运"],
  },
  {
    slug: "yijing",
    title: "易经问事",
    subtitle: "把纠结问题结构化，通过 mock 卦象获得象征性解释。",
    category: "问事",
    paid: false,
    highlight: "适合用于决策梳理，不替代专业判断。",
    fields: [
      { name: "question", label: "要问的事", type: "textarea", placeholder: "问题越具体，mock 报告越清晰。" },
      { name: "timeframe", label: "时间范围", type: "select", options: ["一周内", "一个月内", "三个月内", "半年内"] },
    ],
    reportPoints: ["mock 卦象", "象意白话解释", "行动建议和不建议"],
    cautions: ["不做绝对决策", "不替代法律、投资、医疗判断"],
  },
  {
    slug: "wish",
    title: "祈福心愿",
    subtitle: "用于心愿记录、祝福表达和线下祈愿流程展示。",
    category: "祝福",
    paid: true,
    highlight: "第一版只做 mock 流程，不承诺现实结果。",
    fields: [
      { name: "wishType", label: "心愿类型", type: "select", options: ["为自己", "为家人", "事业", "健康祝福", "平安"] },
      { name: "wish", label: "心愿内容", type: "textarea", placeholder: "写下你想记录和祝福的内容。" },
    ],
    reportPoints: ["心愿记录", "点亮心愿灯 mock 状态", "照片 / 视频回传说明占位"],
    cautions: ["不承诺灵验", "不提供治病、驱邪、法术或官方寺庙保证"],
  },
  {
    slug: "dream",
    title: "周公解梦",
    subtitle: "根据梦境关键词提供传统文化角度的 mock 解释。",
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
    subtitle: "提供手相图片上传 mock 流程和传统相术示例报告。",
    category: "相术",
    paid: false,
    highlight: "第一版不做真实图像识别，只展示产品流程。",
    fields: [
      { name: "hand", label: "手别", type: "select", options: ["左手", "右手"] },
      { name: "photo", label: "手相图片", type: "file" },
      { name: "question", label: "想了解的方向", type: "text", placeholder: "例如：性格、关系、行动建议。" },
    ],
    reportPoints: ["mock 图片接收状态", "掌纹观察占位", "现实建议"],
    cautions: ["不做真实图像识别", "不输出绝对预测"],
  },
  {
    slug: "classics",
    title: "古籍问答",
    subtitle: "围绕传统术数术语和古籍片段做白话解释占位。",
    category: "知识",
    paid: false,
    highlight: "真实古籍出处将在 P3 阶段接入。",
    fields: [
      { name: "topic", label: "想问的术语或主题", type: "text", placeholder: "例如：五行、纳音、太极、宫位。" },
      { name: "question", label: "具体问题", type: "textarea", placeholder: "请说明你想理解什么。" },
    ],
    reportPoints: ["概念解释占位", "古籍出处占位", "现实应用边界"],
    cautions: ["当前不生成正式古籍结论", "不编造古籍原文"],
  },
];

export const huangli = {
  dateLabel: "今日黄历 mock",
  suitable: ["整理计划", "学习研究", "沟通协商"],
  avoid: ["冲动决策", "恐惧消费", "绝对化判断"],
  wuxing: "木火相生 mock",
  clash: "冲煞信息待接入",
  luckyHours: ["辰时", "午时", "申时"],
  reminder: "今日适合把问题写清楚，再做下一步判断。",
};

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
