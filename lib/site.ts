import { unstable_noStore as noStore } from "next/cache";
import { defaultSite, type SectionKey, type SiteContent } from "./defaults";

function mergeSite(rows: { key: string; value: string }[]) {
  const site = structuredClone(defaultSite) as SiteContent;
  for (const row of rows) {
    if (!(row.key in site)) continue;
    try {
      const saved = JSON.parse(row.value) as Record<string, unknown>;
      const key = row.key as SectionKey;
      site[key] = { ...site[key], ...saved } as SiteContent[SectionKey];
    } catch {
      continue;
    }
  }
  return site;
}

export async function getSite() {
  noStore();
  try {
    const { getPrisma } = await import("./prisma");
    const rows = await getPrisma().content.findMany();
    return { site: mergeSite(rows), dbReady: true };
  } catch {
    return { site: structuredClone(defaultSite), dbReady: false };
  }
}

export async function saveSection(key: SectionKey, value: unknown) {
  const { getPrisma } = await import("./prisma");
  const current = defaultSite[key];
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Section must be an object");
  }
  const next = { ...current, ...(value as object) };
  await getPrisma().content.upsert({
    where: { key },
    create: { key, value: JSON.stringify(next) },
    update: { value: JSON.stringify(next) },
  });
}
