import { Container, GoldBar } from "./ui";

export function PageHero({
  kicker,
  title,
  text,
}: {
  kicker: string;
  title: string;
  text: string;
}) {
  return (
    <section className="bg-mist pt-32 pb-14 lg:pt-40">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-maroon">{kicker}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-maroon sm:text-6xl">{title}</h1>
        <GoldBar className="mt-5" />
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/75">{text}</p>
      </Container>
    </section>
  );
}
