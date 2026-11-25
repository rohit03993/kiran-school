import type { Metadata } from "next";
import { EnquiryList } from "@/components/admin/EnquiryList";
import { getPrisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Enquiries", robots: { index: false, follow: false } };

export default async function EnquiriesPage() {
  let items: { id: number; name: string; email: string; type: string; message: string; createdAt: string }[] = [];
  let failed = false;
  try {
    const rows = await getPrisma().enquiry.findMany({ orderBy: { createdAt: "desc" } });
    items = rows.map((row) => ({ ...row, createdAt: row.createdAt.toISOString() }));
  } catch {
    failed = true;
  }
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-maroon">Enquiries</h1>
      <p className="mt-2 text-ink/70">These are saved when someone submits the contact form.</p>
      {failed ? <p className="mt-6 text-sm font-medium text-maroon">The database is not ready yet.</p> : <EnquiryList initial={items} />}
    </div>
  );
}
