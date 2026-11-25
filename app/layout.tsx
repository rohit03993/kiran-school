import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { headers } from "next/headers";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getSite } from "@/lib/site";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Dr. Kiran Saujiya Schools",
    template: "%s · Dr. Kiran Saujiya Schools",
  },
  description:
    "Dr. Kiran Saujiya Schools. Learning from the early years to Class 12, with CBSE, ICSE, and the Uttar Pradesh Board.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const path = (await headers()).get("x-pathname") ?? "";
  const admin = path.startsWith("/admin");
  const { site } = await getSite();

  return (
    <html lang="en" className={sans.variable}>
      <body className="font-sans antialiased">
        {admin ? (
          children
        ) : (
          <>
            <Header />
            {children}
            <Footer brand={site.brand} />
          </>
        )}
      </body>
    </html>
  );
}
