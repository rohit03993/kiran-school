"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Slide = { src: string; alt: string };

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

export function Hero({
  line1,
  line2,
  accent,
  line3,
  slides,
}: {
  line1: string;
  line2: string;
  accent: string;
  line3: string;
  slides: Slide[];
}) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || slides.length === 0) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, [slides.length]);

  useEffect(() => {
    const box = mediaRef.current;
    if (!box) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const place = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      if (vw < 1024) {
        box.style.position = "";
        box.style.left = "";
        box.style.top = "";
        box.style.width = "";
        box.style.height = "";
        return;
      }

      const pad = vw >= 1440 ? 60 : vw >= 1200 ? 40 : 24;
      const startW = vw * 0.6;
      const startH = vh * 0.75;
      const startL = vw - pad - startW;
      const startT = vh - pad - startH;

      const animRange = vh * 0.5;
      const scrolled = window.scrollY - vh * 0.15;
      const raw = Math.max(0, Math.min(1, scrolled / animRange));
      const progress = reduce ? (raw > 0.5 ? 1 : 0) : raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2;

      const endW = vw * 0.96;
      const endH = vh * 0.83;
      let left = lerp(startL, (vw - endW) / 3, progress);
      let top = lerp(startT, (vh - endH) / 1.1, progress);
      const width = lerp(startW, endW, progress);
      const height = lerp(startH, endH, progress);

      const after = document.querySelector(".after");
      if (after) {
        const afterTop = after.getBoundingClientRect().top;
        const videoBottom = top + height;
        const gap = 80;
        if (afterTop < videoBottom + gap) {
          top -= videoBottom + gap - afterTop;
        }
      }

      box.style.position = "fixed";
      box.style.left = `${left}px`;
      box.style.top = `${top}px`;
      box.style.width = `${width}px`;
      box.style.height = `${height}px`;
      box.style.visibility = top + height < 0 ? "hidden" : "visible";
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(place);
    };

    place();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  function go(next: number) {
    setIndex((next + slides.length) % slides.length);
  }

  return (
    <section id="home" className="relative scroll-mt-24 lg:h-[170vh]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 80% at 15% 50%, rgba(15, 122, 52, 0.08) 0%, transparent 65%), radial-gradient(80% 90% at 70% 40%, rgba(15, 122, 52, 0.03) 0%, #fff 70%)",
        }}
      />
      <div className="relative z-10 flex flex-col px-6 pt-[108px] lg:h-[calc(100px+80vh)] lg:justify-center lg:px-0 lg:pt-[100px]">
        <h1 className="max-w-[600px] text-[2.55rem] font-extrabold leading-none text-[#333] sm:text-[3.6rem] lg:pl-[70px] lg:text-[6.67vw]">
          <span className="block">{line1}</span>
          {line2 ? <span className="block">{line2}</span> : null}
          {line3 ? <span className="block font-normal italic lg:inline">{line3}</span> : null}
          {accent ? (
            <span className="block lg:inline">
              {line3 ? " " : ""}
              {accent}
            </span>
          ) : null}
        </h1>
      </div>

      <div
        ref={mediaRef}
        className="relative z-20 mx-4 mt-4 h-[52svh] max-h-[480px] min-h-[280px] overflow-hidden rounded-[28px] bg-ink sm:mx-6 sm:mt-6 sm:h-[440px] sm:max-h-none sm:rounded-[32px] lg:mx-0 lg:mt-0 lg:h-auto lg:min-h-0 lg:rounded-[40px]"
      >
        {slides.map((slide, slideIndex) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slideIndex === index ? slide.alt : ""}
            fill
            priority={slideIndex === 0}
            sizes="80vw"
            className={`object-cover transition-opacity duration-700 ${
              slideIndex === index ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={slideIndex === index ? undefined : true}
          />
        ))}
        <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-2">
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-lg text-maroon"
            aria-label="Previous slide"
            onClick={() => go(index - 1)}
          >
            <span aria-hidden="true">‹</span>
          </button>
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Go to slide ${slideIndex + 1}`}
              aria-current={slideIndex === index ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all ${
                slideIndex === index ? "w-6 bg-white" : "w-2.5 bg-white/65"
              }`}
              onClick={() => go(slideIndex)}
            />
          ))}
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-lg text-maroon"
            aria-label="Next slide"
            onClick={() => go(index + 1)}
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>
    </section>
  );
}
