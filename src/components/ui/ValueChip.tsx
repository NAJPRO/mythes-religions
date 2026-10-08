import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "@/lib/cx";

/**
 * Affiche une valeur technique ("65 Mbps"). Police mono + chiffres tabulaires
 * pour que les colonnes de réglages s'alignent, et aucun effet décoratif :
 * c'est la partie du site où la lisibilité prime sur l'ambiance.
 * Le label est optionnel (ex. "Débit") et rendu en sans-serif discret.
 */
export function ValueChip({
  value,
  unit,
  label,
  tone = "default",
  trailing,
  overlay,
  className,
  ...props
}: Omit<ComponentPropsWithoutRef<"span">, "children"> & {
  value: string | number;
  unit?: string;
  label?: string;
  /** "active" = or brillant, utilisé par CopyValue pour confirmer la copie. */
  tone?: "default" | "active";
  /** Élément en fin de chip (icône de copie). */
  trailing?: ReactNode;
  /** Calque centré par-dessus le contenu (message "Copié"), sans changer la taille du chip. */
  overlay?: ReactNode;
}) {
  return (
    <span
      className={cx(
        "relative inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 transition-colors duration-200",
        tone === "active"
          ? "border-gold-200 bg-gold-300 text-ink shadow-gold"
          : "border-line bg-ink-high",
        className,
      )}
      {...props}
    >
      {/* Le contenu reste dans le flux (donc la largeur du chip ne bouge pas) et s'efface quand l'overlay s'affiche. */}
      <span
        className={cx(
          "inline-flex items-baseline gap-1.5 transition-opacity duration-150",
          !!overlay && tone === "active" && "opacity-0",
        )}
      >
        {label && <span className="font-sans text-xs text-ash">{label}</span>}
        <span className="font-mono text-base font-medium tabular-nums text-gold-200">{value}</span>
        {unit && <span className="font-mono text-sm text-ash">{unit}</span>}
      </span>
      {trailing && (
        <span className={cx("transition-opacity duration-150", tone === "active" && "opacity-0")}>{trailing}</span>
      )}
      {overlay}
    </span>
  );
}
