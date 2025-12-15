"use client";

import { useTranslations } from "next-intl";
import image1 from "@/assets/images/1.jpg";

export function BenefitsSection() {
  const t = useTranslations("appSection");

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

  return (
    <section
      id="app"
      className="relative bg-jeton-green"
      aria-label="App features section"
    >
      {/* Desktop Layout */}
      <div className="hidden md:block">
        {cards.map((card, index) => (
          <div 
            key={card.id}
            className="min-h-screen flex items-center justify-between px-12 lg:px-20 xl:px-32 py-20"
          >
            {/* Left side - iPhone with mask */}
            <div className="w-[45%] flex items-center justify-center">
              <div 
                className="relative w-[350px] h-[700px] rounded-[3rem] bg-black shadow-2xl overflow-hidden"
                style={{
                  clipPath: "inset(0 0 0 0 round 3rem)"
                }}
              >
                {/* iPhone notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-10" />
                
                {/* Content - shows through the mask */}
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
            </div>

            {/* Right side - Text content (scrolls normally) */}
            <div className="w-[45%] space-y-6">
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
          </div>
        ))}
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {cards.map((card, index) => (
          <div 
            key={card.id}
            className="min-h-screen flex flex-col items-center justify-center px-6 py-20 gap-8"
          >
            {/* iPhone */}
            <div className="relative w-[280px] h-[560px] rounded-[2.5rem] bg-black shadow-2xl overflow-hidden">
              {/* iPhone notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-10" />
              
              {/* Content */}
              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden">
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

            {/* Text content */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                {card.title}
              </h2>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                {card.description}
              </p>
              <button className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-colors">
                {card.ctaText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
