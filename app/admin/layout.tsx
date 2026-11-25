import { headers } from "next/headers";
import { AdminShell } from "@/components/admin/AdminShell";
import { getSite } from "@/lib/site";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const path = (await headers()).get("x-pathname") ?? "";
  if (path.startsWith("/admin/login")) return children;
  const { dbReady } = await getSite();
  return <AdminShell dbReady={dbReady}>{children}</AdminShell>;
}
