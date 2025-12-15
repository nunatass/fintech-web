"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import image1 from "@/assets/images/1.jpg";

export function BenefitsSection() {
  const t = useTranslations("appSection");
  const sectionRef = useRef<HTMLDivElement>(null);

  const cards = [
    { 
      id: 1, 
      videoSrc: "/hero.mp4", 
      color: "#000000",
      title: t("cards.card1.title"),
      description: t("cards.card1.description"),
      ctaText: t("cards.card1.cta"),
    },
    { 
      id: 2, 
      imageSrc: image1.src, 
      color: "#ffffff",
      title: t("cards.card2.title"),
      description: t("cards.card2.description"),
      ctaText: t("cards.card2.cta"),
    },
    { 
      id: 3, 
      videoSrc: "/hero-video1.mp4", 
      color: "#000000",
      title: t("cards.card3.title"),
      description: t("cards.card3.description"),
      ctaText: t("cards.card3.cta"),
    },
  ];

  // Track scroll progress through the entire section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Card 1: Visible from start, then wipes away from top
  const card1MaskY = useTransform(scrollYProgress, [0.25, 0.35], ["0%", "100%"]);
  
  // Card 2: Always visible underneath card 1, then wipes away from top
  const card2MaskY = useTransform(scrollYProgress, [0.55, 0.65], ["0%", "100%"]);
  
  // Card 3: Masked in from 0.58 to 0.66, stays visible
  const card3MaskY = useTransform(scrollYProgress, [0.58, 0.66], ["100%", "100%"]);

  // Text animations - fade in/out based on active card
  const text1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.35], [0, 1, 1, 0]);
  const text2Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.55, 0.65], [0, 1, 1, 0]);
  const text3Opacity = useTransform(scrollYProgress, [0.6, 0.7, 0.9, 1], [0, 1, 1, 1]);

  return (
    <section
      ref={sectionRef}
      id="app"
      className="relative h-[400vh] bg-jeton-green"
      aria-label="App features section"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Desktop Layout */}
        <div className="hidden md:flex w-full h-full items-center justify-between px-12 lg:px-20 xl:px-32">
          {/* Left side - iPhone stack with masks */}
          <div className="relative w-[45%] h-full flex items-center justify-center">
            {/* Card 3 - Bottom layer (always visible) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <IPhoneContent card={cards[2]} />
            </div>

            {/* Card 2 - Middle layer (wipes away to reveal card 3) */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              style={{
                clipPath: useTransform(
                  card2MaskY,
                  (value) => `inset(${value} 0 0 0)`
                )
              }}
            >
              <IPhoneContent card={cards[1]} />
            </motion.div>

            {/* Card 1 - Top layer (wipes away to reveal card 2) */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              style={{
                clipPath: useTransform(
                  card1MaskY,
                  (value) => `inset(${value} 0 0 0)`
                )
              }}
            >
              <IPhoneContent card={cards[0]} />
            </motion.div>
          </div>

          {/* Right side - Text content */}
          <div className="relative w-[45%] h-full flex items-center">
            {/* Text 1 */}
            <motion.div 
              className="absolute inset-0 flex flex-col justify-center"
              style={{ opacity: text1Opacity }}
            >
              <TextContent card={cards[0]} />
            </motion.div>

            {/* Text 2 */}
            <motion.div 
              className="absolute inset-0 flex flex-col justify-center"
              style={{ opacity: text2Opacity }}
            >
              <TextContent card={cards[1]} />
            </motion.div>

            {/* Text 3 */}
            <motion.div 
              className="absolute inset-0 flex flex-col justify-center"
              style={{ opacity: text3Opacity }}
            >
              <TextContent card={cards[2]} />
            </motion.div>
          </div>
        </div>

        {/* Mobile Layout - Keep existing simple version */}
        <div className="md:hidden w-full h-full flex flex-col items-center justify-center px-6 relative">
          {/* Mobile content here - simplified version */}
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">{cards[0].title}</h2>
            <p className="text-lg opacity-90">{cards[0].description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// iPhone content component
function IPhoneContent({ card }: { card: any }) {
  return (
    <div className="relative w-[350px] h-[700px] rounded-[3rem] bg-black shadow-2xl overflow-hidden">
      {/* iPhone notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-10" />
      
      {/* Content */}
      <div className="absolute inset-0 rounded-[3rem] overflow-hidden">
        {card.videoSrc ? (
          <video
            src={card.videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={card.imageSrc}
            alt={card.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
}

// Text content component
function TextContent({ card }: { card: any }) {
  return (
    <div className="space-y-6">
      <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
        {card.title}
      </h2>
      <p className="text-lg lg:text-xl text-white/90 leading-relaxed max-w-xl">
        {card.description}
      </p>
      <button className="px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:bg-white/90 transition-colors">
        {card.ctaText}
      </button>
    </div>
  );
}
