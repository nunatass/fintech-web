"use client";

import { motion, MotionValue } from "framer-motion";
import { useTranslations } from "next-intl";

type UnifyTitleProps = {
  scale: MotionValue<number>;
  y: MotionValue<string>;
  opacity: MotionValue<number>;
};

export function UnifyTitle({ scale, y, opacity }: UnifyTitleProps) {
  const t = useTranslations("unify");

  return (
    <motion.h2
      style={{ scale, y, opacity }}
      className="text-[20vw] md:text-[17vw] lg:text-[12vw] font-bold text-jeton-green leading-[0.9] text-center z-10"
    >
      {t("title.line1")}
      <br />
      {t("title.line2")}
    </motion.h2>
  );
}
