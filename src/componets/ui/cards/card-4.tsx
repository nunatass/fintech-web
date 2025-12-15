"use client";

import Image from "next/image";
import card4Image from "@/assets/images/unify/card-4.jpeg";

export function Card4() {
  return (
    <div className="w-44 h-64 sm:w-52 sm:h-72 md:w-60 md:h-80 lg:w-72 lg:h-96 rounded-2xl sm:rounded-3xl bg-[#1a1a1a] shadow-lg shadow-black/10 overflow-hidden">
      <Image
        src={card4Image}
        alt="Transaction history"
        className="w-full h-full object-cover object-top"
        priority
      />
    </div>
  );
}
