"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";
import { m } from "motion/react";
import type { Logiciel } from "@/content/reglages-4k";
import { cx } from "@/lib/cx";

export const PANEL_ID = "logiciel-panel";
export const tabId = (slug: string) => `tab-${slug}`;

/**
 * Sélecteur de logiciel, pattern ARIA "tabs" : tablist/tab/tabpanel,
 * tabindex itinérant (un seul onglet dans l'ordre de tabulation, les flèches
 * font le reste), sélection qui suit le focus.
 * Mobile : pills qui défilent horizontalement. Desktop (md+) : onglets avec
 * soulignement. C'est le même markup, seul le style de l'indicateur change.
 */
export function LogicielTabs({
  items,
  activeSlug,
  onChange,
}: {
  items: readonly Pick<Logiciel, "slug" | "nom" | "plateforme">[];
  activeSlug: string;
  onChange: (slug: string) => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const isFirstRender = useRef(true);

  // Centre l'onglet actif dans le défilement horizontal (utile quand on arrive
  // via un lien partagé vers le 4e logiciel). On calcule scrollLeft nous-mêmes :
  // scrollIntoView() ferait aussi défiler la PAGE verticalement.
  useEffect(() => {
    const list = listRef.current;
    const tab = tabRefs.current[items.findIndex((i) => i.slug === activeSlug)];
    if (!list || !tab) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({
      left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2,
      behavior: isFirstRender.current || reduce ? "auto" : "smooth",
    });
    isFirstRender.current = false;
  }, [activeSlug, items]);

  function onKeyDown(e: KeyboardEvent, index: number) {
    const last = items.length - 1;
    const next =
      e.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : e.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    onChange(items[next].slug);
    tabRefs.current[next]?.focus();
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label="Choisis ton logiciel de montage"
      // Marges négatives + padding : la liste défile bord à bord de l'écran mais démarre alignée sur le contenu.
      className="tabs-scroll -mx-5 flex snap-x gap-2 overflow-x-auto px-5 py-1 sm:-mx-8 sm:px-8 md:mx-0 md:gap-1 md:border-b md:border-line md:px-0 md:py-0"
    >
      {items.map((item, i) => {
        const active = item.slug === activeSlug;
        return (
          <button
            key={item.slug}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            id={tabId(item.slug)}
            role="tab"
            type="button"
            aria-selected={active}
            aria-controls={PANEL_ID}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(item.slug)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cx(
              "relative min-h-12 shrink-0 snap-center rounded-full border border-line px-4 font-sans text-sm font-medium transition-colors duration-200 md:rounded-none md:border-0 md:px-5",
              active ? "text-gold-200" : "text-ash hover:text-bone",
            )}
          >
            {active && (
              // layoutId : motion fait glisser ce calque d'un onglet à l'autre
              // (transform uniquement, donc fluide). Pill sur mobile, soulignement sur desktop.
              <m.span
                layoutId="logiciel-indicator"
                aria-hidden
                className="absolute inset-0 rounded-full border border-gold-500/60 bg-gold-500/15 md:inset-x-0 md:bottom-0 md:top-auto md:h-0.5 md:rounded-none md:border-0 md:bg-gold-300"
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
              />
            )}
            <span className="relative whitespace-nowrap">{item.nom}</span>
          </button>
        );
      })}
    </div>
  );
}
