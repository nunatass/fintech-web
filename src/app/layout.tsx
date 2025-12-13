import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jeton - One App For All Your Payment Needs",
  description:
    "Single account for all your payments. Send money, exchange currencies, and manage your finances with ease. Join 1M+ happy users today.",
  keywords: [
    "payments",
    "money transfer",
    "fintech",
    "digital wallet",
    "currency exchange",
    "financial app",
  ],
  authors: [{ name: "Jeton" }],
  openGraph: {
    title: "Jeton - One App For All Your Payment Needs",
    description: "Single account for all your payments.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeton - One App For All Your Payment Needs",
    description: "Single account for all your payments.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
