import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <main id="content">
      <PageHero
        kicker="Privacy"
        title="How this demo treats what you type"
        text="This is a placeholder notice for the layout, not a legal policy. Have counsel write the real one before launch."
      />
      <section className="bg-white py-14">
        <Container className="max-w-3xl space-y-4 leading-7 text-ink/80">
          <p>The enquiry form runs in your browser. This demo does not send the fields to a database.</p>
          <p>If you choose “Email this enquiry”, your own mail app opens with the text you typed.</p>
          <p>Stock photos load from Unsplash. No account is required to browse the pages.</p>
        </Container>
      </section>
    </main>
  );
}
