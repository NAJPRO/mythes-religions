import type { Metadata, Viewport } from "next";
import { Cinzel, Inter, IBM_Plex_Mono } from "next/font/google";
import { Atmosphere } from "@/components/layout/Atmosphere";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";

// next/font auto-héberge les polices au build : pas de requête vers Google au
// runtime (RGPD, et un affichage plus rapide dans la webview TikTok).
// display: "swap" garde le texte visible pendant le chargement.
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: `${site.name} — Liens & ressources`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = {
  // Colore la barre du navigateur mobile pour prolonger le fond sombre.
  themeColor: "#0a0806",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${cinzel.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <Atmosphere />
        <MotionProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
