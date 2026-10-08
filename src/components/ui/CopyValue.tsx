"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ValueChip } from "./ValueChip";

const FEEDBACK_MS = 1500;

/**
 * navigator.clipboard n'existe que dans un contexte sécurisé et peut être
 * absent ou refusé dans une webview (TikTok, Instagram). Le repli via un
 * textarea + execCommand reste le seul moyen fiable là-bas.
 */
async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    // Hors écran, et à 16px pour éviter le zoom automatique d'iOS au focus.
    el.style.cssText = "position:fixed;top:0;left:-9999px;font-size:16px";
    document.body.appendChild(el);
    el.select();
    try {
      return document.execCommand("copy");
    } finally {
      document.body.removeChild(el);
    }
  }
}

function CopyIcon() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="size-3.5 text-gold-400" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
      <path d="M10.5 3.5v-.5A1.5 1.5 0 0 0 9 1.5H3A1.5 1.5 0 0 0 1.5 3v6A1.5 1.5 0 0 0 3 10.5h.5" />
    </svg>
  );
}

/**
 * Le chip entier est le bouton : sur mobile, une cible de 44px+ au pouce vaut
 * mieux qu'une petite icône à côté. Le retour visuel (or + "Copié") est
 * limité à opacity/transform, et le chip garde sa taille pour ne pas
 * décaler les valeurs voisines.
 */
export function CopyValue({
  value,
  unit,
  label,
  copie,
}: {
  value: string;
  unit?: string;
  label?: string;
  /** Texte réellement copié. */
  copie: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Évite un setState après démontage quand l'utilisateur change de logiciel pendant les 1,5 s.
  useEffect(() => () => clearTimeout(timer.current), []);

  async function handleClick() {
    if (!(await copyText(copie))) return;
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), FEEDBACK_MS);
  }

  return (
    <span className="inline-flex">
      <motion.button
        type="button"
        onClick={handleClick}
        aria-label={`Copier ${label ? `${label} ` : ""}${copie}`}
        whileTap={{ scale: 0.95 }}
        animate={copied ? { scale: [1, 1.06, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
        // min-h-11 = 44px : cible tactile minimale recommandée.
        className="inline-flex min-h-11 items-center rounded-lg"
      >
        <ValueChip
          value={value}
          unit={unit}
          label={label}
          tone={copied ? "active" : "default"}
          trailing={<CopyIcon />}
          overlay={
            <AnimatePresence>
              {copied && (
                <motion.span
                  className="absolute inset-0 flex items-center justify-center font-sans text-sm font-semibold"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  Copié
                </motion.span>
              )}
            </AnimatePresence>
          }
        />
      </motion.button>
      {/* Les lecteurs d'écran n'entendent pas un changement purement visuel : on l'annonce. */}
      <span role="status" className="sr-only">
        {copied ? "Copié" : ""}
      </span>
    </span>
  );
}
