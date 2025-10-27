import type { Metadata } from "next";
import { Montserrat, Barlow } from "next/font/google";
import "./globals.css";
import HeaderMobile from "@/components/HeaderMobile";
import Footer from "@/components/Footer";
import NavBarMobile from "@/components/NavBarMobile";
import NavBarDesktop from "@/components/NavBarDesktop";
import SocialMediaBarDesktop from "@/components/SocialMediaBarDesktop";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "700", "900"]
});

export const metadata: Metadata = {
  title: "ZOMBIELAND",
  description: "Bienvenue sur le site de ZombieLand, parc d'attractions immersif",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${montserrat.variable} ${barlow.variable} antialiased flex flex-col min-h-screen`}
      >
        {/* header mobile */}
        <HeaderMobile/>
        {/* navbar desktop */}
        <NavBarDesktop/>
        {/* social media bar en haut */}
        <SocialMediaBarDesktop/>
        <main className="grow md:ml-[20%] md:w-[80%] mt-15 md:mt-0 bg-neutral-700">
          {children}
        </main>
        {/* Barre de navigation mobile en bas d'écran */}
        <NavBarMobile />
        {/* footer */}
        <Footer />
      </body>
    </html>
  );
}
