"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { MenuIcon, CloseIcon } from "@/componets/icons";
import { MENU_EASING } from "../config";

type MenuButtonProps = {
  isOpen: boolean;
  onClick: () => void;
  isOnHero: boolean;
  useFullGreen?: boolean;
};

export function MenuButton({ isOpen, onClick, isOnHero, useFullGreen = false }: MenuButtonProps) {
  const t = useTranslations("common");

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 0.94 }}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.2, ease: MENU_EASING }}
      className={cn(
        "flex items-center gap-3 px-6 py-3",
        "text-black text-sm font-medium",
        "rounded-full",
        "transition-colors duration-300",
        isOpen 
          ? "bg-[#86efac]/30 backdrop-blur-md"
          : useFullGreen
            ? "bg-jeton-green"
            : isOnHero
              ? "bg-[#86efac]/30 backdrop-blur-md"
              : "bg-jeton-green"
      )}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <span>{t("menu")}</span>
      <MenuButtonIcon isOpen={isOpen} />
    </motion.button>
  );
}

function MenuButtonIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative w-5 h-5">
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.span
            key="close"
            initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
            transition={{ duration: 0.35, ease: MENU_EASING }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <CloseIcon className="w-5 h-5" />
          </motion.span>
        ) : (
          <motion.span
            key="menu"
            initial={{ opacity: 0, rotate: 180, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -180, scale: 0.5 }}
            transition={{ duration: 0.35, ease: MENU_EASING }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <MenuIcon className="w-5 h-5" />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
