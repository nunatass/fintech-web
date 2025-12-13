"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LanguageSelector } from "@/componets/ui/language-selector";
import { MENU_EASING } from "../config";

export function MenuHeader() {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-6 py-4 bg-jeton-green">
      {/* Logo with 3D flip animation */}
      <div className="perspective-[1000px]">
        <motion.a
          href="/"
          initial={{ rotateY: -90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15, ease: MENU_EASING }}
          style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
          className="block text-4xl font-bold text-white tracking-tight"
          aria-label="Plexo - Home"
        >
          Plexo
        </motion.a>
      </div>

      {/* Right side buttons */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15, ease: MENU_EASING }}
        className="flex items-center gap-2"
      >
        <LanguageSelector size="lg" />
        <LoginButton />
      </motion.div>
    </div>
  );
}

function LoginButton() {
  return (
    <a
      href="/login"
      className={cn(
        "inline-flex items-center justify-center",
        "px-6 py-3 text-sm font-medium",
        "border-2 border-[#86efac]/50 rounded-xl",
        "bg-transparent text-white"
      )}
    >
      Log in
    </a>
  );
}
