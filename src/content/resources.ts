/**
 * Contenu typé plutôt qu'un CMS : pas de backend à maintenir, et TypeScript
 * refuse un build si une ressource est mal formée avant d'arriver en prod.
 */
export type Resource = {
  /** Identifiant stable, sert de clé React. */
  id: string;
  title: string;
  description: string;
  /** Lien interne ("/...") ou externe ("https://..."). */
  href: string;
  /** Petite étiquette de catégorie affichée sur la carte. */
  tag: string;
  /** Valeur technique mise en avant (affichée en mono). Optionnelle. */
  highlight?: string;
};

export const resources: readonly Resource[] = [
  {
    id: "reglages-4k",
    title: "Réglages pour des vidéos 4K",
    description:
      "Les paramètres exacts utilisés pour exporter des vidéos nettes sur TikTok.",
    href: "/reglages-4k",
    tag: "Tutoriel",
    highlight: "4K",
  },
];
