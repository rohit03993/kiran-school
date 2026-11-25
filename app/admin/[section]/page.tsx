import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionForm } from "@/components/admin/SectionForm";
import { findSection } from "@/lib/admin-sections";
import { type SectionKey } from "@/lib/defaults";
import { getSite } from "@/lib/site";

export const metadata: Metadata = { title: "Edit section", robots: { index: false, follow: false } };

export default async function EditSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const definition = findSection(section);
  if (!definition) notFound();
  const { site } = await getSite();
  const initial = site[definition.key as SectionKey] as Record<string, unknown>;

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight text-maroon">{definition.label}</h1>
      <p className="mt-2 text-ink/70">{definition.hint}</p>
      <div className="mt-8 rounded-[28px] bg-white p-5 shadow-card sm:p-8">
        <SectionForm sectionKey={definition.key} fields={definition.fields} initial={initial} />
      </div>
      {definition.key === "network" ? (
        <div className="mt-6 rounded-[28px] border border-[#d7eadc] bg-white p-5 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-maroon">Branch photos</h2>
              <p className="mt-1 max-w-md text-sm text-ink/70">
                These are the four circles on the homepage. Change a photo, name, or city under Schools.
              </p>
            </div>
            <Link href="/admin/schools" className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-maroon">
              Edit photos
            </Link>
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {site.schools.items.map((school) => (
              <li key={school.slug} className="text-center">
                <img
                  src={school.image}
                  alt=""
                  className="mx-auto h-16 w-16 rounded-full object-cover ring-4 ring-gold"
                />
                <p className="mt-2 text-sm font-semibold text-maroon">{school.name}</p>
                <p className="text-xs text-ink/60">{school.city}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
