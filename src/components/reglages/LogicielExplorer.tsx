"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { logiciels, logicielParDefaut, trouverLogiciel } from "@/content/reglages-4k";
import { LogicielPanel } from "./LogicielPanel";
import { LogicielTabs, PANEL_ID, tabId } from "./LogicielTabs";

const PARAM = "logiciel";

function View({ slug, onChange }: { slug: string; onChange: (slug: string) => void }) {
  const logiciel = trouverLogiciel(slug);
  return (
    <>
      <LogicielTabs items={logiciels} activeSlug={logiciel.slug} onChange={onChange} />
      <div id={PANEL_ID} role="tabpanel" aria-labelledby={tabId(logiciel.slug)} className="mt-6">
        {/* mode="wait" : l'ancien contenu s'efface avant l'arrivée du nouveau, pas de saut de hauteur
            avec deux panneaux empilés. Durées courtes (~0,4 s au total) pour rester réactif. */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={logiciel.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <LogicielPanel logiciel={logiciel} />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

function Selector() {
  const params = useSearchParams();
  // Le slug vient de l'URL : c'est la seule source de vérité, donc un lien
  // partagé et l'état affiché ne peuvent jamais diverger. Un slug inconnu
  // retombe sur le logiciel par défaut (trouverLogiciel).
  const slug = trouverLogiciel(params.get(PARAM)).slug;

  function onChange(next: string) {
    const url = new URL(window.location.href);
    url.searchParams.set(PARAM, next);
    // replaceState et non router.push/replace : Next synchronise useSearchParams
    // avec l'History API sans aller-retour réseau, le changement est instantané
    // et l'historique n'est pas pollué (le bouton retour quitte la page).
    window.history.replaceState(null, "", url);
  }

  return <View slug={slug} onChange={onChange} />;
}

/**
 * La page reste 100 % statique (servie par le CDN) : useSearchParams, lu côté
 * client, impose une frontière Suspense. Le HTML serveur contient le logiciel
 * par défaut (utile au SEO et sans JS) ; une fois hydraté, le client affiche
 * celui de l'URL. Compromis assumé : un lien partagé vers un autre logiciel
 * montre brièvement le défaut avant de basculer.
 */
export function LogicielExplorer() {
  return (
    <Suspense fallback={<View slug={logicielParDefaut.slug} onChange={() => {}} />}>
      <Selector />
    </Suspense>
  );
}
