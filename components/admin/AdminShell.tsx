import Link from "next/link";
import { adminSections } from "@/lib/admin-sections";
import { Logo } from "@/components/ui";
import { SignOut } from "./SignOut";

export function AdminShell({
  children,
  dbReady,
}: {
  children: React.ReactNode;
  dbReady: boolean;
}) {
  return (
    <div className="min-h-screen bg-mist lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="bg-maroon text-white">
        <div className="flex items-center justify-between px-5 py-5">
          <Link href="/" aria-label="View the site">
            <Logo />
          </Link>
        </div>
        <nav className="flex gap-2 overflow-x-auto px-4 pb-4 lg:block lg:space-y-1 lg:px-3 lg:pb-8">
          <Link href="/admin" className="block whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium hover:bg-white/10">
            Overview
          </Link>
          {adminSections.map((section) => (
            <Link
              key={section.key}
              href={`/admin/${section.key}`}
              className="block whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium hover:bg-white/10"
            >
              {section.label}
            </Link>
          ))}
          <Link href="/admin/enquiries" className="block whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-gold hover:bg-white/10">
            Enquiries
          </Link>
        </nav>
      </aside>
      <div>
        <div className="flex items-center justify-between border-b border-black/5 bg-white px-5 py-4 sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-maroon">Admin</p>
          <SignOut />
        </div>
        {!dbReady ? (
          <p className="mx-5 mt-5 rounded-2xl bg-gold px-4 py-3 text-sm font-medium text-maroon sm:mx-8">
            The database is not ready. In the project folder, run npm install, then npm run db:setup, then restart the site.
          </p>
        ) : null}
        <div className="px-5 py-8 sm:px-8">{children}</div>
      </div>
    </div>
  );
}

