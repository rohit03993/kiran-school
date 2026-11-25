"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { nav } from "@/lib/data";
import { BrandName, Logo } from "./ui";

function isActive(pathname: string, href: string) {
  if (href === "/#home" || href === "/") return pathname === "/";
  const path = href.split("#")[0];
  if (!path || path === "/") return false;
  return pathname === path || pathname.startsWith(`${path}/`);
}

function MenuLink({
  href,
  className,
  children,
  onClick,
  current,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  current?: boolean;
}) {
  if (href.includes("#")) {
    return (
      <a
        href={href}
        className={className}
        aria-current={current ? "page" : undefined}
        onClick={(event) => {
          const id = href.split("#")[1];
          const target = id ? document.getElementById(id) : null;
          if (target && window.location.pathname === "/") {
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
            window.history.pushState(null, "", href);
          }
          onClick?.();
        }}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick} aria-current={current ? "page" : undefined}>
      {children}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [edgeOpen, setEdgeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
    setEdgeOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[80] bg-white ${
        scrolled ? "shadow-[0_10px_28px_rgba(51,51,51,0.08)]" : ""
      }`}
    >
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
      >
        Skip to content
      </a>

      <div className="relative hidden h-[100px] lg:block">
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <path d="M340 0C400 0 430 100 500 100H1440V0H340Z" fill="#0F7A34" />
        </svg>
        <div className="relative z-10 flex h-full items-center px-10">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <Logo decorative />
            <BrandName />
          </Link>
          <nav aria-label="Header menu" className="ml-auto flex items-center gap-3">
            {nav.map((item) =>
              item.children ? (
                <div key={item.href} className="relative group">
                  <MenuLink
                    href={item.href}
                    className={`inline-flex items-center gap-1 rounded-full border border-white/40 px-2.5 py-[5px] text-sm font-medium transition ${
                      isActive(pathname, item.href) ||
                      item.children.some((child) => isActive(pathname, child.href))
                        ? "bg-white/90 text-maroon"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                    <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M2 4.5 6 8l4-3.5" strokeLinecap="round" />
                    </svg>
                  </MenuLink>
                  <div className="invisible absolute left-0 top-full z-20 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="min-w-[220px] rounded-2xl bg-white p-2 shadow-card">
                      {item.children.map((child) => (
                        <MenuLink
                          key={child.href}
                          href={child.href}
                          className="block rounded-xl px-3 py-2 text-sm font-medium text-ink hover:bg-mist"
                        >
                          {child.label}
                        </MenuLink>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <MenuLink
                  key={item.href}
                  href={item.href}
                  current={isActive(pathname, item.href)}
                  className={`rounded-full border border-white/40 px-2.5 py-[5px] text-sm font-medium transition ${
                    isActive(pathname, item.href) ? "bg-white/90 text-maroon" : "text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </MenuLink>
              ),
            )}
          </nav>
        </div>
      </div>

      <div className="flex items-center justify-between bg-white px-5 py-4 lg:hidden">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <Logo decorative />
          <BrandName compact />
        </Link>
        <button
          type="button"
          className="grid h-12 w-12 place-items-center rounded-2xl bg-maroon text-white"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div id="mobile-menu" className="min-h-[calc(100svh-76px)] overflow-y-auto bg-maroon px-6 py-6 lg:hidden">
          <nav aria-label="Header menu" className="flex flex-col gap-2">
            {nav.map((item) =>
              item.children ? (
                <div key={item.href}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-full px-4 py-3 text-left text-white ring-1 ring-white/30"
                    aria-expanded={edgeOpen}
                    onClick={() => setEdgeOpen((value) => !value)}
                  >
                    {item.label}
                    <span aria-hidden="true">{edgeOpen ? "−" : "+"}</span>
                  </button>
                  {edgeOpen ? (
                    <div className="mt-2 flex flex-col gap-1 pl-4">
                      {item.children.map((child) => (
                        <MenuLink key={child.href} href={child.href} onClick={() => setOpen(false)} className="rounded-full px-4 py-2 text-white/90">
                          {child.label}
                        </MenuLink>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : (
                <MenuLink
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-full px-4 py-3 ring-1 ring-white/30 ${
                    isActive(pathname, item.href) ? "bg-gold text-maroon" : "text-white"
                  }`}
                >
                  {item.label}
                </MenuLink>
              ),
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
