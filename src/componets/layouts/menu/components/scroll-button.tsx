"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { MouseIcon } from "@/componets/icons";

type ScrollButtonProps = {
  visible?: boolean;
  onClick?: () => void;
};

export function ScrollButton({ visible = true, onClick }: ScrollButtonProps) {
  const t = useTranslations("common");

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          whileHover={{ scale: 0.94 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
          onClick={onClick}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5",
            "text-black/50 text-sm font-medium",
            "bg-white/[0.08] backdrop-blur-sm rounded-full",
            "hover:bg-white/[0.12] hover:text-black/70",
            "transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-white/20"
          )}
          aria-label="Scroll down"
        >
          <MouseIcon className="w-4 h-4" />
          <span>{t("scroll")}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
