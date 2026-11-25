import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";
import { getSite } from "@/lib/site";

export const metadata: Metadata = { title: "Collaborations" };

export default async function CollaborationsPage() {
  const { site } = await getSite();
  return (
    <main id="content">
      <PageHero kicker={site.collaborations.kicker} title={site.collaborations.pageTitle} text={site.collaborations.pageText} />
      <section className="bg-white py-16">
        <Container className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {site.collaborations.items.map((partner) => (
            <article key={partner.name} className="rounded-[28px] border border-black/5 p-7">
              <h2 className="text-2xl font-semibold tracking-tight text-maroon">{partner.name}</h2>
              <p className="mt-3 text-ink/75">{partner.note}</p>
            </article>
          ))}
        </Container>
      </section>
    </main>
  );
}
