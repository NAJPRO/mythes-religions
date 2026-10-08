# Mythes et Religions

Site hub de la chaîne TikTok [@mythes_religions](https://www.tiktok.com/@mythes_religions) : les liens et ressources partagés en commentaire des vidéos. Contenu en français, pensé mobile first.

Stack : Next.js (App Router) · TypeScript · Tailwind CSS 4 · motion. Pas de backend : tout le contenu est dans des fichiers TypeScript typés, et le site est entièrement statique.

## Lancer en local

```bash
npm install
npm run dev        # http://localhost:3000
```

Autres commandes : `npm run build` (build de production), `npm run lint`, `npm run typecheck`.

## Ajouter une ressource sur l'accueil

Ajoute un objet à la liste `resources` dans `src/content/resources.ts` :

```ts
{
  id: "mon-guide",
  title: "Mon guide",
  description: "Une phrase qui donne envie de cliquer.",
  href: "/mon-guide",      // ou une URL https:// externe
  tag: "Tutoriel",
  highlight: "4K",         // optionnel
}
```

La carte apparaît dans la grille « Ressources ». Si `href` est une page du site, crée-la dans `src/app/mon-guide/page.tsx`.

## Ajouter un logiciel dans les réglages 4K

Ajoute un objet à la liste `logiciels` dans `src/content/reglages-4k.ts`. Aucun composant à modifier : le sélecteur, le contenu et le lien partageable `/reglages-4k?logiciel=<slug>` sont générés depuis cette liste.

```ts
{
  slug: "mon-logiciel",        // minuscules, sans accent : il sert dans l'URL
  nom: "Mon Logiciel",
  plateforme: "PC/Mac",        // ou "Mobile"
  regles: {
    proxy:    { etapes: ["…"], valeurs: [{ label: "Format", valeur: "H.264" }] },
    timeline: { etapes: ["…"], valeurs: [] },
    export:   { etapes: ["…"], valeurs: [{ label: "Débit cible", valeur: "65", unite: "Mbps", copie: "65" }] },
    nettete:  { etapes: ["…"], valeurs: [] },
  },
}
```

Les 4 règles (`proxy`, `timeline`, `export`, `nettete`) sont obligatoires : TypeScript fait échouer le build si l'une manque. Une valeur n'a un bouton « copier » que si elle a un champ `copie` (le texte collé dans le presse-papiers). Un slug inconnu dans l'URL retombe sur le premier logiciel de la liste.

## Déploiement

Le projet est déployé sur Vercel sous le nom `mythes-religions`. Aucune variable d'environnement n'est nécessaire : l'URL du site (Open Graph) est lue depuis `VERCEL_PROJECT_PRODUCTION_URL`.
