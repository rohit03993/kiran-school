"use client";

import Image from "next/image";
import { useState } from "react";
import type { Stat } from "@/lib/data";
import { ArrowIcon } from "./ui";

export function StatCard({ stat }: { stat: Stat }) {
  const [open, setOpen] = useState(false);
  const front =
    stat.tone === "gold" ? "bg-gold text-maroon" : stat.tone === "photo" ? "bg-white text-maroon" : "bg-maroon text-white";
  const arrow = stat.tone === "maroon" ? "bg-white/20 text-white" : "bg-white text-maroon";

  return (
    <button
      type="button"
      className={`stat-flip w-full text-left ${open ? "is-open" : ""} ${stat.tone === "gold" ? "is-short" : ""}`}
      aria-pressed={open}
      aria-label={`${stat.value} ${stat.label}. ${open ? "Hide" : "Show"} the note.`}
      onClick={() => setOpen((value) => !value)}
    >
      <div className="stat-flip-inner">
        <div className={`stat-face ${front}`}>
          {stat.image ? (
            <Image
              src={stat.image}
              alt={stat.imageAlt ?? ""}
              fill
              sizes="(min-width: 1280px) 280px, 100vw"
              className={`object-cover ${stat.tone === "maroon" ? "object-bottom opacity-90" : "object-center"}`}
            />
          ) : null}
          {stat.tone === "photo" ? <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white via-white to-transparent lg:h-44" /> : null}
          {stat.tone === "maroon" && stat.image ? (
            <div className="absolute inset-0 bg-gradient-to-b from-maroon via-maroon/55 to-maroon/10" />
          ) : null}
          <span className={`absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full ${arrow}`}>
            <ArrowIcon />
          </span>
          <div className="relative z-10 p-6">
            <p className="text-5xl font-bold tracking-tight">{stat.value}</p>
            <p className="mt-1 text-2xl font-medium">{stat.label}</p>
          </div>
        </div>
        <div className={`stat-face stat-back flex items-end p-6 ${stat.tone === "gold" ? "bg-gold text-maroon" : "bg-maroon text-white"}`}>
          <p className="text-lg leading-7">{stat.back}</p>
        </div>
      </div>
    </button>
  );
}
