import type { Metadata } from "next";
import Link from "next/link";
import { adminSections } from "@/lib/admin-sections";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

export default function AdminHomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-maroon">Edit the site</h1>
      <p className="mt-2 max-w-2xl text-ink/70">
        Open one section, change the words or photos, then save. The public layout stays the same.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {adminSections.map((section) => (
          <Link key={section.key} href={`/admin/${section.key}`} className="rounded-[24px] bg-white p-5 shadow-card">
            <h2 className="text-xl font-semibold text-maroon">{section.label}</h2>
            <p className="mt-2 text-sm leading-6 text-ink/70">{section.hint}</p>
          </Link>
        ))}
        <Link href="/admin/enquiries" className="rounded-[24px] bg-maroon p-5 text-white">
          <h2 className="text-xl font-semibold text-gold">Enquiries</h2>
          <p className="mt-2 text-sm leading-6 text-white/80">Messages sent from the contact form.</p>
        </Link>
      </div>
    </div>
  );
}
