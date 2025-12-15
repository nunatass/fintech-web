"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { NavButton, ScrollButton, SupportButton } from "./components";
import { navItems } from "./config/nav-items";

export function BottomNav() {
  const [activeItem, setActiveItem] = useState("home");
  const [useHeroStyle, setUseHeroStyle] = useState(true);
  const [isOnHero, setIsOnHero] = useState(true);
  const [isInAbout, setIsInAbout] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const appFeatureSection = document.getElementById("app");
      const unifySection = document.getElementById("unify");
      const aboutSection = document.getElementById("about");
      
      // Check if we're inside the about section (white bg but full green nav)
      if (aboutSection) {
        const aboutRect = aboutSection.getBoundingClientRect();
        const isInAboutSection = aboutRect.top < window.innerHeight && aboutRect.bottom > 0;
        
        if (isInAboutSection) {
          setActiveItem("about");
          setUseHeroStyle(true); // About section uses green nav bg
          setIsOnHero(false);
          setIsInAbout(true);
          return;
        }
      }
      
      // Check if we're inside the app feature section (AppSection - green bg)
      if (appFeatureSection) {
        const appFeatureRect = appFeatureSection.getBoundingClientRect();
        // App feature section is active when its top is above viewport bottom and bottom is below viewport top
        const isInAppFeature = appFeatureRect.top < window.innerHeight && appFeatureRect.bottom > 0;
        
        if (isInAppFeature) {
          setActiveItem("app");
          setUseHeroStyle(true); // App feature has green bg like hero
          setIsOnHero(false);
          setIsInAbout(false);
          return;
        }
      }
      
      // Check if unify section is in view (part of "home")
      if (unifySection) {
        const unifyRect = unifySection.getBoundingClientRect();
        const isUnifyInView = unifyRect.top < window.innerHeight * 0.7 && unifyRect.bottom > window.innerHeight * 0.3;
        
        if (isUnifyInView) {
          setActiveItem("home");
          setUseHeroStyle(false); // Unify has white bg
          setIsOnHero(false);
          setIsInAbout(false);
          return;
        }
      }
      
      // Default to home (hero section)
      const heroHeight = window.innerHeight;
      const onHero = window.scrollY < heroHeight * 0.8;
      setIsOnHero(onHero);
      setIsInAbout(false);
      
      if (onHero) {
        setActiveItem("home");
        setUseHeroStyle(true); // Hero has green bg
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (itemId: string) => {
    setActiveItem(itemId);
    
    // Find the item and scroll to section if it has one
    const item = navItems.find(nav => nav.id === itemId);
    if (item?.sectionId) {
      const section = document.getElementById(item.sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else if (itemId === "home") {
      // Scroll to top for home
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop bottom nav */}
      <div className="fixed bottom-6 left-0 right-0 z-50 px-6 md:px-10 lg:px-12 xl:px-16 hidden md:block">
        <div className="relative flex items-center justify-center">
          {/* Left side - Scroll button */}
          <div className="absolute left-0">
            <ScrollButton 
              visible={isOnHero} 
              onClick={() => {
                const unifySection = document.getElementById("unify");
                if (unifySection) {
                  unifySection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            />
          </div>

          {/* Center navigation menu */}
          <nav
            className={cn(
              "flex items-center p-1 rounded-full transition-colors duration-300",
              isInAbout
                ? "bg-jeton-green"
                : useHeroStyle
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
                onClick={() => handleNavClick(item.id)}
              />
            ))}
          </nav>

          {/* Right side - Support button */}
          <div className="absolute right-0">
            <SupportButton variant="desktop" />
          </div>
        </div>
      </div>

      {/* Mobile support button */}
      <SupportButton variant="mobile" useHeroStyle={useHeroStyle} />
    </>
  );
}
