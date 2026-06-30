import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, services } from "@/data/services";
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
      <Link className="text-sm font-semibold text-[#e8c990]" href="/">
        ← 返回首页
      </Link>
      <section className="mystic-panel relative overflow-hidden p-6 sm:p-8">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-gold/25" />
        <div className="absolute -right-12 top-10 h-40 w-40 rounded-full border border-dashed border-gold/30" />
        <div className="relative flex flex-wrap items-start gap-4">
          <span className="seal-icon h-16 w-16 text-2xl">{serviceIcons[service.slug]}</span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-md border border-gold/45 px-3 py-1 text-xs font-semibold text-[#e8c990]">{service.category}</span>
              {service.paid ? (
                <span className="rounded-md border border-[#9f3f2f]/60 bg-[#9f3f2f]/30 px-3 py-1 text-xs font-semibold text-[#f5d7a0]">
                  付费增强 mock
                </span>
              ) : null}
            </div>
            <h1 className="mt-4 text-4xl font-semibold text-[#f9e6bf]">{service.title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#d8c5a1]">{service.subtitle}</p>
            <p className="mt-3 text-sm font-semibold text-[#f5d7a0]">{service.highlight}</p>
          </div>
        </div>
      </section>
      <ServiceForm service={service} />
    </div>
  );
}
