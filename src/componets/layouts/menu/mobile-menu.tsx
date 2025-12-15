"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMenuStore } from "@/hooks/store";
import { MenuButton, MenuHeader, MenuContent } from "./components";
import { MENU_EASING } from "./config";

const menuVariants = {
  hidden: {
    y: "100%",
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.5,
      ease: MENU_EASING,
      when: "beforeChildren",
    },
  },
  exit: {
    y: "-100%",
    transition: {
      duration: 0.6,
      ease: MENU_EASING,
      delay: 0.4,
    },
  },
};

export function MobileMenu() {
  const { isOpen, toggleMenu, setIsOpen } = useMenuStore();
  const [useHeroStyle, setUseHeroStyle] = useState(true);
  const [isInAbout, setIsInAbout] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const appSection = document.getElementById("app");
      const aboutSection = document.getElementById("about");
      
      // Check if we're in App section
      if (appSection) {
        const appRect = appSection.getBoundingClientRect();
        const isInApp = appRect.top < window.innerHeight && appRect.bottom > 0;
        if (isInApp) {
          setUseHeroStyle(true);
          setIsInAbout(false);
          return;
        }
      }
      
      // Check if we're in About section
      if (aboutSection) {
        const aboutRect = aboutSection.getBoundingClientRect();
        const isInAboutSection = aboutRect.top < window.innerHeight && aboutRect.bottom > 0;
        if (isInAboutSection) {
          setUseHeroStyle(true);
          setIsInAbout(true);
          return;
        }
      }
      
      // Check if we're on Hero
      const heroHeight = window.innerHeight;
      const isOnHero = window.scrollY < heroHeight * 0.8;
      setUseHeroStyle(isOnHero);
      setIsInAbout(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, setIsOpen]);

  return (
    <>
      {/* Menu Overlay */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="mobile-menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 bg-jeton-green overflow-y-auto md:hidden"
          >
            <MenuHeader />
            <MenuContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Single Menu Button - always visible, above overlay */}
      <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center md:hidden">
        <MenuButton isOpen={isOpen} onClick={toggleMenu} isOnHero={useHeroStyle} useFullGreen={isInAbout} />
      </div>
    </>
  );
}
