"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

const featureKeys = ["add", "send", "method", "exchange", "cards"] as const;

type FeaturesProgressProps = {
  scrollYProgress: MotionValue<number>;
};

export function FeaturesProgress({ scrollYProgress }: FeaturesProgressProps) {
  const t = useTranslations("features");

  return (
    <div className="absolute bottom-8 left-6 md:left-10 lg:left-16 flex items-center gap-3">
      {featureKeys.map((key, index) => (
        <ProgressIndicator
          key={key}
          id={String(index + 1).padStart(2, "0")}
          name={t(`${key}.name`)}
          index={index}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}

type ProgressIndicatorProps = {
  id: string;
  name: string;
  index: number;
  scrollYProgress: MotionValue<number>;
};

function ProgressIndicator({ id, name, index, scrollYProgress }: ProgressIndicatorProps) {
  const opacity = useTransform(
    scrollYProgress,
    [index * 0.2, index * 0.2 + 0.1],
    [0.4, 1]
  );
  const nameOpacity = useTransform(
    scrollYProgress,
    [index * 0.2, index * 0.2 + 0.1],
    [0, 1]
  );

  return (
    <motion.div className="flex items-center gap-2">
      <motion.span
        style={{ opacity }}
        className="w-8 h-8 rounded-full border-2 border-white/40 flex items-center justify-center text-sm text-white/80"
      >
        {id}
      </motion.span>
      <motion.span
        style={{ opacity: nameOpacity }}
        className="text-sm text-white font-medium"
      >
        {name}
      </motion.span>
    </motion.div>
  );
}
