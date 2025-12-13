"use client";

import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import iphoneImage from "@/assets/images/iphones.png";
import { FeaturesContent, FeaturesProgress } from "./components";

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Feature content animations
  const feature1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 1, 0]);
  const feature2Opacity = useTransform(scrollYProgress, [0.15, 0.2, 0.35, 0.4], [0, 1, 1, 0]);
  const feature3Opacity = useTransform(scrollYProgress, [0.35, 0.4, 0.55, 0.6], [0, 1, 1, 0]);
  const feature4Opacity = useTransform(scrollYProgress, [0.55, 0.6, 0.75, 0.8], [0, 1, 1, 0]);
  const feature5Opacity = useTransform(scrollYProgress, [0.75, 0.8, 1], [0, 1, 1]);

  const featureOpacities = [feature1Opacity, feature2Opacity, feature3Opacity, feature4Opacity, feature5Opacity];

  // Y animations for text
  const feature1Y = useTransform(scrollYProgress, [0, 0.15, 0.2], ["0%", "0%", "-20%"]);
  const feature2Y = useTransform(scrollYProgress, [0.15, 0.2, 0.35, 0.4], ["20%", "0%", "0%", "-20%"]);
  const feature3Y = useTransform(scrollYProgress, [0.35, 0.4, 0.55, 0.6], ["20%", "0%", "0%", "-20%"]);
  const feature4Y = useTransform(scrollYProgress, [0.55, 0.6, 0.75, 0.8], ["20%", "0%", "0%", "-20%"]);
  const feature5Y = useTransform(scrollYProgress, [0.75, 0.8, 1], ["20%", "0%", "0%"]);

  const featureYs = [feature1Y, feature2Y, feature3Y, feature4Y, feature5Y];

  return (
    <section
      ref={containerRef}
      className="relative h-[500vh] bg-jeton-green"
      aria-label="Features section"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Content layout */}
        <div className="h-full flex flex-col lg:flex-row items-center justify-center px-6 md:px-10 lg:px-16 xl:px-24 gap-8 lg:gap-16">
          {/* iPhone mockup */}
          <div className="relative w-full max-w-[280px] md:max-w-[320px] lg:max-w-[380px] flex-shrink-0">
            <Image
              src={iphoneImage}
              alt="Plexo app on iPhone"
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Text content */}
          <FeaturesContent
            featureOpacities={featureOpacities}
            featureYs={featureYs}
          />
        </div>

        {/* Progress indicators */}
        <FeaturesProgress scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}
