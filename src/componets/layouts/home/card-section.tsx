"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

// Placeholder images - replace with actual images
const cardImages = [
  "/images/card-showcase-1.png",
  "/images/card-showcase-2.png",
  "/images/card-showcase-3.png",
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as any,
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const featureItem = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as any,
    }
  }
};

export function CardSection() {
  const t = useTranslations("cardSection");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-change images in loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % cardImages.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="app-section" className="relative bg-white py-16 md:py-24 lg:py-32">
      {/* Card Showcase Section */}
      <div className="px-6 md:px-10 lg:px-12 xl:px-16 mb-24 md:mb-32 lg:mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image carousel - Instagram reels style */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="relative w-[280px] md:w-[320px] lg:w-[350px] h-[450px] md:h-[520px] lg:h-[580px] mx-auto lg:mx-0 overflow-hidden rounded-3xl bg-gray-100"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.32, 0.72, 0, 1],
                }}
                className="absolute inset-0"
              >
                {/* Placeholder - replace with actual Image component */}
                <div className="w-full h-full bg-gradient-to-br from-pink-200 to-pink-400 flex items-center justify-center">
                  <span className="text-white text-xl font-medium">
                    Card Image {currentImageIndex + 1}
                  </span>
                </div>
                {/* Uncomment when you have actual images:
                <Image
                  src={cardImages[currentImageIndex]}
                  alt="Card showcase"
                  fill
                  className="object-cover"
                />
                */}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Content */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="lg:pl-8"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-[0.95] tracking-tight mb-6"
            >
              {t("card.title")}
            </motion.h2>
            
            {/* Feature list */}
            <motion.div variants={staggerContainer} className="space-y-3 mb-8">
              <motion.p variants={featureItem} className="text-lg md:text-xl text-gray-600">
                {t("card.features.contactless")}
              </motion.p>
              <motion.p variants={featureItem} className="text-lg md:text-xl text-gray-600">
                {t("card.features.limits")}
              </motion.p>
              <motion.p variants={featureItem} className="text-lg md:text-xl text-gray-600">
                {t("card.features.freezing")}
              </motion.p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-jeton-green text-white font-semibold rounded-full hover:bg-jeton-green/90 transition-colors">
                {t("card.cta")}
              </button>
              <button className="px-8 py-4 text-black font-semibold underline underline-offset-4 hover:text-gray-600 transition-colors">
                {t("card.learnMore")}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Move Money Worldwide Section */}
      <div className="px-6 md:px-10 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Video placeholder */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="relative w-[280px] md:w-[320px] lg:w-[350px] h-[450px] md:h-[520px] lg:h-[580px] mx-auto lg:mx-0 overflow-hidden rounded-3xl bg-gray-100 order-2 lg:order-1"
          >
            {/* Placeholder - replace with actual video */}
            <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-300 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/80 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="text-gray-600 font-medium">Video Placeholder</span>
              </div>
            </div>
            {/* Uncomment when you have actual video:
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/videos/move-money.mp4" type="video/mp4" />
            </video>
            */}
          </motion.div>

          {/* Content */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="lg:pr-8 order-1 lg:order-2"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-[0.95] tracking-tight mb-6"
            >
              {t("moveMoney.title")}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-600 mb-8"
            >
              {t("moveMoney.description")}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-jeton-green text-white font-semibold rounded-full hover:bg-jeton-green/90 transition-colors">
                {t("moveMoney.cta")}
              </button>
              <button className="px-8 py-4 text-black font-semibold underline underline-offset-4 hover:text-gray-600 transition-colors">
                {t("moveMoney.learnMore")}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
