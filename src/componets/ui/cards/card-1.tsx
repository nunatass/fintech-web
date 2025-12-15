"use client";

import Image from "next/image";
import card1Image from "@/assets/images/unify/card-1.png";

export function Card1() {
  return (
    <div className="w-32 h-36 sm:w-40 sm:h-44 md:w-52 md:h-56 lg:w-64 lg:h-72 rounded-2xl sm:rounded-3xl bg-jeton-green shadow-lg shadow-black/10 overflow-hidden">
      <Image
        src={card1Image}
        alt="Spending overview"
        className="w-full h-full object-cover object-top"
        priority
      />
    </div>
  );
}
