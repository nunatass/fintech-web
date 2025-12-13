"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { MessageSquareIcon } from "@/componets/icons";

type SupportButtonProps = {
  variant: "desktop" | "mobile";
};

export function SupportButton({ variant }: SupportButtonProps) {
  const t = useTranslations("common");

  if (variant === "mobile") {
    return (
      <motion.button
        type="button"
        whileHover={{ scale: 0.94 }}
        whileTap={{ scale: 0.92 }}
        transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
        className={cn(
          "fixed bottom-6 right-6 z-30 md:hidden",
          "flex items-center justify-center p-3",
          "text-white/90 cursor-pointer",
          "bg-neutral-800/50 backdrop-blur-sm rounded-full",
          "hover:bg-neutral-800/70",
          "transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-neutral-800/50"
        )}
        aria-label={t("support")}
      >
        <MessageSquareIcon className="w-5 h-5" />
      </motion.button>
    );
  }

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 0.94 }}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
      className={cn(
        "flex items-center gap-2 px-4 py-2.5",
        "text-white/90 text-sm font-medium",
        "bg-neutral-800/50 backdrop-blur-sm rounded-full",
        "hover:bg-neutral-800/70",
        "transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-neutral-800/50",
        "cursor-pointer"
      )}
      aria-label={t("support")}
    >
      <MessageSquareIcon className="w-4 h-4" />
      <span>{t("support")}</span>
    </motion.button>
  );
}
