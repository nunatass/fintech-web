"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { NavButton, ScrollButton, SupportButton } from "./components";
import { navItems } from "./config/nav-items";

export function BottomNav() {
  const [activeItem, setActiveItem] = useState("home");
  const [isOnHero, setIsOnHero] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setIsOnHero(window.scrollY < heroHeight * 0.001);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop bottom nav */}
      <div className="fixed bottom-6 left-0 right-0 z-50 px-6 md:px-10 lg:px-12 xl:px-16 hidden md:block">
        <div className="flex items-center justify-between">
          <ScrollButton />

          {/* Center navigation menu */}
          <nav
            className={cn(
              "flex items-center p-1 rounded-full transition-colors duration-300",
              isOnHero
                ? "bg-[#86efac]/20 backdrop-blur-md"
                : "bg-jeton-green"
            )}
            aria-label="Page sections"
          >
            {navItems.map((item) => (
              <NavButton
                key={item.id}
                item={item}
                isActive={activeItem === item.id}
                onClick={() => setActiveItem(item.id)}
              />
            ))}
          </nav>

          <SupportButton variant="desktop" />
        </div>
      </div>

      {/* Mobile support button */}
      <SupportButton variant="mobile" />
    </>
  );
}
