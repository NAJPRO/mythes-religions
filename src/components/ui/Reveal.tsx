"use client";

import type { ReactNode } from "react";
import { m } from "motion/react";

/**
 * Apparition douce au scroll, pour tout ce qui est SOUS la ligne de flottaison.
 * Le contenu au-dessus (hero) utilise des animations CSS : motion masque le
 * contenu dans le HTML serveur tant que React n'est pas hydraté, ce qui
 * retarderait le LCP.
 * Transform + opacity uniquement (propriétés composées par le GPU) pour rester
 * fluide sur un téléphone d'entrée de gamme. `once` évite de rejouer l'effet.
 * Le respect de prefers-reduced-motion est géré globalement par <MotionConfig>.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
