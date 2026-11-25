import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { getSite } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { site } = await getSite();
  const item = site.insights.items.find((entry) => entry.slug === slug);
  return { title: item?.title ?? "Insight" };
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { site } = await getSite();
  const item = site.insights.items.find((entry) => entry.slug === slug);
  if (!item) notFound();

  return (
    <main id="content" className="pt-[76px] lg:pt-[92px]">
      <div className="relative h-[42vh] min-h-[280px] bg-maroon">
        <Image src={item.image} alt={item.imageAlt} fill priority sizes="100vw" className="object-cover" />
      </div>
      <article className="bg-white py-14">
        <Container className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-maroon">
            {item.campus} · {item.date}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{item.title}</h1>
          <div className="mt-8 space-y-5 text-lg leading-8 text-ink/80">
            {item.body.filter(Boolean).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </article>
    </main>
  );
}
