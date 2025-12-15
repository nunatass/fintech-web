"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { AppleIcon, GooglePlayIcon } from "@/componets/icons";

type AppStoreButtonProps = {
  store: "apple" | "google";
  href: string;
};

export function AppStoreButton({ store, href }: AppStoreButtonProps) {
  const t = useTranslations("hero.appStore");
  
  const label = store === "apple" ? t("downloadOn") : t("getItOn");
  const storeName = store === "apple" ? t("appStore") : t("googlePlay");

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 0.96 }}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
      className={cn(
        "w-[165px] sm:w-[180px] inline-flex items-center gap-2.5 px-3 py-2 cursor-pointer",
        "border-2 border-black rounded-xl",
        "bg-transparent",
        "hover:bg-black/10",
        "transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-black/40 focus:ring-offset-2 focus:ring-offset-jeton-green"
      )}
      aria-label={`${label} ${storeName}`}
    >
      {store === "apple" ? (
        <AppleIcon className="w-5 h-5 text-black flex-shrink-0" />
      ) : (
        <GooglePlayIcon className="w-5 h-5 text-black flex-shrink-0" />
      )}
      <div className="flex flex-col">
        <span className="text-[9px] text-black font-semibold uppercase tracking-wide leading-tight">
          {label}
        </span>
        <span className="text-xs font-semibold text-black leading-tight">
          {storeName}
        </span>
      </div>
    </motion.a>
  );
}
