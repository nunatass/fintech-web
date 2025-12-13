"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, ArrowUpRightIcon } from "@/componets/icons";
import type { NavItem } from "../config/nav-items";

type NavButtonProps = {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
};

export function NavButton({ item, isActive, onClick }: NavButtonProps) {
  const hasIconOnly = item.icon && item.id === "home";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 0.94 }}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
      className={cn(
        "flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-full",
        "transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-inset",
        isActive
          ? "bg-[#86efac]/40 text-white"
          : "text-white/80 hover:text-white hover:bg-[#86efac]/20",
        hasIconOnly && "px-3"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {hasIconOnly ? (
        item.icon
      ) : (
        <>
          <span>{item.label}</span>
          {item.hasDropdown && (
            <ChevronDownIcon
              className={cn(
                "w-4 h-4 opacity-70 transition-transform duration-200"
              )}
            />
          )}
          {item.isExternal && <ArrowUpRightIcon className="w-3.5 h-3.5" />}
        </>
      )}
    </motion.button>
  );
}
