import Link from "next/link";
import { huangli, services } from "@/data/services";
import { ClassicsCitation } from "@/components/ClassicsCitation";
import { RiskNotice } from "@/components/RiskNotice";
import { RotatingBagua } from "@/components/RotatingBagua";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 overflow-hidden rounded-[2.2rem] border border-gold/35 bg-[#07100f] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.35)] lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
        <div>
          <p className="text-sm font-semibold text-[#d9a85f]">中文版 MVP 测试版</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-[#f9e6bf] sm:text-5xl">
            传统术数古籍 AI 解读平台
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#d8c5a1]">
            基于古籍出处与结构化规则，为八字、紫微斗数、风水、易经、解梦、相术等问题提供有解释、有边界的文化参考。
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link className="rounded-full bg-[#d9a85f] px-6 py-3 text-center text-sm font-semibold text-[#17100a]" href="#services">
              开始提问
            </Link>
            <Link className="rounded-full border border-gold/45 px-6 py-3 text-center text-sm font-semibold text-[#f5d7a0]" href="#risk">
              查看风险说明
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <RotatingBagua size={520} />
        </div>
      </section>

      <section className="paper-panel p-5">
        <p className="text-sm font-semibold text-cinnabar">{huangli.dateLabel}</p>
        <h2 className="mt-2 text-2xl font-semibold text-ink">今日黄历卡片</h2>
        <dl className="mt-4 grid gap-3 text-sm leading-7 text-muted sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="font-semibold text-ink">宜</dt>
            <dd>{huangli.suitable.join("、")}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">忌</dt>
            <dd>{huangli.avoid.join("、")}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">五行</dt>
            <dd>{huangli.wuxing}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">吉时</dt>
            <dd>{huangli.luckyHours.join("、")}</dd>
          </div>
        </dl>
      </section>

      <section id="services" className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-cinnabar">核心服务入口</p>
          <h2 className="mt-2 text-3xl font-semibold text-ink">所有 MVP 功能</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              className="group flex min-h-[18rem] flex-col rounded-[1.5rem] border border-gold/30 bg-[#fff8e8] p-5 shadow-card transition hover:-translate-y-1 hover:border-gold/60"
              href={`/service/${service.slug}`}
              key={service.slug}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-paper px-3 py-1 text-xs font-semibold text-cinnabar">{service.category}</span>
                {service.paid ? <span className="text-xs text-gold">可模拟解锁</span> : null}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-ink">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#4f3b2c]">{service.subtitle}</p>
              <p className="mt-3 text-sm leading-7 text-[#654b35]">{service.description}</p>
              <p className="mt-auto pt-4 text-sm font-semibold text-cinnabar">进入页面 →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <ClassicsCitation />
        <div className="paper-panel p-5">
          <p className="text-sm font-semibold text-cinnabar">付费报告示例</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">免费摘要 + 模拟解锁</h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            每个功能页都可生成免费测试摘要。完整报告通过“模拟解锁”弹窗展示后续付费流程，不会跳转支付，也不会产生真实扣款。
          </p>
          <Link className="mt-5 inline-block rounded-full bg-cinnabar px-5 py-3 text-sm font-semibold text-white" href="/service/ziwei">
            查看紫微付费示例
          </Link>
        </div>
      </section>

      <section id="risk">
        <RiskNotice />
      </section>
    </div>
  );
}
