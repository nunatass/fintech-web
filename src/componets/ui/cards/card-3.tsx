"use client";

import Image from "next/image";
import card3Image from "@/assets/images/unify/card-3.png";

export function Card3() {
  return (
    <div className="w-44 h-64 sm:w-52 sm:h-72 md:w-60 md:h-80 lg:w-72 lg:h-96 rounded-2xl sm:rounded-3xl bg-blue-600 shadow-lg shadow-black/10 overflow-hidden">
      <Image
        src={card3Image}
        alt="Scan Cash Code"
        className="w-full h-full object-cover"
        priority
      />
    </div>
  );
}
