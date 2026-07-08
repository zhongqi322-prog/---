import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, services } from "@/data/services";
import { RotatingBagua } from "@/components/RotatingBagua";
import { ServiceForm } from "@/components/ServiceForm";

const serviceIcons: Record<string, string> = {
  bazi: "八",
  ziwei: "紫",
  marriage: "缘",
  fengshui: "宅",
  yijing: "卦",
  wish: "愿",
  dream: "梦",
  palm: "掌",
  classics: "典",
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Link className="text-sm font-semibold text-cinnabar" href="/">
        ← 返回首页
      </Link>
      <section className="mystic-panel relative overflow-hidden p-6 sm:p-8">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-gold/25" />
        <div className="absolute -right-12 top-10 h-40 w-40 rounded-full border border-dashed border-gold/30" />
        <div className="relative grid gap-6 lg:grid-cols-[1fr_13rem] lg:items-center">
          <div className="flex flex-wrap items-start gap-4">
            <span className="seal-icon h-16 w-16 text-2xl">{serviceIcons[service.slug]}</span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-md border border-gold/55 bg-black/20 px-3 py-1 text-xs font-semibold text-[#ffe0a3]">
                  {service.category}
                </span>
                {service.paid ? (
                  <span className="rounded-md border border-[#d9a85f]/70 bg-[#9f3f2f]/35 px-3 py-1 text-xs font-semibold text-[#ffe0a3]">
                    模拟解锁
                  </span>
                ) : null}
              </div>
              <h1 className="mt-4 text-4xl font-semibold text-[#fff0c7]">{service.title}</h1>
              <p className="mt-3 max-w-3xl text-base leading-8 text-[#f1d9aa]">{service.subtitle}</p>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#e0c28f]">{service.description}</p>
              <p className="mt-4 text-sm font-semibold text-[#ffe0a3]">{service.highlight}</p>
            </div>
          </div>
          <div className="mx-auto w-44 max-w-full opacity-95 lg:w-52">
            <RotatingBagua size={220} />
          </div>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-[1fr_0.85fr]">
        <div className="paper-panel p-5">
          <p className="text-sm font-semibold text-cinnabar">古籍与文化说明</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">本功能如何引用传统资料</h2>
          <p className="mt-3 text-sm leading-7 text-[#4f3b2c]">{service.classicsIntro}</p>
        </div>
        <div className="paper-panel p-5">
          <p className="text-sm font-semibold text-cinnabar">使用边界</p>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-[#4f3b2c]">
            {service.cautions.map((caution) => (
              <li key={caution}>- {caution}</li>
            ))}
          </ul>
        </div>
      </section>
      <ServiceForm service={service} />
    </div>
  );
}
