import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container, Pill } from "@/components/ui";
import { getSite } from "@/lib/site";

export const metadata: Metadata = { title: "Academics" };

export default async function NetworkEffectPage() {
  const { site } = await getSite();
  return (
    <main id="content">
      <PageHero kicker={site.edge.kicker} title={site.edge.title} text={site.edge.text} />
      <section className="bg-white py-16">
        <Container className="grid gap-5 lg:grid-cols-3">
          {site.edge.items.map((item, index) => (
            <article key={item.title} className="rounded-[28px] bg-mist p-7">
              <p className="text-sm font-semibold tracking-[0.14em] text-maroon">0{index + 1}</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight">{item.title}</h2>
              <p className="mt-3 leading-7 text-ink/75">{item.body}</p>
            </article>
          ))}
        </Container>
        <Container className="mt-10">
          <Pill href="/contact" tone="solid">
            Ask about admission
          </Pill>
        </Container>
      </section>
    </main>
  );
}
