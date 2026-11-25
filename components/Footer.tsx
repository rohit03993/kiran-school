import Link from "next/link";
import { brand as defaultBrand } from "@/lib/data";
import { EnquiryForm } from "./EnquiryForm";
import { Logo } from "./ui";

const explore = [
  { label: "About", href: "/#about" },
  { label: "Academics", href: "/#academics" },
  { label: "Leadership", href: "/#leadership" },
  { label: "Admissions", href: "/#admissions" },
  { label: "News", href: "/#news" },
];

const schools = [
  { label: "CBSE, Mainpuri", href: "/schools/cbse-mainpuri" },
  { label: "ICSE, Mainpuri", href: "/schools/icse-mainpuri" },
  { label: "UP Board, Mainpuri", href: "/schools/adarsh-rashtriya-aavasiya-vidyalay" },
  { label: "CBSE, Agra", href: "/schools/cbse-agra" },
];

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">{title}</h2>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="text-white hover:text-gold">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer({ brand = defaultBrand }: { brand?: typeof defaultBrand }) {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="relative z-40 scroll-mt-24 bg-maroon text-white">
      <div className="mx-auto grid max-w-[1200px] gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
        <div>
          <Logo />
          <p className="mt-5 max-w-md text-sm leading-6 text-white/75">{brand.legal}</p>
          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Address</dt>
              <dd className="mt-1 max-w-xs leading-6">{brand.address}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Phone</dt>
              <dd className="mt-1">{brand.phone}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Email</dt>
              <dd className="mt-1">
                <a className="hover:text-gold" href={`mailto:${brand.email}`}>
                  {brand.email}
                </a>
              </dd>
            </div>
          </dl>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <Column title="Explore" links={explore} />
            <Column title="Schools" links={schools} />
          </div>
        </div>
        <div className="lg:pt-2">
          <h2 className="text-3xl font-bold tracking-tight">Connect with us</h2>
          <p className="mt-2 max-w-sm text-sm leading-6 text-white/70">
            Write for admission, a school visit, or a teaching post.
          </p>
          <div className="mt-6">
            <EnquiryForm emailTo={brand.email} />
          </div>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-5 py-5 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {year} {brand.legal}
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-gold">
              Privacy
            </Link>
            <Link href="/disclaimer" className="hover:text-gold">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
