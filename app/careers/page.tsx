import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";
import { getSite } from "@/lib/site";

export const metadata: Metadata = { title: "Careers" };

export default async function CareersPage() {
  const { site } = await getSite();
  return (
    <main id="content">
      <PageHero kicker={site.jobs.kicker} title={site.jobs.title} text={site.jobs.text} />
      <section className="bg-white py-14">
        <Container className="divide-y divide-black/10 border-y border-black/10">
          {site.jobs.items.map((job) => (
            <article key={job.title} className="grid gap-4 py-6 lg:grid-cols-[1.4fr_0.8fr_auto] lg:items-center">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">{job.title}</h2>
                <p className="mt-2 text-ink/75">{job.summary}</p>
              </div>
              <p className="text-sm font-medium text-maroon">
                {job.campus}
                <span className="mt-1 block text-ink/60">{job.type}</span>
              </p>
              <Link
                href="/contact#enquiry"
                className="inline-flex justify-center rounded-full bg-gold px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.12em] text-maroon"
              >
                Apply
              </Link>
            </article>
          ))}
        </Container>
      </section>
    </main>
  );
}
