import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { cx } from "@/lib/cx";

const variants = {
  // Le rouge sang est le CTA principal : l'unique action à ne pas rater.
  primary:
    "bg-blood text-bone border-blood-bright/50 hover:bg-blood-bright active:bg-blood-bright shadow-[0_0_24px_-6px_rgb(155_28_28/0.7)]",
  ghost: "bg-transparent text-gold-300 border-gold-500/40 hover:bg-gold-500/10 active:bg-gold-500/10",
} as const;

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
  variant?: keyof typeof variants;
};

/**
 * Toujours un lien (jamais un <button>) : ici chaque action est une navigation.
 * Hauteur min 48px = cible tactile confortable au pouce.
 * Trois cas : route interne (Link), ancre de la page (<a> simple, sans nouvel
 * onglet), lien externe (nouvel onglet avec rel sécurisé).
 */
export function ButtonLink({ href, variant = "primary", className, children, ...props }: ButtonLinkProps) {
  const classes = cx(
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-7 font-sans text-sm font-semibold uppercase tracking-widest transition-colors duration-200",
    variants[variant],
    className,
  );
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  if (href.startsWith("#")) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
      {children}
    </a>
  );
}
