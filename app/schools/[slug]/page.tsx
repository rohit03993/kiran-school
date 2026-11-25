import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container, Pill } from "@/components/ui";
import { getSite } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { site } = await getSite();
  const school = site.schools.items.find((item) => item.slug === slug);
  return { title: school?.name ?? "School" };
}

export default async function SchoolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { site } = await getSite();
  const school = site.schools.items.find((item) => item.slug === slug);
  if (!school) notFound();

  return (
    <main id="content" className="pt-[76px] lg:pt-[92px]">
      <div className="relative h-[48vh] min-h-[320px] bg-maroon">
        <Image src={school.image} alt={school.imageAlt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon via-maroon/30 to-transparent" />
        <Container className="absolute inset-x-0 bottom-0 pb-10 text-white">
          <p className="text-sm uppercase tracking-[0.14em]">
            {school.board ? `${school.board} · ` : ""}
            {school.city}, {school.state}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-6xl">{school.name}</h1>
        </Container>
      </div>
      <section className="bg-white py-14">
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-lg leading-8 text-ink/80">{school.blurb}</p>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-mist p-5">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-maroon">Grades</dt>
                <dd className="mt-2 text-lg font-semibold">{school.grades}</dd>
              </div>
              <div className="rounded-2xl bg-mist p-5">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-maroon">Students</dt>
                <dd className="mt-2 text-lg font-semibold">{school.students}</dd>
              </div>
            </dl>
          </div>
          <aside className="rounded-[28px] bg-mist p-7">
            <h2 className="text-xl font-semibold">On this campus</h2>
            <ul className="mt-4 space-y-2">
              {school.facilities.filter(Boolean).map((item) => (
                <li key={item} className="border-b border-black/10 py-2 last:border-0">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Pill href="/contact" tone="solid">
                Admissions enquiry
              </Pill>
            </div>
          </aside>
        </Container>
      </section>
    </main>
  );
}
