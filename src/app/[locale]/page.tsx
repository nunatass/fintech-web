import { HeroSection } from "@/componets/layouts/home/hero-section";
import { UnifySection } from "@/componets/layouts/home/unify-section";
import { BenefitsSection } from "@/componets/layouts/home/benefits-section";
import { AboutSection } from "@/componets/layouts/home/about-section";

export default function Home() {
  return (
    <main className="relative pb-24 md:pb-0">
      <HeroSection />
      <UnifySection />
      <BenefitsSection />
      <AboutSection />
    </main>
  );
}
