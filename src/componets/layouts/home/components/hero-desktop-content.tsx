"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AppStoreButton } from "./app-store-button";
import { HERO_VARIANTS } from "../config";

export function HeroDesktopContent() {
  const t = useTranslations("hero");

  return (
    <div className="hidden md:flex relative z-10 flex-col md:justify-between xl:justify-end min-h-screen px-10 lg:px-12 xl:px-16 pt-28 pb-40 h-sm:pb-20 h-md:pb-24 h-lg:pb-32">

      <div className="w-full flex-1 flex flex-col justify-between gap-6 lg:gap-20 xl:flex-row xl:items-end xl:justify-between">
        {/* Left side - Main headline */}
        <motion.div 
          className="flex-shrink-0"
          variants={HERO_VARIANTS.container}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-6xl lg:text-[5rem] xl:text-[5.75rem] font-bold text-black leading-[1.02] tracking-[-0.02em]">
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

        {/* Right side - Subtitle and CTA buttons */}
        <motion.div 
          className="lg:max-w-sm xl:max-w-md lg:pb-2"
          variants={HERO_VARIANTS.container}
          initial="hidden"
          animate="visible"
          transition={{ delayChildren: 0.5 }}
        >
          <motion.p 
            variants={HERO_VARIANTS.fadeUp}
            className="text-xl text-black/90 mb-5 leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
          <motion.div variants={HERO_VARIANTS.fadeUp} className="flex gap-3">
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
    </div>
  );
}
