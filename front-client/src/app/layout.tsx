import type { Metadata } from "next";
import { Montserrat, Barlow } from "next/font/google";
import "./globals.css";
import HeaderMobile from "@/components/HeaderMobile";
import NavBarMobile from "@/components/NavBarMobile";
import NavBarDesktop from "@/components/NavBarDesktop";

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
        className={`${montserrat.variable} ${barlow.variable} antialiased`}
      >
        {/* header mobile */}
        <HeaderMobile/>
        {/* navbar desktop */}
        <NavBarDesktop/>

        
        {children}
        <NavBarMobile />
      </body>
    </html>
  );
}
