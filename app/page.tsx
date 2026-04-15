import { Hero } from "@/components/hero";
import { CommonValuesSlider } from "@/components/common-values-slider";
import { AirlineInfoSection } from "@/components/airline-info-section";
import { PopularDestinations } from "@/components/popular-destinations";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <CommonValuesSlider />
      <AirlineInfoSection />
      <PopularDestinations />
    </main>
  );
}
