import Link from "next/link";
import { huangli, services } from "@/data/services";
import { ClassicsCitation } from "@/components/ClassicsCitation";
import { RiskNotice } from "@/components/RiskNotice";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 rounded-[2.2rem] border border-white/70 bg-white/65 p-6 shadow-card lg:grid-cols-[1.3fr_0.7fr] lg:p-10">
        <div>
          <p className="text-sm font-semibold text-cinnabar">中文版 MVP mock 原型</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            传统术数古籍 AI 解读平台
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
            基于古籍出处与结构化规则，为八字、紫微斗数、风水、易经、解梦、相术等问题提供有解释、有边界的文化参考。
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link className="rounded-full bg-cinnabar px-6 py-3 text-center text-sm font-semibold text-white" href="#services">
              开始提问
            </Link>
            <Link className="rounded-full border border-muted/20 px-6 py-3 text-center text-sm font-semibold text-muted" href="#risk">
              查看风险说明
            </Link>
          </div>
        </div>

        <section className="rounded-[2rem] bg-paper p-5">
          <p className="text-sm font-semibold text-cinnabar">{huangli.dateLabel}</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">今日黄历卡片</h2>
          <dl className="mt-4 space-y-3 text-sm leading-7 text-muted">
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
      </section>

      <section id="services" className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-cinnabar">核心服务入口</p>
          <h2 className="mt-2 text-3xl font-semibold text-ink">所有 MVP 功能</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              className="group rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-card transition hover:-translate-y-1"
              href={`/service/${service.slug}`}
              key={service.slug}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-paper px-3 py-1 text-xs font-semibold text-cinnabar">{service.category}</span>
                {service.paid ? <span className="text-xs text-gold">可 mock 解锁</span> : null}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-ink">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{service.subtitle}</p>
              <p className="mt-4 text-sm font-semibold text-cinnabar">进入页面 →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <ClassicsCitation />
        <div className="rounded-3xl border border-white/70 bg-white/70 p-5 shadow-card">
          <p className="text-sm font-semibold text-cinnabar">付费报告示例</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">免费摘要 + mock 解锁</h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            每个功能页都可生成免费 mock 摘要。完整报告通过 mock 支付弹窗解锁，不产生真实扣款。
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
