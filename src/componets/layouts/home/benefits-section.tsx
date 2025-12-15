"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import image1 from "@/assets/images/1.jpg";
import { IPhoneCard } from "@/componets/ui/iphone-card";

const cards = [
  { 
    id: 1, 
    videoSrc: "/hero.mp4", 
    color: "#000000",
    title: "Contactless payments",
    description: "Get a debit card to spend online, at the checkout, and to withdraw cash in the currency you need right away.",
    ctaText: "Get your card",
    titleSize: "text-5xl lg:text-7xl"
  },
  { 
    id: 2, 
    imageSrc: image1.src, 
    color: "#ffffff",
    title: "Send money instantly",
    description: "Transfer funds to friends and family in seconds, no matter where they are. Split bills, request money, and get paid back fast.",
    ctaText: "Start sending",
    titleSize: "text-5xl lg:text-7xl"
  },
  { 
    id: 3, 
    videoSrc: "/hero-video1.mp4", 
    color: "#000000",
    title: "Spend abroad like a local",
    description: "Get real exchange rates with no hidden fees. Withdraw cash from ATMs worldwide and spend in over 150 currencies with your card.",
    ctaText: "Travel with us",
    titleSize: "text-5xl lg:text-7xl"
  },
];

const textVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? "100vh" : "-100vh",
    opacity: 1,
  }),
  center: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] as any }
  },
  exit: (direction: number) => ({
    y: direction > 0 ? "-100vh" : "100vh",
    opacity: 1,
    transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] as any }
  }),
};

export function BenefitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || isAnimating) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress within the section
      const scrollStart = -rect.top;
      const scrollRange = sectionHeight - viewportHeight;
      const progress = Math.max(0, Math.min(1, scrollStart / scrollRange));
      
      // Calculate which card should be active
      const total = cards.length;
      const step = 1 / total;
      const newIndex = Math.min(Math.floor(progress / step), total - 1);
      
      if (newIndex !== activeIndex) {
        setDirection(newIndex > activeIndex ? 1 : -1);
        setActiveIndex(newIndex);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 600);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex, isAnimating]);

  const activeCard = cards[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="app"
      className="relative h-[300vh] bg-jeton-green"
      aria-label="Benefits section"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {/* Mobile Text Area - Title (Top) */}
        <div className="md:hidden absolute top-[15%] left-0 right-0 pointer-events-none z-10 px-6">
            <AnimatePresence mode="wait">
                <motion.div
                    key={`mobile-top-${activeIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-black leading-tight tracking-tight">
                        {activeCard.title}
                    </h2>
                </motion.div>
            </AnimatePresence>
        </div>

        {/* Mobile Text Area - Description (Bottom) */}
        <div className="md:hidden absolute bottom-[15%] left-0 right-0 pointer-events-none z-10 px-6">
            <AnimatePresence mode="wait">
                <motion.div
                    key={`mobile-bottom-${activeIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <p className="text-sm sm:text-base text-black/80 leading-relaxed">
                        {activeCard.description}
                    </p>
                </motion.div>
            </AnimatePresence>
        </div>
        
        {/* Left Text Area - Title (Desktop) */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-1/2 pointer-events-none z-10">
            <AnimatePresence custom={direction}>
                <motion.div
                    key={`left-${activeIndex}`}
                    custom={direction}
                    variants={textVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute top-1/2 -translate-y-1/2 right-[180px] lg:right-[210px] xl:right-[240px] text-right max-w-sm"
                >
                    <h2 className={`${activeCard.titleSize || "text-4xl lg:text-5xl"} font-bold text-black leading-tight tracking-tight whitespace-pre-line`}>
                        {activeCard.title}
                    </h2>
                </motion.div>
            </AnimatePresence>
        </div>

        {/* Right Text Area - Description & CTA (Desktop) */}
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none z-10">
            <AnimatePresence custom={direction}>
                <motion.div
                    key={`right-${activeIndex}`}
                    custom={direction}
                    variants={textVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute top-1/2 -translate-y-1/2 left-[180px] lg:left-[210px] xl:left-[240px] text-left max-w-xs flex flex-col items-start pointer-events-auto"
                >
                    <p className="text-base lg:text-lg text-black/80 leading-relaxed mb-6">
                        {activeCard.description}
                    </p>
                    <motion.button 
                        onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
                        className="relative cursor-pointer overflow-hidden px-6 py-3 text-sm font-medium rounded-xl flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 bg-transparent text-black border-2 border-black/50 hover:border-black/70 hover:bg-black/10 focus:ring-black/40 focus:ring-offset-jeton-green transition-colors"
                        whileHover={{ scale: 0.97 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
                    >
                        {activeCard.ctaText}
                    </motion.button>
                </motion.div>
            </AnimatePresence>
        </div>

        <div className="relative w-[180px] sm:w-[240px] md:w-[260px] lg:w-[280px] xl:w-[300px] 2xl:w-[360px] aspect-[369/777] rounded-[28px] sm:rounded-[38px] md:rounded-[42px] lg:rounded-[46px] xl:rounded-[50px] 2xl:rounded-[56px] overflow-hidden transform-gpu">
            {cards.map((card, index) => (
            <IPhoneCard 
                key={card.id} 
                index={index} 
                total={cards.length} 
                activeIndex={activeIndex}
                videoSrc={card.videoSrc}
                imageSrc={card.imageSrc}
                color={card.color}
            />
            ))}
        </div>
      </div>
    </section>
  );
}
