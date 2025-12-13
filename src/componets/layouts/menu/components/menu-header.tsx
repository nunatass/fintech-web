"use client";

import { useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { LanguageSelector } from "@/componets/ui/language-selector";
import { MENU_EASING } from "../config";

export function MenuHeader() {
  const t = useTranslations("common");

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
          aria-label={`${t("appName")} - Home`}
        >
          {t("appName")}
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
        <AnimatedLoginButton id="menu-login">{t("login")}</AnimatedLoginButton>
      </motion.div>
    </div>
  );
}

function AnimatedLoginButton({ children, id }: { children: React.ReactNode; id: string }) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!buttonRef.current || !textRef.current) return;

    const button = buttonRef.current;
    const textWidth = textRef.current.offsetWidth;
    const newWidth = textWidth + 48;

    const storageKey = `btn-width-${id}`;
    const previousWidth = sessionStorage.getItem(storageKey);

    if (previousWidth && previousWidth !== String(newWidth)) {
      button.style.width = `${previousWidth}px`;
      button.style.transition = "none";
      button.offsetHeight;
      button.style.transition = "width 0.3s cubic-bezier(0.32, 0.72, 0, 1)";
      button.style.width = `${newWidth}px`;
    } else {
      button.style.width = `${newWidth}px`;
    }

    sessionStorage.setItem(storageKey, String(newWidth));
  }, [children, id]);

  return (
    <a
      ref={buttonRef}
      href="/login"
      className={cn(
        "flex items-center justify-center overflow-hidden",
        "py-3 text-sm font-medium",
        "border-2 border-[#86efac]/50 rounded-xl",
        "bg-transparent text-white"
      )}
    >
      <span ref={textRef} className="whitespace-nowrap">
        {children}
      </span>
    </a>
  );
}
