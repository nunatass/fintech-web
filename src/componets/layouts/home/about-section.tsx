"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

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

export function AboutSection() {
  const t = useTranslations("about");

  return (
    <section id="about" className="relative bg-white py-16 md:py-24 lg:py-32 overflow-x-hidden">
      <div className="px-6 md:px-10 lg:px-12 xl:px-16">
        {/* Large Plexo Title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="mb-12 md:mb-16 lg:mb-20 -mx-6 md:-mx-10 lg:-mx-12 xl:-mx-16"
        >
          <h2 className="w-full text-center text-[40vw] sm:text-[38vw] md:text-[35vw] lg:text-[32vw] font-bold text-jeton-green leading-none tracking-[0.01em] md:tracking-[0.03em] lg:tracking-[0.05em] pr-6 md:px-10 lg:px-12 xl:px-16">
            Plexo
          </h2>
        </motion.div>

        {/* Regulatory Text */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="mb-16 md:mb-20 lg:mb-24"
        >
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            {t("regulatory.text1")}
          </p>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-4">
            {t("regulatory.text2")}
          </p>
        </motion.div>

        {/* Partnership Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Card 1 - Partnership */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="relative h-[300px] md:h-[350px] lg:h-[400px] rounded-3xl overflow-hidden bg-gradient-to-br from-jeton-green/90 to-jeton-green"
          >
            {/* Background Image Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-jeton-green/80 to-jeton-green/60" />
            
            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-8 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                {/* Logo placeholder - you can replace with actual logo */}
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm" />
                <div>
                  <p className="text-white/80 text-sm">{t("partnerships.card1.label")}</p>
                  <h3 className="text-white text-xl md:text-2xl font-bold">
                    {t("partnerships.card1.title")}
                  </h3>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2 - Brand Ambassadors */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="relative h-[300px] md:h-[350px] lg:h-[400px] rounded-3xl overflow-hidden bg-gradient-to-br from-jeton-green to-jeton-green/90"
          >
            {/* Background Image Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-jeton-green/60 to-jeton-green/80" />
            
            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-8 md:p-10">
              <div>
                <p className="text-white/80 text-sm mb-2">{t("partnerships.card2.label")}</p>
                <h3 className="text-white text-xl md:text-2xl font-bold">
                  {t("partnerships.card2.title")}
                </h3>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
