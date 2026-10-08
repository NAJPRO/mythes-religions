import type { ComponentPropsWithoutRef } from "react";
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
  className,
  ...props
}: Omit<ComponentPropsWithoutRef<"span">, "children"> & {
  value: string | number;
  unit?: string;
  label?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-baseline gap-1.5 rounded-lg border border-line bg-ink-high px-3 py-1.5",
        className,
      )}
      {...props}
    >
      {label && <span className="font-sans text-xs text-ash">{label}</span>}
      <span className="font-mono text-base font-medium tabular-nums text-gold-200">{value}</span>
      {unit && <span className="font-mono text-sm text-ash">{unit}</span>}
    </span>
  );
}
