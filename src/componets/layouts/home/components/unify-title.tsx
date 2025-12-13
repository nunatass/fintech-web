"use client";

import { motion, MotionValue } from "framer-motion";

type UnifyTitleProps = {
  scale: MotionValue<number>;
  y: MotionValue<string>;
  opacity: MotionValue<number>;
};

export function UnifyTitle({ scale, y, opacity }: UnifyTitleProps) {
  return (
    <motion.h2
      style={{ scale, y, opacity }}
      className="text-[20vw] md:text-[17vw] lg:text-[12vw] font-bold text-jeton-green leading-[0.9] text-center z-10"
    >
      Unify your
      <br />
      finances
    </motion.h2>
  );
}
