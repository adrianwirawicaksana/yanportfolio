import type { Metadata } from "next";
import "@/app/globals.css";
import localFont from "next/font/local";
import RootLayoutClient from "./layout-client";

const minguwestFont = localFont({
  src: "../public/fonts/Minguwest.otf", 
 variable: "--font-minguwest",       
  display: "swap",                       
});

export const metadata: Metadata = {
  title: "PokemonTCG - Buy, Sell & Trade Pokemon Cards",
  description: "Discover and collect rare Pokemon trading cards. Buy, sell, and trade Pokemon TCG cards with our interactive marketplace. Join the community of collectors today!",
  keywords: "Pokemon TCG, Pokemon cards, trading cards, collectibles, marketplace",
  openGraph: {
    title: "PokemonTCG - Pokemon Trading Cards Marketplace",
    description: "Buy, sell, and trade authentic Pokemon trading cards in our secure marketplace.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${minguwestFont.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning className="antialiased bg-gray-50 text-gray-900 flex flex-col min-h-screen">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}