"use client";

import { motion } from "framer-motion";
import { AppStoreButton } from "./app-store-button";
import { HERO_VARIANTS } from "../config";

export function HeroDesktopContent() {
  return (
    <div className="hidden md:flex relative z-10 flex-col justify-end min-h-screen px-10 lg:px-12 xl:px-16 pt-28 pb-40">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-20">
        {/* Left side - Main headline */}
        <motion.div 
          className="flex-shrink-0"
          variants={HERO_VARIANTS.container}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold text-white leading-[1.02] tracking-[-0.02em]">
            <span className="block overflow-hidden">
              <motion.span variants={HERO_VARIANTS.line} className="block">
                One app
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={HERO_VARIANTS.line} className="block">
                for all needs
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
            className="text-xl text-white/90 mb-5 leading-relaxed"
          >
            Single account for all your payments.
          </motion.p>
          <motion.div variants={HERO_VARIANTS.fadeUp} className="flex gap-3">
            <AppStoreButton
              store="apple"
              label="Download on the"
              storeName="App Store"
              href="https://apps.apple.com"
            />
            <AppStoreButton
              store="google"
              label="GET IT ON"
              storeName="Google Play"
              href="https://play.google.com"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
