import { Fragment } from "react";
import { cx } from "@/lib/cx";

/**
 * Titre qui "se révèle" mot par mot : chaque mot monte depuis un masque.
 * Animation 100 % CSS (voir @keyframes word-rise) et Server Component : le
 * titre est dans le HTML et peint dès le premier rendu, sans attendre le JS.
 * C'est l'élément du LCP, il ne doit pas dépendre de l'hydratation.
 */
export function RevealWords({
  text,
  accent = [],
  className,
}: {
  text: string;
  /** Mots affichés en or (ex. le "&"). */
  accent?: string[];
  className?: string;
}) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <Fragment key={i}>
          {/* pb/-mb : le masque overflow-hidden ne doit pas rogner les jambages (g, p, y). */}
          <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <span
              className={cx("inline-block animate-word-rise", accent.includes(word) && "text-gold-300", className)}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {word}
            </span>
          </span>{" "}
        </Fragment>
      ))}
    </>
  );
}
