import Link from "next/link";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Pill({
  href,
  children,
  tone = "light",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "light" | "solid";
}) {
  const toneClass =
    tone === "light"
      ? "bg-white text-maroon hover:bg-mist"
      : "bg-gold text-maroon hover:bg-[#e6c200]";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition ${toneClass}`}
    >
      {children}
    </Link>
  );
}

export function OutlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-3 rounded-full border border-gold bg-gold py-1.5 pl-6 pr-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-maroon transition hover:bg-[#e6c200]"
    >
      {children}
      <span className="grid h-9 w-9 place-items-center rounded-full bg-maroon text-gold">
        <ArrowIcon className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}

export function GoldBar({ align = "left", className = "" }: { align?: "left" | "center"; className?: string }) {
  return (
    <div className={`h-1.5 w-14 rounded-full bg-gold ${align === "center" ? "mx-auto" : ""} ${className}`} aria-hidden="true" />
  );
}

export function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M4 12 12 4M6 4h6v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ decorative = false }: { decorative?: boolean }) {
  return (
    <img
      src="/logo.png"
      alt={decorative ? "" : "Dr. Kiran Saujiya ICSE School, Mainpuri"}
      className="h-14 w-14 rounded-full bg-white object-contain sm:h-16 sm:w-16 lg:h-[76px] lg:w-[76px]"
    />
  );
}

export function BrandName({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`min-w-0 leading-[1.05] text-[#222] ${compact ? "" : "hidden lg:block"}`}>
      <span className={`block font-bold tracking-[-0.02em] ${compact ? "text-[13px]" : "text-[15px] xl:text-[17px]"}`}>
        Dr. Kiran Saujiya
      </span>
      <span className={`mt-0.5 block font-semibold uppercase tracking-[0.16em] text-maroon ${compact ? "text-[10px]" : "text-[11px]"}`}>
        Group
      </span>
    </span>
  );
}
