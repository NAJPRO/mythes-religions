import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "@/lib/cx";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

type SectionProps = Omit<ComponentPropsWithoutRef<"section">, "title"> & {
  title?: ReactNode;
  eyebrow?: string;
};

/**
 * Le titre est lié à la section via aria-labelledby : les lecteurs d'écran
 * exposent ainsi chaque bloc comme une région nommée.
 */
export function Section({ title, eyebrow, className, children, id, ...props }: SectionProps) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={cx("py-12 sm:py-16", className)}
      {...props}
    >
      <Container>
        {(eyebrow || title) && (
          <Reveal className="mb-8">
            <header>
              {eyebrow && (
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-gold-400">{eyebrow}</p>
              )}
              {title && (
                <h2 id={headingId} className="font-display text-title text-bone">
                  {title}
                </h2>
              )}
            </header>
          </Reveal>
        )}
        {children}
      </Container>
    </section>
  );
}
