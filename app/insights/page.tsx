import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";
import { getSite } from "@/lib/site";

export const metadata: Metadata = { title: "Insights" };

export default async function InsightsPage() {
  const { site } = await getSite();
  return (
    <main id="content">
      <PageHero kicker={site.insights.kicker} title={site.insights.title} text={site.insights.text} />
      <section className="bg-white py-14">
        <Container className="grid gap-6 md:grid-cols-2">
          {site.insights.items.map((item) => (
            <Link key={item.slug} href={`/insights/${item.slug}`} className="group overflow-hidden rounded-[28px] bg-mist">
              <div className="relative h-56">
                <Image src={item.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-maroon">
                  {item.campus} · {item.date}
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight group-hover:text-maroon">{item.title}</h2>
                <p className="mt-2 text-ink/70">{item.excerpt}</p>
              </div>
            </Link>
          ))}
        </Container>
      </section>
    </main>
  );
}
