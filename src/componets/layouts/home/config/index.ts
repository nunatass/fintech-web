// Animation variants for hero section
export const HERO_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  },
  line: {
    hidden: { 
      opacity: 0, 
      y: 60,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
  fadeUp: {
    hidden: { 
      opacity: 0, 
      y: 30,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
};

// Features data for features section
export const FEATURES_DATA = [
  {
    id: "01",
    name: "Add",
    title: "Add or send in a few taps",
    description: "Easily add or send money from your account.",
  },
  {
    id: "02",
    name: "Send",
    title: "Send money instantly",
    description: "Transfer funds to anyone, anywhere in seconds.",
  },
  {
    id: "03",
    name: "Method",
    title: "50+ payment methods across Europe",
    description: "Jeton is seamlessly connected with more than 25 countries, and 50 payment methods.",
  },
  {
    id: "04",
    name: "Exchange",
    title: "Exchange currencies instantly",
    description: "Get the best rates when you exchange between currencies.",
  },
  {
    id: "05",
    name: "Cards",
    title: "Virtual & physical cards",
    description: "Get your card and start spending anywhere in the world.",
  },
];

export type Feature = typeof FEATURES_DATA[number];
