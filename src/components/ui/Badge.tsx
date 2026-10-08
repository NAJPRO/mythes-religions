import type { ComponentPropsWithoutRef } from "react";
import { cx } from "@/lib/cx";

const tones = {
  gold: "border-gold-500/40 text-gold-300 bg-gold-500/10",
  neutral: "border-line text-ash bg-ink-high",
  // Le rouge sang est rare par design : à n'utiliser qu'une fois par écran.
  blood: "border-blood/60 text-bone bg-blood/25",
} as const;

export function Badge({
  tone = "gold",
  className,
  ...props
}: ComponentPropsWithoutRef<"span"> & { tone?: keyof typeof tones }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-sans text-xs font-medium uppercase tracking-wider",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
