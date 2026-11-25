"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { School } from "@/lib/data";

export function SchoolDirectory({ schools }: { schools: School[] }) {
  const cities = useMemo(() => ["All", ...Array.from(new Set(schools.map((school) => school.city)))], [schools]);
  const [city, setCity] = useState("All");
  const [query, setQuery] = useState("");

  const shown = schools.filter((school) => {
    const inCity = city === "All" || school.city === city;
    const haystack = `${school.name} ${school.board ?? ""} ${school.city} ${school.state}`.toLowerCase();
    return inCity && haystack.includes(query.trim().toLowerCase());
  });

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {cities.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCity(item)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                city === item ? "bg-maroon text-white" : "bg-white text-ink ring-1 ring-black/10"
              }`}
              aria-pressed={city === item}
            >
              {item}
            </button>
          ))}
        </div>
        <label className="text-sm font-medium text-ink">
          <span className="sr-only">Search schools</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or city"
            className="w-full rounded-full border border-black/10 bg-white px-4 py-2.5 sm:w-72"
          />
        </label>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {shown.map((school) => (
          <Link key={school.slug} href={`/schools/${school.slug}`} className="group overflow-hidden rounded-[28px] bg-white shadow-card">
            <div className="relative h-56 bg-maroon">
              <Image src={school.image} alt={school.imageAlt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
            </div>
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-maroon">
                {school.board ? `${school.board} · ` : ""}
                {school.city}, {school.state}
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">{school.name}</h2>
              <p className="mt-2 text-sm text-ink/70">
                {school.grades}
                {school.students && school.students !== "Enquire" ? ` · ${school.students} students` : ""}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {shown.length === 0 ? (
        <p className="mt-8 text-ink/70">No school matches that search.</p>
      ) : null}
    </div>
  );
}
