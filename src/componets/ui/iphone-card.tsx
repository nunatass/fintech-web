"use client";

import { motion } from "framer-motion";

export interface IPhoneCardProps {
  index: number;
  total: number;
  activeIndex: number;
  videoSrc?: string;
  imageSrc?: string;
  color?: string;
}

export function IPhoneCard({ 
  index, 
  total, 
  activeIndex,
  videoSrc,
  imageSrc,
  color = "#000000"
}: IPhoneCardProps) {
  // Logic:
  // If index < activeIndex: This card has been peeled away (Height 0%).
  // If index >= activeIndex: This card is visible (Height 100%).
  const isPeeled = index < activeIndex;
  
  // Blur Logic:
  // If this card is the active one (index === activeIndex), it should be clear (opacity 0).
  // If this card is waiting to be revealed (index > activeIndex), it should be blurred (opacity 1).
  const isBlurred = index > activeIndex;

  const isLast = index === total - 1;
  const isFirst = index === 0;

  return (
    <div 
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: total - index }}
    >
      <motion.div
        className="relative w-full overflow-hidden"
        initial={{ height: "100%" }}
        animate={{ 
            height: isLast ? "100%" : (isPeeled ? "0%" : "100%") 
        }}
        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        style={{ 
            backgroundColor: color,
        }}
      >
        {videoSrc ? (
            <video
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
            />
        ) : imageSrc ? (
            <img 
                src={imageSrc} 
                alt="" 
                className="w-full h-full object-cover"
            />
        ) : null}

        {/* Blur Overlay */}
        {!isFirst && (
            <motion.div 
                className="absolute inset-0 bg-white/30 backdrop-blur-md z-10"
                initial={{ opacity: 1 }}
                animate={{ opacity: isBlurred ? 1 : 0 }}
                transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            />
        )}
      </motion.div>
    </div>
  );
}
