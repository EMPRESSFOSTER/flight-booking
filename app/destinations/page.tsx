import { DestinationsHero } from "@/components/destinations-hero";
import { DestinationsSections } from "@/components/destinations-sections";

export const metadata = {
  title: "Destinations | SkyWay Travel",
  description: "Explore our worldwide destinations across domestic, regional, and international routes.",
};

export default function DestinationsPage() {
  return (
    <main className="flex-1">
      <DestinationsHero />
      <DestinationsSections />
    </main>
  );
}
