"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTranslations } from "next-intl";
import { AppStoreButton } from "./app-store-button";
import { IPhoneFrame } from "@/componets/ui/iphone-frame";
import { HERO_VARIANTS } from "../config";

export function HeroMobileContent() {
  const t = useTranslations("hero");

  // Track scroll to animate bottom padding
  const { scrollY } = useScroll();
  
  // Animate bottom from 128px (bottom-32) to 12px as user scrolls
  const bottomRaw = useTransform(scrollY, [0, 150], [128, 12]);
  
  // Apply spring for smooth animation
  const bottomPadding = useSpring(bottomRaw, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  });

  return (
    <motion.div 
      style={{ bottom: bottomPadding }}
      className="absolute inset-x-0 top-20 z-10 md:hidden"
    >
      <div className="h-full px-6 flex flex-col justify-between">
        {/* Top - Main headline */}
        <motion.div
          variants={HERO_VARIANTS.container}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-[2.75rem] sm:text-5xl font-bold text-black leading-[1.02] tracking-[-0.02em]">
            <span className="block overflow-hidden">
              <motion.span variants={HERO_VARIANTS.line} className="block">
                {t("title.line1")}
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={HERO_VARIANTS.line} className="block">
                {t("title.line2")}
              </motion.span>
            </span>
          </h1>
        </motion.div>

        {/* iPhone Frame - Mobile only */}
        <div className="flex sm:hidden justify-center my-4">
          <IPhoneFrame videoSrc="/hero-video.mp4" />
        </div>

        {/* Bottom - Subtitle and CTA buttons */}
        <motion.div
          variants={HERO_VARIANTS.container}
          initial="hidden"
          animate="visible"
          transition={{ delayChildren: 0.5 }}
          className="sm:block"
        >
          <motion.p 
            variants={HERO_VARIANTS.fadeUp}
            className="text-base text-black/90 mb-3 leading-relaxed text-center sm:text-left"
          >
            {t("subtitle")}
          </motion.p>
          <motion.div 
            variants={HERO_VARIANTS.fadeUp} 
            className="flex gap-2 justify-center sm:justify-start"
          >
            <AppStoreButton
              store="apple"
              href="https://apps.apple.com"
            />
            <AppStoreButton
              store="google"
              href="https://play.google.com"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
