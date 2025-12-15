"use client";

import { motion, MotionValue, useSpring } from "framer-motion";
import { useTranslations } from "next-intl";

type ActionItemsProps = {
  addY: MotionValue<string>;
  addOpacity: MotionValue<number>;
  addScale: MotionValue<number>;
  sendY: MotionValue<string>;
  sendOpacity: MotionValue<number>;
  sendScale: MotionValue<number>;
  exchangeY: MotionValue<string>;
  exchangeOpacity: MotionValue<number>;
  exchangeScale: MotionValue<number>;
  containerY: MotionValue<string>;
};

const springConfig = {
  stiffness: 300,
  damping: 25,
  mass: 1,
};

export function ActionItems({
  addY,
  addOpacity,
  addScale,
  sendY,
  sendOpacity,
  sendScale,
  exchangeY,
  exchangeOpacity,
  exchangeScale,
  containerY,
}: ActionItemsProps) {
  const t = useTranslations("actions");

  // Apply spring physics to scale for bouncy effect
  const addScaleSpring = useSpring(addScale, springConfig);
  const sendScaleSpring = useSpring(sendScale, springConfig);
  const exchangeScaleSpring = useSpring(exchangeScale, springConfig);

  return (
    <motion.div 
      style={{ y: containerY }}
      className="sticky top-0 h-screen flex flex-col items-center justify-center gap-8 sm:gap-6 md:gap-8 z-30 pointer-events-none"
    >
      <AddItem y={addY} opacity={addOpacity} scale={addScaleSpring} label={t("add")} />
      <SendItem y={sendY} opacity={sendOpacity} scale={sendScaleSpring} label={t("send")} />
      <PaymentsItem y={exchangeY} opacity={exchangeOpacity} scale={exchangeScaleSpring} label={t("payments")} />
    </motion.div>
  );
}

type ItemProps = {
  y: MotionValue<string>;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  label: string;
};

function AddItem({ y, opacity, scale, label }: ItemProps) {
  return (
    <motion.div
      style={{ y, opacity, scale }}
      className="flex items-center gap-3 md:gap-4"
    >
      <div className="w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-jeton-green flex items-center justify-center">
        <span className="text-white text-3xl md:text-5xl font-light">+</span>
      </div>
      <span className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-bold text-jeton-green leading-none">
        {label}
      </span>
    </motion.div>
  );
}

function SendItem({ y, opacity, scale, label }: ItemProps) {
  return (
    <motion.div
      style={{ y, opacity, scale }}
      className="flex items-center gap-3 md:gap-4"
    >
      <div className="w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-black flex items-center justify-center">
        <svg className="w-7 h-7 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
        </svg>
      </div>
      <span className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-bold text-black leading-none">
        {label}
      </span>
    </motion.div>
  );
}

function PaymentsItem({ y, opacity, scale, label }: ItemProps) {
  return (
    <motion.div
      style={{ y, opacity, scale }}
      className="flex items-center gap-3 md:gap-4"
    >
      <div className="w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-rose-500 flex items-center justify-center">
        <svg className="w-7 h-7 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/>
        </svg>
      </div>
      <span className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-bold text-rose-500 leading-none">
        {label}
      </span>
    </motion.div>
  );
}
