import { Hero } from "@/components/Hero";
import {
  Benefits,
  Collaborations,
  Intro,
  JoinBand,
  NetworkBand,
  News,
  Stats,
  Team,
} from "@/components/HomeSections";
import { SchoolStrip } from "@/components/SchoolStrip";
import { getSite } from "@/lib/site";

export default async function HomePage() {
  const { site } = await getSite();

  return (
    <main id="content">
      <Hero {...site.hero} />
      <Intro {...site.intro} />
      <Stats {...site.stats} />
      <SchoolStrip schools={site.schools.items} title={site.schools.title} text={site.schools.text} />
      <Benefits {...site.benefits} />
      <NetworkBand title={site.network.title} text={site.network.text} schools={site.schools.items} />
      <Collaborations title={site.collaborations.title} text={site.collaborations.text} partners={site.collaborations.items} />
      <Team {...site.team} />
      <JoinBand {...site.join} />
      <News homeLead={site.insights.homeLead} homeAccent={site.insights.homeAccent} items={site.insights.items} />
    </main>
  );
}
