"use client";

import { motion, MotionValue } from "framer-motion";
import { FEATURES_DATA } from "../config";

type FeaturesContentProps = {
  featureOpacities: MotionValue<number>[];
  featureYs: MotionValue<string>[];
};

export function FeaturesContent({ featureOpacities, featureYs }: FeaturesContentProps) {
  return (
    <div className="relative flex-1 max-w-xl">
      {/* Line accent */}
      <div className="w-16 h-1 bg-white/30 mb-6 hidden lg:block" />

      {/* Feature texts - stacked with animations */}
      <div className="relative h-40 md:h-48">
        {FEATURES_DATA.map((feature, index) => (
          <motion.div
            key={feature.id}
            style={{
              opacity: featureOpacities[index],
              y: featureYs[index],
            }}
            className="absolute inset-0"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
              {feature.title}
            </h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
