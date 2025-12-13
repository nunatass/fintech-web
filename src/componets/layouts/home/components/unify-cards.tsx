"use client";

import { motion, MotionValue } from "framer-motion";
import { Card1, Card2, Card3, Card4, Card5 } from "@/componets/ui/cards";

type UnifyCardsProps = {
  card1Left: MotionValue<string>;
  card2Left: MotionValue<string>;
  card2Top: MotionValue<string>;
  card3Left: MotionValue<string>;
  card3Top: MotionValue<string>;
  card4Left: MotionValue<string>;
  card4Top: MotionValue<string>;
  card5Left: MotionValue<string>;
  card5Top: MotionValue<string>;
};

export function UnifyCards({
  card1Left,
  card2Left,
  card2Top,
  card3Left,
  card3Top,
  card4Left,
  card4Top,
  card5Left,
  card5Top,
}: UnifyCardsProps) {
  return (
    <>
      {/* Card 3 - comes from bottom-left (25%) - lowest z-index */}
      <motion.div
        style={{ left: card3Left, top: card3Top }}
        className="absolute -translate-x-1/2 -translate-y-1/2 z-[21]"
      >
        <Card3 />
      </motion.div>

      {/* Card 5 - comes from bottom-right */}
      <motion.div
        style={{ left: card5Left, top: card5Top }}
        className="absolute -translate-x-1/2 -translate-y-1/2 z-[22]"
      >
        <Card5 />
      </motion.div>

      {/* Card 1 - comes from left center */}
      <motion.div
        style={{ left: card1Left }}
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-[23]"
      >
        <Card1 />
      </motion.div>

      {/* Card 2 - comes from top-left */}
      <motion.div
        style={{ left: card2Left, top: card2Top }}
        className="absolute -translate-x-1/2 -translate-y-1/2 z-[24]"
      >
        <Card2 />
      </motion.div>

      {/* Card 4 - comes from top-right - highest z-index */}
      <motion.div
        style={{ left: card4Left, top: card4Top }}
        className="absolute -translate-x-1/2 -translate-y-1/2 z-[25]"
      >
        <Card4 />
      </motion.div>
    </>
  );
}
