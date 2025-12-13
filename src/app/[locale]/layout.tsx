import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/config";
import "../globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plexo - One App For All Your Payment Needs",
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
  authors: [{ name: "Plexo" }],
  openGraph: {
    title: "Plexo - One App For All Your Payment Needs",
    description: "Single account for all your payments.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plexo - One App For All Your Payment Needs",
    description: "Single account for all your payments.",
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Providing all messages to the client side
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${outfit.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
