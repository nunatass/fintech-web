"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type MenuContextType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleMenu: () => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <MenuContext.Provider value={{ isOpen, setIsOpen, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
}
