"use client";

import Image from "next/image";
import { useState } from "react";
import type { School } from "@/lib/data";
import { GoldBar, OutlineLink } from "./ui";

export function SchoolStrip({
  schools,
  title,
  text,
}: {
  schools: School[];
  title: string;
  text: string;
}) {
  const [index, setIndex] = useState(0);
  const count = schools.length;
  const visible = count === 0 ? [] : [schools[index % count], schools[(index + 1) % count]].filter(
    (school, itemIndex, list) => list.findIndex((item) => item.slug === school.slug) === itemIndex,
  );

  function move(direction: number) {
    setIndex((current) => (count === 0 ? 0 : (current + direction + count) % count));
  }

  return (
    <section id="campuses" className="relative z-40 scroll-mt-24 bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-[1200px] px-5 pb-6 sm:px-8 lg:pb-8">
        <h2 className="text-center text-[2rem] font-bold tracking-tight text-maroon sm:text-left sm:text-5xl">{title}</h2>
        <GoldBar className="mx-auto mt-4 sm:mx-0" />
        <p className="mt-4 max-w-xl text-center text-ink/70 sm:text-left">{text}</p>
      </div>
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-4 px-5 sm:px-8 md:grid-cols-2">
        {visible.map((school, itemIndex) => (
          <div
            key={school.slug}
            className={`relative overflow-hidden rounded-[28px] bg-maroon ${itemIndex === 1 ? "hidden h-[520px] md:block" : "h-[min(72vw,360px)] md:h-[520px]"}`}
          >
            <Image src={school.image} alt={school.imageAlt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-center gap-4 text-maroon">
        <button
          type="button"
          aria-label="Previous school"
          onClick={() => move(-1)}
          className="grid h-11 w-11 place-items-center rounded-full bg-gold text-xl text-maroon"
        >
          ‹
        </button>
        <p className="min-w-16 text-center text-lg">
          {count === 0 ? 0 : (index % count) + 1} <span className="text-maroon/50">/ {count}</span>
        </p>
        <button
          type="button"
          aria-label="Next school"
          onClick={() => move(1)}
          className="grid h-11 w-11 place-items-center rounded-full bg-gold text-xl text-maroon"
        >
          ›
        </button>
      </div>
      <div className="mt-6 flex justify-center">
        <OutlineLink href="/schools">Find a school</OutlineLink>
      </div>
    </section>
  );
}
