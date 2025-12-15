"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function HeroMaskTransition() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through hero section only
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

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
