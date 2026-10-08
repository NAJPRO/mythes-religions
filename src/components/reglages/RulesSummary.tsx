import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { ValueChip } from "@/components/ui/ValueChip";
import { resumeRegles } from "@/content/reglages-4k";

/**
 * Les 4 règles de la vidéo, en cartes numérotées. Le gros chiffre doré est
 * l'ancrage visuel : en scrollant vite, on repère "règle 3" sans lire.
 * Les valeurs clés sont en ValueChip (sans bouton copier : ici on résume,
 * on ne règle pas encore un logiciel).
 */
export function RulesSummary() {
  return (
    <ol className="grid gap-4 sm:grid-cols-2">
      {resumeRegles.map((regle, i) => (
        <li key={regle.cle}>
          {/* Cascade : sur 2 colonnes la 2e carte d'une ligne arrive juste après la 1re ;
              sur mobile (1 colonne) le décalage reste court pour ne pas faire attendre. */}
          <Reveal delay={(i % 2) * 0.1} className="h-full">
            <Card className="relative h-full overflow-hidden">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-1 -top-3 select-none font-display text-8xl leading-none text-gold-500/15"
              >
                {regle.numero}
              </span>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-gold-400">Règle {regle.numero}</p>
              <h3 className="mt-2 font-display text-xl text-bone">{regle.titre}</h3>
              <p className="mt-2 text-sm text-ash">{regle.texte}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {regle.valeurs.map((v) => (
                  <ValueChip key={`${v.label}-${v.valeur}`} label={v.label} value={v.valeur} unit={v.unite} />
                ))}
              </div>
            </Card>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
