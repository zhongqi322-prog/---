import bazi from "@/data/classics/bazi.json";
import dream from "@/data/classics/dream.json";
import fengshui from "@/data/classics/fengshui.json";
import palm from "@/data/classics/palm.json";
import yijing from "@/data/classics/yijing.json";
import ziwei from "@/data/classics/ziwei.json";
import type { ServiceSlug } from "@/data/services";

export type ClassicModule = "bazi" | "ziwei" | "yijing" | "fengshui" | "dream" | "palm";

export type ClassicEntry = {
  id: string;
  book_title: string;
  author_or_period: string;
  edition: string;
  chapter: string;
  source_text: string;
  plain_explanation: string;
  keywords: string[];
  module: ClassicModule;
  scenarios: string[];
  source_reference: string;
  copyright_status: string;
  review_status: string;
  risk_reminder: string;
  uncertainty_notes: string;
};

type ClassicBook = {
  module: ClassicModule;
  entries: ClassicEntry[];
};

const classicBooks: Record<ClassicModule, ClassicBook> = {
  bazi: bazi as ClassicBook,
  ziwei: ziwei as ClassicBook,
  yijing: yijing as ClassicBook,
  fengshui: fengshui as ClassicBook,
  dream: dream as ClassicBook,
  palm: palm as ClassicBook,
};

const serviceModuleMap: Record<ServiceSlug, ClassicModule> = {
  bazi: "bazi",
  ziwei: "ziwei",
  marriage: "yijing",
  fengshui: "fengshui",
  yijing: "yijing",
  wish: "yijing",
  dream: "dream",
  palm: "palm",
  classics: "bazi",
};

export function getClassicModuleForService(slug: ServiceSlug): ClassicModule {
  return serviceModuleMap[slug];
}

export function getApprovedClassics(module: ClassicModule, limit = 2): ClassicEntry[] {
  return classicBooks[module].entries
    .filter((entry) => entry.copyright_status === "可使用" && entry.review_status === "已审核")
    .slice(0, limit);
}

export function getApprovedClassicsForService(slug: ServiceSlug, limit = 2): ClassicEntry[] {
  return getApprovedClassics(getClassicModuleForService(slug), limit);
}
