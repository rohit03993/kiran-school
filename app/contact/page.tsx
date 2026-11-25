import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";
import { getSite } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const { site } = await getSite();
  return (
    <main id="content">
      <PageHero kicker={site.contact.kicker} title={site.contact.title} text={site.contact.text} />
      <section className="bg-white py-14">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[28px] bg-maroon p-8 text-white">
            <h2 className="text-2xl font-semibold">{site.contact.asideTitle}</h2>
            <p className="mt-4 text-white/80">{site.contact.asideText}</p>
            <dl className="mt-8 space-y-4">
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-white/60">Email</dt>
                <dd className="mt-1">{site.brand.email}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-white/60">Phone</dt>
                <dd className="mt-1">{site.brand.phone}</dd>
              </div>
            </dl>
          </div>
          <div className="rounded-[28px] bg-mist p-6 sm:p-8">
            <EnquiryForm tone="plain" emailTo={site.brand.email} />
          </div>
        </Container>
      </section>
    </main>
  );
}
