"use client";

import { motion, MotionValue } from "framer-motion";
import { Card1, Card2, Card3, Card4, Card5 } from "@/componets/ui/cards";

type UnifyCardsProps = {
  card1Left: MotionValue<string>;
  card2Left: MotionValue<string>;
  card2Top: MotionValue<string>;
  card2Scale: MotionValue<number>;
  card3Left: MotionValue<string>;
  card3Top: MotionValue<string>;
  card3Scale: MotionValue<number>;
  card4Left: MotionValue<string>;
  card4Top: MotionValue<string>;
  card4Scale: MotionValue<number>;
  card5Left: MotionValue<string>;
  card5Top: MotionValue<string>;
  card5Scale: MotionValue<number>;
};

export function UnifyCards({
  card1Left,
  card2Left,
  card2Top,
  card2Scale,
  card3Left,
  card3Top,
  card3Scale,
  card4Left,
  card4Top,
  card4Scale,
  card5Left,
  card5Top,
  card5Scale,
}: UnifyCardsProps) {
  return (
    <>
      {/* Card 3 - comes from bottom-left with scale animation - lowest z-index */}
      <motion.div
        style={{ left: card3Left, top: card3Top }}
        className="absolute -translate-x-1/2 -translate-y-1/2 z-[21]"
      >
        <motion.div style={{ scale: card3Scale }} className="origin-center">
          <Card3 />
        </motion.div>
      </motion.div>

      {/* Card 5 - comes from bottom-right with scale animation */}
      <motion.div
        style={{ left: card5Left, top: card5Top }}
        className="absolute -translate-x-1/2 -translate-y-1/2 z-[22]"
      >
        <motion.div style={{ scale: card5Scale }} className="origin-center">
          <Card5 />
        </motion.div>
      </motion.div>

      {/* Card 1 - comes from left center */}
      <motion.div
        style={{ left: card1Left }}
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-[23]"
      >
        <Card1 />
      </motion.div>

      {/* Card 2 - comes from top-left with scale animation */}
      <motion.div
        style={{ left: card2Left, top: card2Top }}
        className="absolute -translate-x-1/2 -translate-y-1/2 z-[24]"
      >
        <motion.div style={{ scale: card2Scale }} className="origin-center">
          <Card2 />
        </motion.div>
      </motion.div>

      {/* Card 4 - comes from top-right with scale animation - highest z-index */}
      <motion.div
        style={{ left: card4Left, top: card4Top }}
        className="absolute -translate-x-1/2 -translate-y-1/2 z-[25]"
      >
        <motion.div style={{ scale: card4Scale }} className="origin-center">
          <Card4 />
        </motion.div>
      </motion.div>
    </>
  );
}
