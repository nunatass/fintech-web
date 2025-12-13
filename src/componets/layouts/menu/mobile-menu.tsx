"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMenu } from "./menu-context";
import { MenuButton, MenuHeader, MenuContent } from "./components";
import { MENU_EASING } from "./config";

export function MobileMenu() {
  const { isOpen, toggleMenu } = useMenu();
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
      {/* Menu Overlay */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.5, ease: MENU_EASING }}
            className="fixed inset-0 z-40 bg-jeton-green overflow-y-auto md:hidden"
          >
            <MenuHeader />
            <MenuContent />

            {/* Bottom Menu Button (inside overlay) */}
            <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center md:hidden">
              <MenuButton isOpen={isOpen} onClick={toggleMenu} isOnHero={isOnHero} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Menu Button (outside overlay) */}
      {!isOpen && (
        <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center md:hidden">
          <MenuButton isOpen={isOpen} onClick={toggleMenu} isOnHero={isOnHero} />
        </div>
      )}
    </>
  );
}
