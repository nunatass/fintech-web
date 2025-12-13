import { HomeIcon } from "@/componets/icons";

export type NavItem = {
  id: string;
  labelKey: string;
  icon?: React.ReactNode;
  hasDropdown?: boolean;
  isExternal?: boolean;
  href?: string;
};

export const navItems: NavItem[] = [
  {
    id: "home",
    labelKey: "home",
    icon: <HomeIcon className="w-5 h-5" />,
    href: "/",
  },
  {
    id: "about",
    labelKey: "about",
    hasDropdown: true,
  },
  {
    id: "cards",
    labelKey: "cards",
    isExternal: true,
    href: "/cards",
  },
  {
    id: "app",
    labelKey: "app",
    hasDropdown: true,
  },
  {
    id: "faqs",
    labelKey: "faqs",
    hasDropdown: true,
  },
];
