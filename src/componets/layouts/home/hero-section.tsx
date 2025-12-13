"use client";

import { Header } from "./header";
import { MobileMenu, MenuProvider, BottomNav } from "@/componets/layouts/menu";
import { HeroMobileContent, HeroDesktopContent } from "./components";

export function HeroSection() {
  return (
    <MenuProvider>
      <section
        className="relative h-screen md:min-h-screen bg-jeton-green overflow-hidden"
        aria-label="Hero section"
      >
        <Header />
        <HeroMobileContent />
        <HeroDesktopContent />
        <BottomNav />
        <MobileMenu />
      </section>
    </MenuProvider>
  );
}
