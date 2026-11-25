import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";

export const metadata: Metadata = { title: "Disclaimer" };

export default function DisclaimerPage() {
  return (
    <main id="content">
      <PageHero
        kicker="Disclaimer"
        title="This site is a layout demo"
        text="School names, people, counts, jobs, and news on these pages are made up so the design can be reviewed."
      />
      <section className="bg-white py-14">
        <Container className="max-w-3xl space-y-4 leading-7 text-ink/80">
          <p>Do not treat a campus, a phone number, or a job listing here as a real Saujiyan offer.</p>
          <p>Photos are stock images. They are not photographs of Saujiyan campuses.</p>
          <p>The visual system follows the reference homepage: maroon bar, pill navigation, split hero, stat cards, and a school scroller. The words are original.</p>
        </Container>
      </section>
    </main>
  );
}
