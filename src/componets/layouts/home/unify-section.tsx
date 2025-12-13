"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { UnifyTitle, UnifyCards, ActionItems } from "./components";

export function UnifySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
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

  // Text animations
  const textScale = useTransform(textProgress, [0, 0.35], [1.2, 0.15]);
  const textY = useTransform(textProgress, [0, 0.35], ["10%", "0%"]);
  const textOpacity = useTransform(textProgress, [0.28, 0.5], [1, 0]);

  // Card animations
  const card1Left = useTransform(cardProgress, [0, 0.35], ["-8px", "49.5%"]);
  const card2Left = useTransform(cardProgress, [0, 0.35], ["8px", "50%"]);
  const card2Top = useTransform(cardProgress, [0, 0.35], ["-15px", "50%"]);
  const card3Left = useTransform(cardProgress, [0, 0.35], ["25%", "50%"]);
  const card3Top = useTransform(cardProgress, [0, 0.35], ["108%", "49%"]);
  const card4Left = useTransform(cardProgress, [0, 0.35], ["108%", "50%"]);
  const card4Top = useTransform(cardProgress, [0, 0.35], ["-15px", "51%"]);
  const card5Left = useTransform(cardProgress, [0, 0.35], ["108%", "50.5%"]);
  const card5Top = useTransform(cardProgress, [0, 0.35], ["75%", "50%"]);

  // Content scroll up animation
  const contentY = useTransform(cardProgress, [0.3, 1], ["0vh", "-250vh"]);

  // Action items animations
  const addY = useTransform(cardProgress, [0.3, 0.42], ["100vh", "0vh"]);
  const addOpacity = useTransform(cardProgress, [0.3, 0.36], [0, 1]);
  const sendY = useTransform(cardProgress, [0.42, 0.54], ["100vh", "0vh"]);
  const sendOpacity = useTransform(cardProgress, [0.42, 0.48], [0, 1]);
  const exchangeY = useTransform(cardProgress, [0.54, 0.66], ["100vh", "0vh"]);
  const exchangeOpacity = useTransform(cardProgress, [0.54, 0.6], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative h-[500vh] bg-white"
      aria-label="Unify your finances section"
    >
      {/* Sticky container for cards */}
      <motion.div 
        style={{ y: contentY }}
        className="sticky top-0 h-screen overflow-hidden flex items-center justify-center pt-4"
      >
        <UnifyTitle scale={textScale} y={textY} opacity={textOpacity} />
        <UnifyCards
          card1Left={card1Left}
          card2Left={card2Left}
          card2Top={card2Top}
          card3Left={card3Left}
          card3Top={card3Top}
          card4Left={card4Left}
          card4Top={card4Top}
          card5Left={card5Left}
          card5Top={card5Top}
        />
      </motion.div>

      {/* Action items */}
      <ActionItems
        addY={addY}
        addOpacity={addOpacity}
        sendY={sendY}
        sendOpacity={sendOpacity}
        exchangeY={exchangeY}
        exchangeOpacity={exchangeOpacity}
      />
    </section>
  );
}
