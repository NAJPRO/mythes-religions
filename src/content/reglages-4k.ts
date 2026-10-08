/**
 * Contenu de la page /reglages-4k.
 *
 * Tout est ici, rien dans les composants : pour ajouter un logiciel il suffit
 * d'ajouter un objet à `logiciels`. TypeScript impose les 4 règles, donc un
 * logiciel incomplet fait échouer le build au lieu d'afficher une page trouée.
 */

/** Les 4 règles, dans l'ordre de la vidéo. La clé relie le résumé aux étapes de chaque logiciel. */
export type CleRegle = "proxy" | "timeline" | "export" | "nettete";

/** Une valeur technique affichée en ValueChip. */
export type Valeur = {
  /** Ce que mesure la valeur ("Débit cible"). Optionnel quand le contexte suffit. */
  label?: string;
  /** Valeur telle qu'affichée ("65"). */
  valeur: string;
  unite?: string;
  /**
   * Texte envoyé au presse-papiers. On ne le renseigne que pour les valeurs
   * qu'on colle vraiment dans un champ (nombre nu, "3840x2160"). Sans `copie`,
   * pas de bouton : copier une plage "15 – 25" ou "VBR 2 passes" ne sert à rien.
   * Il est distinct de `valeur` car le champ du logiciel attend souvent le
   * nombre seul (65, pas "65 Mbps").
   */
  copie?: string;
};

export type Regle = {
  /** Étapes courtes, une action par ligne : la page doit se scanner en quelques secondes. */
  etapes: string[];
  valeurs: Valeur[];
};

export type Plateforme = "PC/Mac" | "Mobile";

export type Logiciel = {
  /** Sert dans l'URL (?logiciel=slug) : minuscules, sans accent, stable une fois partagé. */
  slug: string;
  nom: string;
  plateforme: Plateforme;
  regles: Record<CleRegle, Regle>;
};

/** Résumé des 4 règles, affiché en cartes numérotées avant le choix du logiciel. */
export type ResumeRegle = {
  cle: CleRegle;
  numero: number;
  titre: string;
  texte: string;
  valeurs: Valeur[];
};

export const resumeRegles: readonly ResumeRegle[] = [
  {
    cle: "proxy",
    numero: 1,
    titre: "Monte en proxy",
    texte: "Ne monte jamais en 4K brut : proxy en 720p pour monter, export en 4K.",
    valeurs: [
      { label: "Montage", valeur: "720p" },
      { label: "Export", valeur: "4K" },
    ],
  },
  {
    cle: "timeline",
    numero: 2,
    titre: "Timeline en 4K",
    texte:
      "Séquence 3840x2160 (paysage) ou 2160x3840 (vertical TikTok). Ne zoome pas au-delà de 120 %.",
    valeurs: [
      { label: "Paysage", valeur: "3840x2160" },
      { label: "Vertical", valeur: "2160x3840" },
      { label: "Zoom max", valeur: "120", unite: "%" },
    ],
  },
  {
    cle: "export",
    numero: 3,
    titre: "Export à 60 Mbps minimum",
    texte: "H.264 ou H.265. Cible 65 Mbps, max 80 Mbps.",
    valeurs: [
      { label: "Minimum", valeur: "60", unite: "Mbps" },
      { label: "Cible", valeur: "65", unite: "Mbps" },
      { label: "Max", valeur: "80", unite: "Mbps" },
    ],
  },
  {
    cle: "nettete",
    numero: 4,
    titre: "Netteté légère",
    texte: "Effet netteté entre 15 et 25, et coche la qualité de rendu maximale.",
    valeurs: [{ label: "Netteté", valeur: "15 – 25" }],
  },
];

export const logiciels: readonly Logiciel[] = [
  {
    slug: "premiere-pro",
    nom: "Premiere Pro",
    plateforme: "PC/Mac",
    regles: {
      proxy: {
        etapes: [
          "Panneau Projet : sélectionne tes rushes.",
          "Clic droit > Proxy > Créer des proxys.",
          "Format H.264, préréglage basse résolution (720p).",
          "Active « Basculer les proxys » dans le moniteur programme.",
          "À l'export, Premiere reprend automatiquement les fichiers originaux.",
        ],
        valeurs: [
          { label: "Format", valeur: "H.264" },
          { label: "Résolution", valeur: "720p" },
        ],
      },
      timeline: {
        etapes: [
          "Séquence > Paramètres de séquence.",
          "Taille de l'image : 3840x2160 (ou 2160x3840 en vertical).",
          "Même cadence que tes rushes (30 ou 60 i/s), pixels carrés.",
          "Options d'effet > Trajectoire : échelle à 120 % maximum.",
        ],
        valeurs: [
          { label: "Paysage", valeur: "3840x2160", copie: "3840x2160" },
          { label: "Vertical", valeur: "2160x3840", copie: "2160x3840" },
          { label: "Cadence", valeur: "30 ou 60", unite: "i/s" },
          { label: "Échelle max", valeur: "120", unite: "%", copie: "120" },
        ],
      },
      export: {
        etapes: [
          "Format H.264 (ou HEVC pour H.265).",
          "Codage du débit : VBR 2 passes.",
          "Débit cible 65 Mbps, débit maximal 80 Mbps.",
          "Coche « Utiliser la qualité de rendu maximale ».",
        ],
        valeurs: [
          { label: "Format", valeur: "H.264" },
          { label: "ou", valeur: "HEVC (H.265)" },
          { label: "Codage", valeur: "VBR 2 passes" },
          { label: "Débit cible", valeur: "65", unite: "Mbps", copie: "65" },
          { label: "Débit max", valeur: "80", unite: "Mbps", copie: "80" },
        ],
      },
      nettete: {
        etapes: [
          "Effet « Netteté » sur le clip : valeur entre 15 et 25.",
          "Alternative : Lumetri Couleur > Créatif > Netteté, entre 15 et 25.",
        ],
        valeurs: [{ label: "Netteté", valeur: "15 – 25" }],
      },
    },
  },
  {
    slug: "davinci-resolve",
    nom: "DaVinci Resolve",
    plateforme: "PC/Mac",
    regles: {
      proxy: {
        etapes: [
          "Paramètres du projet > Master Settings > Proxy media resolution : Half (Quarter si ton PC est faible).",
          "Media Pool : sélectionne tes clips > clic droit > Generate Proxy Media.",
          "Menu Playback > Proxy Handling > Prefer Proxies.",
          "Le rendu final utilise les originaux.",
        ],
        valeurs: [
          { label: "Proxy media resolution", valeur: "Half" },
          { label: "PC faible", valeur: "Quarter" },
        ],
      },
      timeline: {
        etapes: [
          "Paramètres du projet > Master Settings > Timeline resolution : 3840x2160 Ultra HD.",
          "En vertical : 2160x3840, via Custom.",
          "Inspecteur > Transform : Zoom à 1.2 maximum.",
        ],
        valeurs: [
          { label: "Paysage", valeur: "3840x2160", copie: "3840x2160" },
          { label: "Vertical", valeur: "2160x3840", copie: "2160x3840" },
          { label: "Zoom max", valeur: "1.2", copie: "1.2" },
        ],
      },
      export: {
        etapes: [
          "Page Deliver.",
          "Format MP4, codec H.264 ou H.265.",
          "Quality : Restrict to 65000 Kb/s.",
          "Advanced Settings : coche « Force sizing to highest quality » et « Force debayer to highest quality ».",
        ],
        valeurs: [
          { label: "Format", valeur: "MP4" },
          { label: "Codec", valeur: "H.264" },
          { label: "ou", valeur: "H.265" },
          { label: "Restrict to", valeur: "65000", unite: "Kb/s", copie: "65000" },
        ],
      },
      nettete: {
        etapes: [
          "Page Color > palette Blur > mode Sharpen.",
          "Baisse le Radius de 0.50 à environ 0.45 / 0.47.",
          "Plus la valeur descend sous 0.50, plus c'est net : reste léger.",
        ],
        valeurs: [
          { label: "Radius par défaut", valeur: "0.50" },
          { label: "Radius", valeur: "0.45", copie: "0.45" },
          { label: "ou", valeur: "0.47", copie: "0.47" },
        ],
      },
    },
  },
  {
    slug: "capcut-pc",
    nom: "CapCut PC",
    plateforme: "PC/Mac",
    regles: {
      proxy: {
        etapes: [
          "Menu > Paramètres > Performance : active le Proxy.",
          "CapCut crée des fichiers légers pour la lecture ; l'export reste en qualité d'origine.",
        ],
        valeurs: [],
      },
      timeline: {
        etapes: [
          "Choisis le ratio dans le lecteur : 16:9 (paysage) ou 9:16 (vertical TikTok).",
          "Panneau Vidéo > Basique : Échelle à 120 % maximum.",
        ],
        valeurs: [
          { label: "Paysage", valeur: "16:9" },
          { label: "Vertical", valeur: "9:16" },
          { label: "Échelle max", valeur: "120", unite: "%", copie: "120" },
        ],
      },
      export: {
        etapes: [
          "Résolution 4K.",
          "Débit binaire : Personnaliser > 65000 kbps (65 Mbps).",
          "Codec H.264 ou HEVC (H.265).",
          "Même cadence que tes rushes.",
        ],
        valeurs: [
          { label: "Résolution", valeur: "4K" },
          { label: "Débit", valeur: "65000", unite: "kbps", copie: "65000" },
          { label: "Codec", valeur: "H.264" },
          { label: "ou", valeur: "HEVC (H.265)" },
        ],
      },
      nettete: {
        etapes: ["Panneau Ajuster > Netteté : entre 15 et 25."],
        valeurs: [{ label: "Netteté", valeur: "15 – 25" }],
      },
    },
  },
  {
    slug: "capcut-mobile",
    nom: "CapCut Mobile",
    plateforme: "Mobile",
    regles: {
      proxy: {
        etapes: [
          "Pas de proxy manuel sur mobile : CapCut allège l'aperçu tout seul.",
          "Astuce : ferme les autres applis et baisse la qualité d'aperçu si ça rame.",
        ],
        valeurs: [],
      },
      timeline: {
        etapes: [
          "Ratio 9:16 pour TikTok.",
          "Garde le zoom (pincement) à 120 % maximum, sinon tu perds en netteté.",
        ],
        valeurs: [
          { label: "Ratio", valeur: "9:16" },
          { label: "Zoom max", valeur: "120", unite: "%", copie: "120" },
        ],
      },
      export: {
        etapes: [
          "Touche la résolution en haut à droite > Résolution 4K.",
          "Fréquence 30 ou 60, selon tes rushes.",
          "Débit binaire au maximum, ou personnalisé autour de 65 Mbps.",
          "Active HEVC (H.265) si ton téléphone le propose.",
        ],
        valeurs: [
          { label: "Résolution", valeur: "4K" },
          { label: "Fréquence", valeur: "30 ou 60" },
          { label: "Débit (environ)", valeur: "65", unite: "Mbps", copie: "65" },
        ],
      },
      nettete: {
        etapes: ["Sélectionne le clip > Ajuster > Netteté : entre 15 et 25."],
        valeurs: [{ label: "Netteté", valeur: "15 – 25" }],
      },
    },
  },
  {
    slug: "vn-editor",
    nom: "VN Editor",
    plateforme: "Mobile",
    regles: {
      proxy: {
        etapes: [
          "Pas de proxy manuel : VN gère l'aperçu allégé.",
          "Même astuce que CapCut mobile si ça rame : ferme les autres applis.",
        ],
        valeurs: [],
      },
      timeline: {
        etapes: [
          "À la création du projet, choisis le ratio 9:16.",
          "Zoom du clip à 120 % maximum.",
        ],
        valeurs: [
          { label: "Ratio", valeur: "9:16" },
          { label: "Zoom max", valeur: "120", unite: "%", copie: "120" },
        ],
      },
      export: {
        etapes: [
          "Résolution 4K.",
          "Fréquence selon tes rushes.",
          "Débit binaire personnalisé à 65 Mbps environ.",
        ],
        valeurs: [
          { label: "Résolution", valeur: "4K" },
          { label: "Débit (environ)", valeur: "65", unite: "Mbps", copie: "65" },
        ],
      },
      nettete: {
        etapes: ["Sélectionne le clip > Ajuster > Netteté : entre 15 et 25."],
        valeurs: [{ label: "Netteté", valeur: "15 – 25" }],
      },
    },
  },
];

/** Logiciel affiché par défaut, et repli quand ?logiciel= est absent ou inconnu. */
export const logicielParDefaut: Logiciel = logiciels[0];

/** Un slug inconnu retombe sur le défaut plutôt que de planter : le lien partagé reste utile. */
export function trouverLogiciel(slug: string | null | undefined): Logiciel {
  return logiciels.find((l) => l.slug === slug) ?? logicielParDefaut;
}
