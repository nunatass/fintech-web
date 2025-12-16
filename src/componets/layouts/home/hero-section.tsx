"use client";

import Image from "next/image";
import { Header } from "./header";
import { MobileMenu, BottomNav } from "@/componets/layouts/menu";
import { HeroMobileContent, HeroDesktopContent, HeroMaskTransition } from "./components";
import { IPhoneFrame } from "@/componets/ui/iphone-frame";
import heroBg from "@/assets/images/bg.png";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative h-dvh md:min-h-screen bg-jeton-green overflow-hidden"
      aria-label="Hero section"
    >
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBg}
          alt="Hero background"
          fill
          className="object-cover opacity-30"
          priority
          quality={100}
        />
      </div>

      <Header />
      
      {/* Desktop iPhone Frame - Right side, bottom aligned */}
      <div 
        className="hidden sm:flex fixed inset-0 items-end z-[8] pointer-events-none 
                   pb-32 sm:pb-36 md:pb-40 lg:pb-28 
                   h-sm:pb-12 h-md:pb-16 h-lg:pb-20
                   justify-end pr-10 lg:pr-12 xl:justify-center xl:pr-0"
        style={{ clipPath: "url(#wipe-mask)" }}
      >
        <IPhoneFrame videoSrc="/hero-video.mp4" />
      </div>
      
      <HeroMobileContent />
      <HeroDesktopContent />
      <HeroMaskTransition />
      <BottomNav />
      <MobileMenu />
    </section>
  );
}
