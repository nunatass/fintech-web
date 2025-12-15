"use client";

import Image from "next/image";
import card2Image from "@/assets/images/unify/card-2.png";

export function Card2() {
  return (
    <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-2xl sm:rounded-3xl bg-white shadow-lg shadow-black/10 overflow-hidden flex items-center justify-center">
      <Image
        src={card2Image}
        alt="Savings balance"
        className="w-full h-full object-cover scale-110"
        priority
      />
    </div>
  );
}
