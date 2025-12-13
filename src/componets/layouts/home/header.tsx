"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ButtonLink } from "@/componets/ui/button";
import { LanguageSelector } from "@/componets/ui/language-selector";
import { useMenu } from "@/componets/layouts/menu";

export function Header() {
  const { isOpen } = useMenu();
  const hasAnimated = useRef(false);

  // Only animate after first render (when menu opens/closes)
  const shouldAnimate = hasAnimated.current;
  if (isOpen) hasAnimated.current = true;

  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-6 py-4 md:px-10 lg:px-12">
      <nav
        className="flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo with 3D flip animation */}
        <div className="perspective-[1000px]">
          <AnimatePresence mode="wait" initial={false}>
            {!isOpen && (
              <motion.a
                href="/"
                initial={shouldAnimate ? { rotateY: -90, opacity: 0 } : false}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: 90, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                className="block text-4xl font-bold text-white tracking-tight"
                aria-label="Plexo - Home"
              >
                Plexo
              </motion.a>
            )}
          </AnimatePresence>
        </div>

        {/* Right side buttons */}
        <AnimatePresence mode="wait" initial={false}>
          {!isOpen && (
            <motion.div
              initial={shouldAnimate ? { opacity: 0, y: -10 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="flex items-center gap-2 md:gap-3"
            >
              {/* Language selector - hidden on small screens */}
              <LanguageSelector className="hidden lg:block" />

              {/* Log in button - always visible */}
              <ButtonLink
                href="/login"
                variant="outline"
              >
                Log in
              </ButtonLink>

              {/* Sign up button - hidden on very small screens */}
              <ButtonLink href="/signup" variant="solid" className="hidden sm:inline-flex">
                Sign up
              </ButtonLink>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
