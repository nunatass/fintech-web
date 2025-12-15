import { create } from "zustand";

type MenuState = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleMenu: () => void;
};

export const useMenuStore = create<MenuState>((set) => ({
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
}));
