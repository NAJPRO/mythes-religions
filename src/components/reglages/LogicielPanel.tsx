import { Badge } from "@/components/ui/Badge";
import { CopyValue } from "@/components/ui/CopyValue";
import { ValueChip } from "@/components/ui/ValueChip";
import { resumeRegles, type Logiciel } from "@/content/reglages-4k";

/**
 * Les 4 règles déclinées pour un logiciel. Aucune donnée en dur : on parcourt
 * `resumeRegles` pour l'ordre et les titres, et `logiciel.regles` pour le
 * contenu. Ajouter un logiciel ne demande donc aucune modification ici.
 * Texte des étapes en `bone` (contraste maximal) : c'est ce qu'on lit pour agir.
 */
export function LogicielPanel({ logiciel }: { logiciel: Logiciel }) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <h3 className="font-display text-2xl text-bone">{logiciel.nom}</h3>
        <Badge tone="neutral">{logiciel.plateforme}</Badge>
      </div>
      <div className="space-y-4">
        {resumeRegles.map((meta) => {
          const regle = logiciel.regles[meta.cle];
          return (
            <section key={meta.cle} className="rounded-card border border-line bg-ink-raised p-5">
              <h4 className="flex items-baseline gap-3 font-display text-lg text-gold-300">
                <span className="font-mono text-sm text-gold-500">{meta.numero}</span>
                {meta.titre}
              </h4>
              <ul className="mt-3 space-y-2 text-[0.95rem] text-bone/90">
                {regle.etapes.map((etape) => (
                  <li key={etape} className="flex gap-2.5">
                    <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-gold-500" />
                    <span>{etape}</span>
                  </li>
                ))}
              </ul>
              {regle.valeurs.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {regle.valeurs.map((v) =>
                    v.copie ? (
                      <CopyValue key={`${v.label}-${v.valeur}`} label={v.label} value={v.valeur} unit={v.unite} copie={v.copie} />
                    ) : (
                      <ValueChip key={`${v.label}-${v.valeur}`} label={v.label} value={v.valeur} unit={v.unite} />
                    ),
                  )}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
