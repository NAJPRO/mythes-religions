"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

/** reducedMotion="user" : si l'OS demande moins d'animations, motion coupe les transforms automatiquement. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
