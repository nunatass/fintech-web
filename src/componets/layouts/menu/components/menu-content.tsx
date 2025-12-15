"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon, ChevronDownIcon } from "@/componets/icons";
import { MENU_EASING } from "../config";
import { navItems, type NavItem } from "../config/nav-items";
import { useMenuStore } from "@/hooks/store";

const totalItems = navItems.length;

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (itemIndex: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      delay: 0.15 + itemIndex * 0.06,
      ease: MENU_EASING,
    },
  }),
  exit: (itemIndex: number) => ({
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.2,
      delay: (totalItems - 1 - itemIndex) * 0.04,
      ease: MENU_EASING,
    },
  }),
};

export function MenuContent() {
  const [activeItem, setActiveItem] = useState("home");
  const setIsOpen = useMenuStore((state) => state.setIsOpen);

  const handleNavClick = (item: NavItem) => {
    setActiveItem(item.id);
    
    // Close menu and scroll to section
    setIsOpen(false);
    
    setTimeout(() => {
      if (item.sectionId) {
        const section = document.getElementById(item.sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      } else if (item.id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 300);
  };

  return (
    <div className="px-6 pb-32">
      <nav className="space-y-2">
        {navItems.map((item, index) => (
          <MenuNavItem
            key={item.id}
            item={item}
            isActive={activeItem === item.id}
            itemIndex={index}
            onClick={() => handleNavClick(item)}
          />
        ))}
      </nav>
    </div>
  );
}

type MenuNavItemProps = {
  item: NavItem;
  isActive: boolean;
  itemIndex: number;
  onClick: () => void;
};

function MenuNavItem({ item, isActive, itemIndex, onClick }: MenuNavItemProps) {
  const t = useTranslations("navigation");

  return (
    <motion.button
      type="button"
      onClick={onClick}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      custom={itemIndex}
      whileHover={{ scale: 0.98, x: 4 }}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "w-full flex items-center gap-4 px-4 py-4 rounded-2xl",
        "transition-colors duration-200",
        isActive ? "bg-[#86efac]/20" : "hover:bg-[#86efac]/10"
      )}
    >
      {item.icon && (
        <div className="w-10 h-10 rounded-xl bg-[#86efac]/30 flex items-center justify-center text-black">
          {item.icon}
        </div>
      )}
      <span className={cn(
        "font-medium flex-1 text-left text-lg",
        isActive ? "text-black" : "text-[#1c1c1c]"
      )}>
        {t(item.labelKey)}
      </span>
      {item.hasDropdown && (
        <ChevronDownIcon className="w-5 h-5 text-black/50" />
      )}
      {item.isExternal && (
        <ArrowUpRightIcon className="w-5 h-5 text-black/50" />
      )}
      {isActive && <div className="w-2 h-2 rounded-full bg-black" />}
    </motion.button>
  );
}
