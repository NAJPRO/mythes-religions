"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig } from "motion/react";

// `strict` : si quelqu'un utilise <motion.div> au lieu de <m.div>, ça lève une
// erreur en dev, ce qui évite de ré-embarquer tout le moteur dans le bundle.
const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

/**
 * reducedMotion="user" : si l'OS demande moins d'animations, motion coupe les
 * transforms automatiquement.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
