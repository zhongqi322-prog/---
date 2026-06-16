import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, services } from "@/data/services";
import { ServiceForm } from "@/components/ServiceForm";

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
      <section className="rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-card">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-paper px-3 py-1 text-xs font-semibold text-cinnabar">{service.category}</span>
          {service.paid ? <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-gold">付费增强 mock</span> : null}
        </div>
        <h1 className="mt-4 text-3xl font-semibold text-ink">{service.title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">{service.subtitle}</p>
        <p className="mt-3 text-sm font-semibold text-ink">{service.highlight}</p>
      </section>
      <ServiceForm service={service} />
    </div>
  );
}
