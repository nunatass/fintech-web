"use client";

import { useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedButtonProps = {
  href: string;
  variant: "solid" | "outline";
  className?: string;
  children: React.ReactNode;
  id: string; // Unique ID for storing width
};

export function AnimatedButton({ href, variant, className, children, id }: AnimatedButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!buttonRef.current || !textRef.current) return;

    const button = buttonRef.current;
    const textWidth = textRef.current.offsetWidth;
    const newWidth = textWidth + 48; // Add padding (px-6 = 24px * 2)

    // Get previous width from CSS custom property or sessionStorage
    const storageKey = `btn-width-${id}`;
    const previousWidth = sessionStorage.getItem(storageKey);

    if (previousWidth && previousWidth !== String(newWidth)) {
      // Animate from previous width to new width
      button.style.width = `${previousWidth}px`;
      button.style.transition = "none";
      
      // Force reflow
      button.offsetHeight;
      
      // Enable transition and set new width
      button.style.transition = "width 0.3s cubic-bezier(0.32, 0.72, 0, 1)";
      button.style.width = `${newWidth}px`;
    } else {
      // First load - set width without animation
      button.style.width = `${newWidth}px`;
    }

    // Store current width for next navigation
    sessionStorage.setItem(storageKey, String(newWidth));
  }, [children, id]);

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      whileHover={{ scale: 0.97 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
      className={cn(
        "relative cursor-pointer overflow-hidden",
        "py-3 text-sm font-medium",
        "rounded-xl",
        "flex items-center justify-center",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        variant === "solid" && [
          "bg-white text-jeton-green",
          "hover:bg-white/95",
          "focus:ring-white focus:ring-offset-jeton-green"
        ],
        variant === "outline" && [
          "bg-transparent text-white",
          "border-2 border-[#86efac]/50",
          "hover:border-[#86efac]/70 hover:bg-[#86efac]/10",
          "focus:ring-[#86efac]/40 focus:ring-offset-jeton-green"
        ],
        className
      )}
    >
      <span 
        ref={textRef}
        className="whitespace-nowrap"
      >
        {children}
      </span>
    </motion.a>
  );
}
