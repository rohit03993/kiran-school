import Image from "next/image";
import Link from "next/link";
import type { School, Stat } from "@/lib/data";
import { photo } from "@/lib/data";
import { StatCard } from "./StatCard";
import { ArrowIcon, Container, GoldBar, OutlineLink } from "./ui";

function ColumnMark() {
  return (
    <svg viewBox="0 0 48 180" className="hidden h-44 w-10 lg:block" aria-hidden="true">
      <rect x="4" y="8" width="6" height="164" rx="3" fill="#0F7A34" fillOpacity="0.28" />
      <rect x="18" y="8" width="6" height="164" rx="3" fill="#FFD700" />
      <rect x="32" y="8" width="6" height="164" rx="3" fill="#0F7A34" fillOpacity="0.28" />
    </svg>
  );
}

export function Intro({ heading, body }: { heading: string; body: string }) {
  return (
    <section id="about" className="after relative z-40 scroll-mt-24 bg-mist">
      <Container className="grid items-center gap-6 py-12 lg:grid-cols-[auto_1.15fr_0.85fr] lg:gap-8 lg:py-28">
        <ColumnMark />
        <div>
          <h2 className="text-[2rem] font-bold leading-[1.05] tracking-tight text-maroon sm:text-5xl">{heading}</h2>
          <GoldBar className="mt-5" />
        </div>
        <p className="text-base leading-7 text-ink/80">{body}</p>
      </Container>
    </section>
  );
}

export function Stats({ title, items }: { title: string; items: Stat[] }) {
  return (
    <section id="numbers" className="relative z-40 scroll-mt-24 bg-white py-12 lg:py-24">
      <Container>
        <h2 className="mx-auto max-w-3xl text-center text-[2rem] font-bold tracking-tight text-maroon sm:text-5xl">{title}</h2>
        <GoldBar align="center" className="mt-5" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 lg:mt-12">
          {items.map((stat) => (
            <StatCard key={stat.label} stat={{ ...stat, image: stat.image || undefined }} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function BenefitCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="h-full rounded-[32px] bg-white px-6 py-7 shadow-[14px_14px_0_rgba(15,122,52,0.32)] transition duration-300 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[18px_18px_0_rgba(15,122,52,0.32)] motion-reduce:transition-none motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0 sm:rounded-[40px] sm:px-7 sm:py-8 sm:shadow-[18px_18px_0_rgba(15,122,52,0.32)]">
      <h3 className="text-[1.35rem] font-bold leading-tight tracking-tight text-maroon">{title}</h3>
      <p className="mt-3 text-[15px] leading-6 text-[#5c5c5c]">{body}</p>
    </article>
  );
}

export function Benefits({
  kicker,
  title,
  items,
}: {
  kicker: string;
  title: string;
  items: { title: string; body: string }[];
}) {
  const lead = items.slice(0, 3);
  const tail = items.slice(3);

  return (
    <section id="academics" className="relative z-40 scroll-mt-24 overflow-hidden bg-[#f4f7f5] py-14 sm:py-16 lg:py-20">
      <Image
        src={photo("photo-1522163182402-834f871fd851", 2000)}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[center_40%]"
      />
      <div className="absolute inset-0 bg-white/90" />
      <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <div className="mb-8 max-w-md lg:hidden">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-maroon">{kicker}</p>
          <h2 className="mt-3 text-[2.4rem] font-bold leading-[0.95] tracking-tight text-maroon">{title}</h2>
        </div>
        <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-10">
          <div className="hidden lg:block" aria-hidden="true" />
          {lead.map((item) => (
            <BenefitCard key={item.title} title={item.title} body={item.body} />
          ))}
          <div className="hidden self-end pb-2 lg:block lg:pr-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-maroon">{kicker}</p>
            <h2 className="mt-3 text-[3.15rem] font-bold leading-[0.92] tracking-tight text-maroon xl:text-[3.5rem]">
              {title}
            </h2>
          </div>
          {tail.map((item) => (
            <BenefitCard key={item.title} title={item.title} body={item.body} />
          ))}
        </div>
      </div>
    </section>
  );
}

const networkSpots = [
  { x: 14, y: 32, size: 124 },
  { x: 38, y: 58, size: 150 },
  { x: 64, y: 26, size: 136 },
  { x: 88, y: 54, size: 112 },
];

const networkLinks: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [0, 2],
  [1, 3],
];

function SchoolMark({ school, size }: { school: School; size: number }) {
  return (
    <Link
      href={`/schools/${school.slug}`}
      aria-label={`${school.name}, ${school.board}, ${school.city}`}
      className="group relative block text-center"
    >
      <span
        className="relative mx-auto block overflow-hidden rounded-full bg-white shadow-[0_12px_28px_rgba(15,122,52,0.14)] ring-[3px] ring-gold transition duration-300 group-hover:scale-105"
        style={{ width: size, height: size }}
      >
        <Image src={school.image} alt="" fill sizes={`${size}px`} className="object-cover" />
      </span>
      <span className="absolute left-1/2 top-full mt-3 w-40 -translate-x-1/2">
        <span className="block text-sm font-bold tracking-tight text-maroon">{school.board}</span>
        <span className="mt-0.5 block text-xs text-ink/55">{school.city}</span>
      </span>
    </Link>
  );
}

export function NetworkBand({ title, text, schools }: { title: string; text: string; schools: School[] }) {
  const shown = schools.slice(0, 4);

  return (
    <section id="schools" className="relative z-40 scroll-mt-24 bg-white py-16 lg:py-20">
      <Container>
        <h2 className="text-center text-[2rem] font-bold tracking-tight text-maroon sm:text-5xl lg:text-6xl">{title}</h2>
        <GoldBar align="center" className="mt-4" />
        <p className="mx-auto mt-3 max-w-xl text-center text-base text-ink/70 sm:text-lg">{text}</p>
      </Container>

      <div className="relative mx-auto mt-8 grid max-w-lg grid-cols-2 gap-x-8 gap-y-10 px-6 lg:hidden">
        <svg className="pointer-events-none absolute inset-x-10 top-12 h-[58%] w-[calc(100%-5rem)]" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <line x1="18" y1="8" x2="82" y2="8" stroke="#0F7A34" strokeOpacity="0.28" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
          <line x1="18" y1="92" x2="82" y2="92" stroke="#0F7A34" strokeOpacity="0.28" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
          <line x1="18" y1="8" x2="18" y2="92" stroke="#0F7A34" strokeOpacity="0.28" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
          <line x1="82" y1="8" x2="82" y2="92" stroke="#0F7A34" strokeOpacity="0.28" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
        </svg>
        {shown.map((school) => (
          <div key={school.slug} className="relative z-10 pb-12">
            <SchoolMark school={school} size={104} />
          </div>
        ))}
      </div>

      <div className="relative mx-auto mt-4 hidden h-[560px] max-w-[1200px] lg:block">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {networkLinks.map(([from, to]) => {
            const a = networkSpots[from];
            const b = networkSpots[to];
            if (!a || !b || !shown[from] || !shown[to]) return null;
            return (
              <line
                key={`${from}-${to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="#0F7A34"
                strokeOpacity="0.28"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>
        {shown.map((school, index) => {
          const spot = networkSpots[index];
          if (!spot) return null;
          return (
            <div
              key={school.slug}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            >
              <SchoolMark school={school} size={spot.size} />
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex justify-center lg:mt-2">
        <OutlineLink href="/schools">Find a school</OutlineLink>
      </div>
    </section>
  );
}

export function Collaborations({
  title,
  text,
  partners,
}: {
  title: string;
  text: string;
  partners: { name: string }[];
}) {
  const loop = [...partners, ...partners];
  return (
    <section id="boards" className="relative z-40 scroll-mt-24 bg-mist py-16">
      <Container>
        <h2 className="text-center text-4xl font-bold tracking-tight text-maroon sm:text-5xl">{title}</h2>
        <GoldBar align="center" className="mt-4" />
        <p className="mx-auto mt-3 max-w-xl text-center text-ink/70">{text}</p>
      </Container>
      <div className="marquee-wrap mt-10 overflow-hidden">
        <div className="marquee-track">
          {loop.map((name, index) => (
            <span
              key={`${name.name}-${index}`}
              className="mx-3 inline-flex h-20 min-w-[200px] items-center justify-center rounded-full border border-gold/70 bg-white px-8 text-lg font-semibold tracking-tight text-maroon shadow-card"
            >
              {name.name}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <OutlineLink href="/#schools">Our schools</OutlineLink>
      </div>
    </section>
  );
}

export function Team({
  title,
  body,
  photo1,
  alt1,
  photo2,
  alt2,
}: {
  title: string;
  body: string;
  photo1: string;
  alt1: string;
  photo2: string;
  alt2: string;
}) {
  return (
    <section id="leadership" className="relative z-40 scroll-mt-24 bg-white py-16 lg:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-maroon sm:text-5xl">{title}</h2>
          <GoldBar className="mt-4" />
          <p className="mt-5 max-w-xl leading-7 text-ink/80">{body}</p>
          <div className="mt-8">
            <OutlineLink href="/leadership">Know more</OutlineLink>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="relative h-52 overflow-hidden rounded-2xl bg-mist sm:h-96 sm:rounded-none">
            <Image src={photo1} alt={alt1} fill sizes="25vw" className="object-cover" />
          </div>
          <div className="relative h-52 overflow-hidden rounded-2xl bg-mist sm:h-96 sm:rounded-none">
            <Image src={photo2} alt={alt2} fill sizes="25vw" className="object-cover" />
          </div>
        </div>
      </Container>
    </section>
  );
}

export function JoinBand({ title, body }: { title: string; body: string }) {
  return (
    <section id="admissions" className="relative z-40 scroll-mt-24 min-h-[340px] overflow-hidden">
      <Image src={photo("photo-1580582932707-520aed937b7b")} alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-maroon/75" />
      <Container className="relative flex min-h-[340px] flex-col items-center justify-center py-16 text-center text-white">
        <h2 className="text-3xl font-bold tracking-tight text-gold sm:text-6xl">{title}</h2>
        <div className="mt-6 flex w-full max-w-3xl flex-col items-stretch gap-4 rounded-[28px] border border-white/80 px-5 py-5 text-left sm:flex-row sm:items-center sm:px-6">
          <p className="flex-1 text-sm leading-6 text-white/95 sm:text-base">
            {body}
          </p>
          <Link
            href="/contact"
            aria-label="Know more about joining"
            className="grid h-12 w-12 shrink-0 place-items-center self-end rounded-full bg-gold text-maroon ring-2 ring-gold sm:self-auto"
          >
            <ArrowIcon />
          </Link>
        </div>
      </Container>
    </section>
  );
}

export function News({
  homeLead,
  homeAccent,
  items,
}: {
  homeLead: string;
  homeAccent: string;
  items: { slug: string; title: string; image: string }[];
}) {
  return (
    <section id="news" className="relative z-40 scroll-mt-24 bg-white py-14">
      <Container>
        <div className="rounded-[28px] border border-maroon/30 px-4 py-10 sm:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight text-ink sm:text-5xl">
            {homeLead} <span className="text-maroon">{homeAccent}</span>
          </h2>
          <GoldBar align="center" className="mt-4" />
          <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 lg:grid-cols-4 lg:gap-8">
            {items.map((item) => (
              <Link key={item.slug} href={`/insights/${item.slug}`} className="group text-center">
                <div className="relative">
                  <div className="relative h-32 overflow-hidden rounded-[22px] bg-mist sm:h-44">
                    <Image src={item.image} alt="" fill sizes="240px" className="object-cover" />
                  </div>
                  <span className="absolute -bottom-4 right-3 grid h-10 w-10 place-items-center rounded-full bg-gold text-maroon shadow-card">
                    <ArrowIcon />
                  </span>
                </div>
                <h3 className="mt-7 text-sm font-medium leading-5 text-ink group-hover:text-maroon">{item.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
