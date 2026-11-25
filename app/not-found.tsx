import { Pill } from "@/components/ui";

export default function NotFound() {
  return (
    <main id="content" className="bg-mist px-5 pb-24 pt-40">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-maroon">404</p>
      <h1 className="mt-3 text-5xl font-bold tracking-tight">That page is not in the demo.</h1>
      <p className="mt-4 max-w-lg text-ink/75">The link may be old, or the page has not been added yet.</p>
      <div className="mt-8">
        <Pill href="/" tone="solid">
          Back home
        </Pill>
      </div>
    </main>
  );
}
