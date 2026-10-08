import type { ComponentPropsWithoutRef } from "react";
import { cx } from "@/lib/cx";

/**
 * Surface sobre : fond légèrement relevé + filet fin. L'identité visuelle vient
 * du décor autour, pas de la carte, pour que le contenu reste lisible.
 * `interactive` ajoute le retour visuel au survol/focus (le tap mobile utilise :active).
 */
export function Card({
  interactive = false,
  className,
  ...props
}: ComponentPropsWithoutRef<"div"> & { interactive?: boolean }) {
  return (
    <div
      className={cx(
        "rounded-card border border-line bg-ink-raised p-5 transition-[border-color,box-shadow,background-color] duration-300",
        interactive &&
          "hover:border-gold-500/60 hover:bg-ink-high hover:shadow-gold active:bg-ink-high active:border-gold-500/60",
        className,
      )}
      {...props}
    />
  );
}
