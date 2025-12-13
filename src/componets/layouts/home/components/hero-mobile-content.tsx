"use client";

import { motion } from "framer-motion";
import { AppStoreButton } from "./app-store-button";
import { HERO_VARIANTS } from "../config";

export function HeroMobileContent() {
  return (
    <div className="absolute inset-x-0 top-20 bottom-44 z-10 md:hidden">
      <div className="h-full px-6 flex flex-col justify-between">
        {/* Top - Main headline */}
        <motion.div
          variants={HERO_VARIANTS.container}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-[2.75rem] sm:text-5xl font-bold text-white leading-[1.02] tracking-[-0.02em]">
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

        {/* Bottom - Subtitle and CTA buttons */}
        <motion.div
          variants={HERO_VARIANTS.container}
          initial="hidden"
          animate="visible"
          transition={{ delayChildren: 0.5 }}
        >
          <motion.p 
            variants={HERO_VARIANTS.fadeUp}
            className="text-base text-white/90 mb-3 leading-relaxed"
          >
            Single account for all your payments.
          </motion.p>
          <motion.div variants={HERO_VARIANTS.fadeUp} className="flex gap-2">
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
