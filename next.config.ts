import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Le site est 100 % statique : pas de backend, tout est pré-rendu au build.
  // Vercel sert alors les pages depuis son CDN, ce qui compte pour un trafic
  // mobile TikTok (webview, réseau parfois médiocre).
  reactStrictMode: true,
};

export default nextConfig;
