import type { ComponentPropsWithoutRef } from "react";
import { cx } from "@/lib/cx";

/**
 * Largeur max volontairement étroite (max-w-3xl) : le site est pensé pour un
 * téléphone, et une colonne courte garde les lignes de texte lisibles sur
 * desktop au lieu de les étirer.
 */
export function Container({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cx("mx-auto w-full max-w-3xl px-5 sm:px-8", className)} {...props} />;
}
