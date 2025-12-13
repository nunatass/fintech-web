import { HomeIcon } from "@/componets/icons";

export type NavItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  hasDropdown?: boolean;
  isExternal?: boolean;
  href?: string;
};

export const navItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: <HomeIcon className="w-5 h-5" />,
    href: "/",
  },
  {
    id: "about",
    label: "About",
    hasDropdown: true,
  },
  {
    id: "cards",
    label: "Cards",
    isExternal: true,
    href: "/cards",
  },
  {
    id: "app",
    label: "App",
    hasDropdown: true,
  },
  {
    id: "faqs",
    label: "FAQs",
    hasDropdown: true,
  },
];
