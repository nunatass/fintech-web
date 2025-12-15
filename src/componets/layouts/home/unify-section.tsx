"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { UnifyTitle, UnifyCards, ActionItems } from "./components";

export function UnifySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLElement | null>(null);
  const [isAtBenefits, setIsAtBenefits] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Get benefits section ref on mount
  useEffect(() => {
    benefitsRef.current = document.getElementById("app");
  }, []);
  
  // Text scroll tracking - starts when section top is at 25% from viewport top
  const { scrollYProgress: textProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.25", "end end"],
  });

  // Card scroll tracking - starts when section top reaches viewport top
  const { scrollYProgress: cardProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  
  // Track scroll on benefits section to scroll actions up
  const { scrollYProgress: benefitsProgress } = useScroll({
    target: benefitsRef.current ? benefitsRef : undefined,
    offset: ["start end", "start start"],
  });

  // Text animations
  const textScale = useTransform(textProgress, [0, 0.35], [1.2, 0.15]);
  const textY = useTransform(textProgress, [0, 0.35], ["10%", "0%"]);
  // Text disappears only when cards are stacked and content starts scrolling up
  const textOpacity = useTransform(cardProgress, [0.28, 0.32], [1, 0]);

  // Card animations - using percentage-based values for responsive positioning
  // Subtle offsets at end position so cards aren't perfectly stacked
  
  // Card 1 - comes from left center (offset: slightly left)
  const card1Left = useTransform(cardProgress, [0, 0.35], ["-15%", "49%"]);
  
  // Card 2 - comes from top-left (offset: slightly up)
  // Scales down to match other cards size
  const card2Left = useTransform(cardProgress, [0, 0.35], ["-10%", "50%"]);
  const card2Top = useTransform(cardProgress, [0, 0.35], ["-10%", "50%"]);
  const card2Scale = useTransform(cardProgress, [0, 0.35], [1, 0.75]);
  
  // Card 3 - comes from bottom-left (offset: slightly down)
  // Scales down slightly to match other cards width
  const card3Left = useTransform(cardProgress, [0, 0.35], ["15%", "50%"]);
  const card3Top = useTransform(cardProgress, [0, 0.35], ["115%", "50%"]);
  const card3Scale = useTransform(cardProgress, [0, 0.35], [1, 0.83]);
  
  // Card 4 - comes from top-right (offset: slightly left)
  // Scales down slightly to match other cards width
  const card4Left = useTransform(cardProgress, [0, 0.35], ["115%", "50.5%"]);
  const card4Top = useTransform(cardProgress, [0, 0.35], ["-10%", "50%"]);
  const card4Scale = useTransform(cardProgress, [0, 0.35], [1, 0.83]);
  
  // Card 5 - comes from bottom-right (offset: slightly left-down)
  // Scales down to match other cards size
  const card5Left = useTransform(cardProgress, [0, 0.35], ["110%", "50%"]);
  const card5Top = useTransform(cardProgress, [0, 0.35], ["80%", "50%"]);
  const card5Scale = useTransform(cardProgress, [0, 0.35], [1, 0.75]);

  // Content scroll up animation
  const contentY = useTransform(cardProgress, [0.3, 1], ["0vh", "-250vh"]);

  // Action items animations with spring bounce effect
  const addY = useTransform(cardProgress, [0.3, 0.42], ["100vh", "0vh"]);
  const addOpacity = useTransform(cardProgress, [0.3, 0.36], [0, 1]);
  const addScale = useTransform(cardProgress, [0.3, 0.42], [0.3, 1.2]);
  
  const sendY = useTransform(cardProgress, [0.42, 0.54], ["100vh", "0vh"]);
  const sendOpacity = useTransform(cardProgress, [0.42, 0.48], [0, 1]);
  const sendScale = useTransform(cardProgress, [0.42, 0.54], [0.3, 1.2]);
  
  const exchangeY = useTransform(cardProgress, [0.54, 0.66], ["100vh", "0vh"]);
  const exchangeOpacity = useTransform(cardProgress, [0.54, 0.6], [0, 1]);
  const exchangeScale = useTransform(cardProgress, [0.54, 0.66], [0.3, 1.2]);

  // After Benefits shows and user scrolls, scroll actions up and out
  const actionsContainerY = useTransform(benefitsProgress, [0.5, 1], ["0vh", "-100vh"]);

  // Auto-scroll to Benefits when Exchange has shown
  useMotionValueEvent(cardProgress, "change", (latest) => {
    if (isScrolling) return;
    
    // Going DOWN: When Exchange has shown and user scrolls past 0.70 → auto-scroll to Benefits (full screen)
    if (latest >= 0.70 && !isAtBenefits) {
      setIsScrolling(true);
      setIsAtBenefits(true);
      const benefitsSection = document.getElementById("app");
      if (benefitsSection) {
        benefitsSection.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => setIsScrolling(false), 1000);
      }
    }
  });

  return (
    <section
      id="unify"
      ref={containerRef}
      className="relative h-[350vh] bg-white"
      aria-label="Unify your finances section"
    >
      {/* Sticky container for cards */}
      <motion.div 
        style={{ y: contentY }}
        className="sticky top-0 h-dvh md:h-screen overflow-hidden flex items-center justify-center pt-4"
      >
        <UnifyTitle scale={textScale} y={textY} opacity={textOpacity} />
        <UnifyCards
          card1Left={card1Left}
          card2Left={card2Left}
          card2Top={card2Top}
          card2Scale={card2Scale}
          card3Left={card3Left}
          card3Top={card3Top}
          card3Scale={card3Scale}
          card4Left={card4Left}
          card4Top={card4Top}
          card4Scale={card4Scale}
          card5Left={card5Left}
          card5Top={card5Top}
          card5Scale={card5Scale}
        />
      </motion.div>

      {/* Action items */}
      <ActionItems
        addY={addY}
        addOpacity={addOpacity}
        addScale={addScale}
        sendY={sendY}
        sendOpacity={sendOpacity}
        sendScale={sendScale}
        exchangeY={exchangeY}
        exchangeOpacity={exchangeOpacity}
        exchangeScale={exchangeScale}
        containerY={actionsContainerY}
      />
    </section>
  );
}
