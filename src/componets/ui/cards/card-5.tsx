"use client";

import Image from "next/image";
import card5Image from "@/assets/images/unify/card-5.png";

export function Card5() {
  return (
    <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-2xl sm:rounded-3xl bg-[#f5f5f5] shadow-lg shadow-black/10 overflow-hidden">
      <Image
        src={card5Image}
        alt="Distributions"
        className="w-full h-full object-cover"
        priority
      />
    </div>
  );
}
