import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";
import { getSite } from "@/lib/site";

export const metadata: Metadata = { title: "Leadership" };

export default async function LeadershipPage() {
  const { site } = await getSite();
  return (
    <main id="content">
      <PageHero kicker={site.leaders.kicker} title={site.leaders.title} text={site.leaders.text} />
      <section className="bg-white py-16">
        <Container className="grid gap-5 md:grid-cols-2">
          {site.leaders.items.map((person) => (
            <article key={person.name} className="rounded-[28px] bg-mist p-8">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-maroon text-2xl font-semibold text-white">
                {person.name
                  .split(" ")
                  .filter((part) => !part.endsWith("."))
                  .map((part) => part[0])
                  .join("")}
              </div>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight">{person.name}</h2>
              <p className="mt-1 font-medium text-maroon">{person.role}</p>
              <p className="mt-4 max-w-md leading-7 text-ink/75">{person.note}</p>
            </article>
          ))}
        </Container>
      </section>
    </main>
  );
}
