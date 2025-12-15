import { HomeIcon } from "@/componets/icons";

export type NavItem = {
  id: string;
  labelKey: string;
  icon?: React.ReactNode;
  hasDropdown?: boolean;
  isExternal?: boolean;
  href?: string;
  sectionId?: string;
};

export const navItems: NavItem[] = [
  {
    id: "home",
    labelKey: "home",
    icon: <HomeIcon className="w-5 h-5" />,
    sectionId: "hero",
  },
  {
    id: "app",
    labelKey: "app",
    sectionId: "app",
  },
  {
    id: "about",
    labelKey: "about",
    hasDropdown: true,
  },
];
