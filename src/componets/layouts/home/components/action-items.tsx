"use client";

import { motion, MotionValue } from "framer-motion";

type ActionItemsProps = {
  addY: MotionValue<string>;
  addOpacity: MotionValue<number>;
  sendY: MotionValue<string>;
  sendOpacity: MotionValue<number>;
  exchangeY: MotionValue<string>;
  exchangeOpacity: MotionValue<number>;
};

export function ActionItems({
  addY,
  addOpacity,
  sendY,
  sendOpacity,
  exchangeY,
  exchangeOpacity,
}: ActionItemsProps) {
  return (
    <div className="sticky top-0 h-screen flex flex-col items-center justify-center gap-2 md:gap-4 z-30 pointer-events-none">
      <AddItem y={addY} opacity={addOpacity} />
      <SendItem y={sendY} opacity={sendOpacity} />
      <ExchangeItem y={exchangeY} opacity={exchangeOpacity} />
    </div>
  );
}

type ItemProps = {
  y: MotionValue<string>;
  opacity: MotionValue<number>;
};

function AddItem({ y, opacity }: ItemProps) {
  return (
    <motion.div
      style={{ y, opacity }}
      className="flex items-center gap-3 md:gap-4"
    >
      <div className="w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-emerald-500 flex items-center justify-center">
        <span className="text-white text-3xl md:text-5xl font-light">+</span>
      </div>
      <span className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-bold text-emerald-500 leading-none">
        Add
      </span>
    </motion.div>
  );
}

function SendItem({ y, opacity }: ItemProps) {
  return (
    <motion.div
      style={{ y, opacity }}
      className="flex items-center gap-3 md:gap-4"
    >
      <div className="w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-blue-500 flex items-center justify-center">
        <svg className="w-7 h-7 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
        </svg>
      </div>
      <span className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-bold text-blue-500 leading-none">
        Send
      </span>
    </motion.div>
  );
}

function ExchangeItem({ y, opacity }: ItemProps) {
  return (
    <motion.div
      style={{ y, opacity }}
      className="flex items-center gap-3 md:gap-4"
    >
      <div className="w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-rose-500 flex items-center justify-center">
        <svg className="w-7 h-7 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/>
        </svg>
      </div>
      <span className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-bold text-rose-500 leading-none">
        Exchange
      </span>
    </motion.div>
  );
}
