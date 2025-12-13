// Smooth spring-like easing for menu animations
export const MENU_EASING: [number, number, number, number] = [0.32, 0.72, 0, 1];

// Types
export type MenuItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  isExternal?: boolean;
  href?: string;
  isActive?: boolean;
};

export type MenuSection = {
  title?: string;
  items: MenuItem[];
};

// Menu sections configuration
export const menuSections: MenuSection[] = [
  {
    items: [
      {
        id: "homepage",
        label: "Homepage",
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
    title: "Personal",
    items: [
      {
        id: "Plexo-card",
        label: "Plexo Card",
        icon: (
          <div className="w-10 h-10 rounded-xl bg-[#86efac]/20 flex items-center justify-center overflow-hidden">
            <div className="w-6 h-4 rounded bg-gradient-to-br from-pink-300 to-purple-400" />
          </div>
        ),
        href: "/personal/card",
      },
      {
        id: "fees",
        label: "Fees",
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
        label: "Business",
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
    title: "Company",
    items: [
      {
        id: "about",
        label: "About",
        icon: (
          <div className="w-10 h-10 rounded-xl bg-[#86efac]/20 flex items-center justify-center">
            <div className="w-5 h-5 rounded bg-white/30" />
          </div>
        ),
        href: "/company/about",
      },
      {
        id: "newsroom",
        label: "Newsroom",
        icon: (
          <div className="w-10 h-10 rounded-xl bg-[#86efac]/20 flex items-center justify-center">
            <div className="w-5 h-5 rounded bg-white/30" />
          </div>
        ),
        href: "/company/newsroom",
      },
      {
        id: "partnerships",
        label: "Partnerships",
        icon: (
          <div className="w-10 h-10 rounded-xl bg-[#86efac]/20 flex items-center justify-center">
            <div className="w-5 h-5 rounded bg-white/30" />
          </div>
        ),
        href: "/company/partnerships",
      },
      {
        id: "media-assets",
        label: "Media Assets",
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
