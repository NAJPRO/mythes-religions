/** Constantes du site, centralisées pour ne les modifier qu'à un endroit. */

/**
 * URL absolue du site, nécessaire aux métadonnées (Open Graph exige des URLs
 * absolues). Vercel injecte l'URL de production au build : pas de domaine à
 * recopier à la main, et ça suivra un futur domaine personnalisé.
 */
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const siteUrl = new URL(vercelHost ? `https://${vercelHost}` : "http://localhost:3000");

export const site = {
  name: "Mythes et Religions",
  handle: "@mythes_religions",
  tiktokUrl: "https://www.tiktok.com/@mythes_religions",
  description:
    "Mythes, légendes et récits d'horreur racontés en voix off. Retrouve ici tous les liens et ressources partagés en commentaire sur TikTok.",
} as const;
