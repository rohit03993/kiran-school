import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SchoolDirectory } from "@/components/SchoolDirectory";
import { Container } from "@/components/ui";
import { getSite } from "@/lib/site";

export const metadata: Metadata = { title: "School network" };

export default async function SchoolsPage() {
  const { site } = await getSite();
  return (
    <main id="content">
      <PageHero kicker={site.schools.pageKicker} title={site.schools.pageTitle} text={site.schools.pageText} />
      <section className="bg-mist py-14">
        <Container>
          <SchoolDirectory schools={site.schools.items} />
        </Container>
      </section>
    </main>
  );
}
