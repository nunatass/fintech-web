import { HeroSection } from "@/componets/layouts/home/hero-section";
import { UnifySection } from "@/componets/layouts/home/unify-section";
import { FeaturesSection } from "@/componets/layouts/home/features-section";

export default function Home() {
  return (
    <main className="relative pb-24 md:pb-0">
      <HeroSection />
      <UnifySection />
      <FeaturesSection />
    </main>
  );
}
