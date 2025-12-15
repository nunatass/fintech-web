import { HeroSection } from "@/componets/layouts/home/hero-section";
import { UnifySection } from "@/componets/layouts/home/unify-section";
import { AppSection } from "@/componets/layouts/home/app-section";
import { AboutSection } from "@/componets/layouts/home/about-section";

export default function Home() {
  return (
    <main className="relative pb-24 md:pb-0">
      <HeroSection />
      <UnifySection />
      <AppSection />
      <AboutSection />
    </main>
  );
}
