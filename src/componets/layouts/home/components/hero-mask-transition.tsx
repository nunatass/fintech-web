"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export function HeroMaskTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout>();

  // Track scroll progress through hero section only
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Auto-scroll to perfect position when user stops scrolling
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Clear previous timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // Set flag that we're scrolling
    isScrolling.current = true;

    // Wait for scroll to stop
    scrollTimeout.current = setTimeout(() => {
      isScrolling.current = false;
      
      // If stopped in the middle of animation (between 0.1 and 0.9)
      if (latest > 0.1 && latest < 0.9) {
        const heroSection = document.getElementById("hero");
        const unifySection = document.getElementById("unify");
        
        // If more than halfway, scroll to unify
        if (latest >= 0.5 && unifySection) {
          unifySection.scrollIntoView({ behavior: "smooth" });
        } 
        // If less than halfway, scroll back to hero
        else if (latest < 0.5 && heroSection) {
          heroSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 150); // Wait 150ms after user stops scrolling
  });

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  // Mask shape with very large curve - we only see the smooth top part
  const maskPath = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      // Start: Full screen
      "M 0 0 L 1 0 L 1 1 L 0 1 Z",
      // Middle: Very large curve - control point far down for smooth arc
      "M 0 0 L 1 0 L 1 1 Q 0.5 1.5 0 1 Z",
      // End: Wiped completely away
      "M 0 0 L 1 0 L 1 0 Q 0.5 0 0 0 Z"
    ]
  );

  return (
    <>
      {/* Container for scroll tracking - height of hero section */}
      <div ref={containerRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Green background with mask - no opacity, stays solid */}
      <div className="fixed inset-0 pointer-events-none z-[5]">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0"
        >
          <defs>
            <clipPath id="wipe-mask" clipPathUnits="objectBoundingBox">
              <motion.path d={maskPath} />
            </clipPath>
          </defs>
          
          {/* Green rectangle with wipe mask */}
          <rect
            width="100"
            height="100"
            fill="#22c55e"
            clipPath="url(#wipe-mask)"
          />
        </svg>
      </div>
    </>
  );
}
