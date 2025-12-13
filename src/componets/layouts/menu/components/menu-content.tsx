"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "@/componets/icons";
import { MENU_EASING, menuSections, type MenuItem } from "../config";

export function MenuContent() {
  return (
    <div className="px-6 pb-32">
      {menuSections.map((section, sectionIndex) => (
        <MenuSection
          key={sectionIndex}
          title={section.title}
          items={section.items}
          sectionIndex={sectionIndex}
        />
      ))}
    </div>
  );
}

type MenuSectionProps = {
  title?: string;
  items: MenuItem[];
  sectionIndex: number;
};

function MenuSection({ title, items, sectionIndex }: MenuSectionProps) {
  return (
    <motion.div 
      className="mb-2"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: 0.1 + sectionIndex * 0.08,
        ease: MENU_EASING
      }}
    >
      {title && (
        <p className="text-white/50 text-sm font-medium mb-2 mt-4">
          {title}
        </p>
      )}
      <div className="space-y-1">
        {items.map((item, itemIndex) => (
          <MenuItemLink
            key={item.id}
            item={item}
            sectionIndex={sectionIndex}
            itemIndex={itemIndex}
          />
        ))}
      </div>
    </motion.div>
  );
}

type MenuItemLinkProps = {
  item: MenuItem;
  sectionIndex: number;
  itemIndex: number;
};

function MenuItemLink({ item, sectionIndex, itemIndex }: MenuItemLinkProps) {
  return (
    <motion.a
      href={item.href}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.15 + sectionIndex * 0.08 + itemIndex * 0.04,
        ease: MENU_EASING
      }}
      whileHover={{ scale: 0.98, x: 4 }}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "flex items-center gap-4 px-4 py-3 rounded-2xl",
        "transition-colors duration-200",
        item.isActive
          ? "bg-[#86efac]/20"
          : "hover:bg-[#86efac]/10"
      )}
    >
      {item.icon}
      <span className="text-white font-medium flex-1">
        {item.label}
      </span>
      {item.isExternal && (
        <ArrowUpRightIcon className="w-4 h-4 text-white/70" />
      )}
      {item.isActive && (
        <div className="w-2 h-2 rounded-full bg-white" />
      )}
    </motion.a>
  );
}
