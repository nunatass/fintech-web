"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "@/componets/icons";
import { MENU_EASING
 } from "../config";

type MenuItemConfig = {
  id: string;
  labelKey: string;
  icon: React.ReactNode;
  href: string;
  isExternal?: boolean;
  isActive?: boolean;
};

type MenuSectionConfig = {
  titleKey?: string;
  items: MenuItemConfig[];
};

const menuSectionsConfig: MenuSectionConfig[] = [
  {
    items: [
      {
        id: "homepage",
        labelKey: "navigation.homepage",
        icon: (
          <div className="w-10 h-10 rounded-xl bg-[#86efac]/30 flex items-center justify-center">
            <div className="w-5 h-5 rounded bg-white/20" />
          </div>
        ),
        href: "/",
        isActive: true,
      },
    ],
  },
  {
    titleKey: "menu.personal",
    items: [
      {
        id: "plexo-card",
        labelKey: "menu.plexoCard",
        icon: (
          <div className="w-10 h-10 rounded-xl bg-[#86efac]/20 flex items-center justify-center overflow-hidden">
            <div className="w-6 h-4 rounded bg-gradient-to-br from-pink-300 to-purple-400" />
          </div>
        ),
        href: "/personal/card",
      },
      {
        id: "fees",
        labelKey: "menu.fees",
        icon: (
          <div className="w-10 h-10 rounded-xl bg-[#86efac]/20 flex items-center justify-center overflow-hidden">
            <div className="w-6 h-6 rounded bg-[#86efac]/40" />
          </div>
        ),
        href: "/personal/fees",
      },
    ],
  },
  {
    items: [
      {
        id: "business",
        labelKey: "menu.business",
        icon: (
          <div className="w-10 h-10 rounded-xl bg-[#86efac]/20 flex items-center justify-center text-white font-semibold">
            B
          </div>
        ),
        href: "/business",
        isExternal: true,
      },
    ],
  },
  {
    titleKey: "menu.company",
    items: [
      {
        id: "about",
        labelKey: "navigation.about",
        icon: (
          <div className="w-10 h-10 rounded-xl bg-[#86efac]/20 flex items-center justify-center">
            <div className="w-5 h-5 rounded bg-white/30" />
          </div>
        ),
        href: "/company/about",
      },
      {
        id: "newsroom",
        labelKey: "menu.newsroom",
        icon: (
          <div className="w-10 h-10 rounded-xl bg-[#86efac]/20 flex items-center justify-center">
            <div className="w-5 h-5 rounded bg-white/30" />
          </div>
        ),
        href: "/company/newsroom",
      },
      {
        id: "partnerships",
        labelKey: "menu.partnerships",
        icon: (
          <div className="w-10 h-10 rounded-xl bg-[#86efac]/20 flex items-center justify-center">
            <div className="w-5 h-5 rounded bg-white/30" />
          </div>
        ),
        href: "/company/partnerships",
      },
      {
        id: "media-assets",
        labelKey: "menu.mediaAssets",
        icon: (
          <div className="w-10 h-10 rounded-xl bg-[#86efac]/20 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-white/30" />
          </div>
        ),
        href: "/company/media-assets",
      },
    ],
  },
];

export function MenuContent() {
  return (
    <div className="px-6 pb-32">
      {menuSectionsConfig.map((section, sectionIndex) => (
        <MenuSection
          key={sectionIndex}
          titleKey={section.titleKey}
          items={section.items}
          sectionIndex={sectionIndex}
        />
      ))}
    </div>
  );
}

type MenuSectionProps = {
  titleKey?: string;
  items: MenuItemConfig[];
  sectionIndex: number;
};

function MenuSection({ titleKey, items, sectionIndex }: MenuSectionProps) {
  const t = useTranslations();

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
      {titleKey && (
        <p className="text-white/50 text-sm font-medium mb-2 mt-4">
          {t(titleKey)}
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
  item: MenuItemConfig;
  sectionIndex: number;
  itemIndex: number;
};

function MenuItemLink({ item, sectionIndex, itemIndex }: MenuItemLinkProps) {
  const t = useTranslations();

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
        {t(item.labelKey)}
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
