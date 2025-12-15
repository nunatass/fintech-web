"use client";

import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import image1 from "@/assets/images/1.jpg";

export function AppSection() {
  const t = useTranslations("appSection");
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Pre-calculate all transforms to avoid conditional hook calls
  const cardTransforms = cards.map((card, index) => {
    const cardStart = index / cards.length;
    const cardMid = index === 0 
      ? 0.5 / cards.length 
      : (cardStart + (index + 1) / cards.length) / 2;
    
    const yStart = index === 0 ? "0%" : "100%";
    const y = useTransform(
      scrollYProgress,
      [cardStart, cardMid, 1],
      [yStart, "0%", "0%"]
    );

    const nextCardStart = (index + 1) / cards.length;
    const overlayOpacity = useTransform(
      scrollYProgress,
      [nextCardStart, Math.min(1, nextCardStart + 0.1)],
      [0, 1]
    );

    return { y, overlayOpacity };
  });

  // Check if app section is in view - hide if less than 30% visible to prevent overlap
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only show iPhone if more than 30% of section is visible
        // This prevents overlap with other sections
        setIsInView(entry.isIntersecting && entry.intersectionRatio >= 0.3);
      },
      { 
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: '0px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Auto-scroll trigger after user stops scrolling - ONE SECTION AT A TIME
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    let isAutoScrolling = false;
    let lastScrollY = window.scrollY;
    let lastDirection: 'up' | 'down' | null = null;

    const handleScroll = () => {
      if (!containerRef.current || isAutoScrolling) return;
      
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        lastDirection = 'down';
      } else if (currentScrollY < lastScrollY) {
        lastDirection = 'up';
      }
      lastScrollY = currentScrollY;

      // Clear previous timeout
      clearTimeout(scrollTimeout);
      
      // After scroll stops, snap to ONE next/previous section only
      scrollTimeout = setTimeout(() => {
        if (!lastDirection || isAutoScrolling) return;
        
        const sections = containerRef.current?.querySelectorAll('[data-section-index]');
        if (!sections) return;

        const viewportCenter = window.innerHeight / 2;
        
        // Find current section that's most centered
        let currentIdx = 0;
        let closestDistance = Infinity;
        
        sections.forEach((section, index) => {
          const rect = section.getBoundingClientRect();
          const sectionCenter = rect.top + rect.height / 2;
          const distance = Math.abs(sectionCenter - viewportCenter);
          
          if (distance < closestDistance) {
            closestDistance = distance;
            currentIdx = index;
          }
        });
        
        // Move ONLY one section in the direction of scroll
        let targetIndex = currentIdx;
        if (lastDirection === 'down' && currentIdx < cards.length - 1) {
          targetIndex = currentIdx + 1;
        } else if (lastDirection === 'up' && currentIdx > 0) {
          targetIndex = currentIdx - 1;
        }
        
        // Only scroll if we're actually changing sections
        if (targetIndex !== currentIdx) {
          const targetSection = sections[targetIndex] as HTMLElement;
          if (targetSection) {
            isAutoScrolling = true;
            
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            setTimeout(() => {
              isAutoScrolling = false;
              lastDirection = null;
            }, 1000);
          }
        } else {
          lastDirection = null;
        }
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [cards.length]);

  return (
    <section
      id="app"
      className="relative bg-jeton-green overflow-hidden"
      aria-label="App features section"
    >
      {/* Desktop Layout */}
      <div className="hidden md:block relative" ref={containerRef}>
        {/* Fixed iPhone in center - only visible when app section is >10% in view */}
        {isInView && (
          <div className="fixed top-0 left-1/2 -translate-x-1/2 h-screen flex items-center justify-center pointer-events-none z-10">
          <div className="relative w-[260px] md:w-[260px] lg:w-[260px] xl:w-[300px]">
                {/* Media Container */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <div className="relative w-full" style={{ paddingTop: '210.57%' }}>
                    <div 
                      className="absolute inset-0 w-full h-full overflow-hidden"
                      style={{
                        clipPath: 'inset(0.1% 0.1% 0.1% 0.1% round 15.7% / 7.5%)',
                      }}
                    >
                      {cards.map((card, index) => {
                        const { y, overlayOpacity } = cardTransforms[index];

                        return (
                          <motion.div
                            key={card.id}
                            style={{ 
                              y,
                              zIndex: index * 2
                            }}
                            className="absolute inset-0 w-full h-full"
                          >
                            {/* Content */}
                            <div className="relative w-full h-full">
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
                              
                              {/* Blur overlay based on scroll */}
                              {index < cards.length - 1 && (
                                <motion.div
                                  style={{ 
                                    opacity: overlayOpacity,
                                    zIndex: index * 2 + 1
                                  }}
                                  className="absolute inset-0 bg-white/20 backdrop-blur-md"
                                />
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                {/* iPhone Frame SVG */}
                <svg
                  width="369"
                  height="777"
                  viewBox="0 0 369 777"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative z-10 w-full h-auto"
                >
                  <g clipPath="url(#clip0_app)">
                    <g>
                      <rect
                        x="2"
                        y="2"
                        width="365"
                        height="773"
                        rx="56"
                        stroke="url(#paint0_radial_app)"
                        strokeWidth="4"
                      />
                    </g>
                  </g>
                  <defs>
                    <radialGradient
                      id="paint0_radial_app"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(184.965 179.272) rotate(90) scale(318.289 352.568)"
                    >
                      <stop stopColor="#879194" />
                      <stop offset="1" />
                    </radialGradient>
                    <clipPath id="clip0_app">
                      <rect width="369" height="777" rx="58" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
          </div>
        </div>
        )}

        {/* Scrollable sections container */}
        <div className="relative" style={{ height: `${cards.length * 100}vh` }}>
          {/* 3 separate sections with text */}
          <div className="relative w-full h-full pointer-events-auto">
            {cards.map((card, index) => (
              <div 
                key={card.id}
                data-section-index={index}
                className="h-screen w-full flex items-center justify-between px-6 md:px-12 lg:px-20 xl:px-32"
              >
                {/* Desktop: 3 columns */}
                <div className="hidden md:flex w-full items-center justify-between gap-8">
                  {/* Left: Title */}
                  <div className="w-[30%] lg:w-[32%]">
                    <h2 className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white leading-tight">
                      {card.title}
                    </h2>
                  </div>

                  {/* Center: iPhone (empty space, iPhone is sticky above) */}
                  <div className="w-[30%] lg:w-[28%]" />

                  {/* Right: Description + Button */}
                  <div className="w-[30%] lg:w-[32%] space-y-4 lg:space-y-6">
                    <p className="text-base lg:text-lg xl:text-xl text-white/90 leading-relaxed">
                      {card.description}
                    </p>
                    <button className="px-6 lg:px-8 py-3 lg:py-4 bg-white text-black rounded-full font-semibold text-base lg:text-lg hover:bg-white/90 transition-colors">
                      {card.ctaText}
                    </button>
                  </div>
                </div>

                {/* Mobile: Title top, description bottom */}
                <div className="flex md:hidden w-full flex-col items-center justify-between h-full py-20">
                  {/* Top: Title */}
                  <div className="text-center space-y-4">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight px-4">
                      {card.title}
                    </h2>
                  </div>

                  {/* Middle: iPhone (sticky above) */}
                  <div />

                  {/* Bottom: Description + Button */}
                  <div className="text-center space-y-4 px-6">
                    <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                      {card.description}
                    </p>
                    <button className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-colors">
                      {card.ctaText}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
