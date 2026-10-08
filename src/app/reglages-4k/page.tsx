import type { Metadata } from "next";
import { LogicielExplorer } from "@/components/reglages/LogicielExplorer";
import { RulesSummary } from "@/components/reglages/RulesSummary";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroGlow } from "@/components/ui/HeroGlow";
import { Reveal } from "@/components/ui/Reveal";
import { RevealWords } from "@/components/ui/RevealWords";
import { Section } from "@/components/ui/Section";
import { site } from "@/lib/site";

const title = "Réglages pour des vidéos 4K";
const description =
  "Les 4 règles pour des vidéos 4K nettes sur TikTok, avec les réglages exacts pour Premiere Pro, DaVinci Resolve, CapCut et VN Editor.";

export const metadata: Metadata = {
  title,
  description,
  // Canonique sans ?logiciel= : tous les liens partagés pointent vers une seule page pour les moteurs de recherche.
  alternates: { canonical: "/reglages-4k" },
  openGraph: { title, description, url: "/reglages-4k", locale: "fr_FR", type: "article" },
};

export default function Reglages4kPage() {
  return (
    <>
      {/* Hero en CSS pur pour un LCP rapide (voir RevealWords). */}
      <section className="relative pb-4 pt-14 text-center sm:pt-20">
        <HeroGlow />
        <Container>
          <p className="mb-5 flex animate-fade-rise justify-center">
            <Badge>Lié à la vidéo TikTok</Badge>
          </p>
          <h1 className="font-display text-display leading-[1.05] text-bone">
            <RevealWords text={title} />
          </h1>
          <p
            className="mx-auto mt-5 max-w-md animate-fade-rise text-lg text-ash"
            style={{ animationDelay: "500ms" }}
          >
            4 règles, puis les réglages exacts de ton logiciel. Tout est ici, copiable en un tap.
          </p>
          <div className="mt-8 animate-fade-rise" style={{ animationDelay: "650ms" }}>
            {/* Raccourci vers le sélecteur : l'objectif est de trouver ses réglages en quelques secondes. */}
            <ButtonLink href="#logiciel" variant="ghost">
              Choisir mon logiciel
            </ButtonLink>
          </div>
        </Container>
      </section>

      <Section id="regles" eyebrow="En résumé" title="Les 4 règles">
        <RulesSummary />
      </Section>

      {/* scroll-mt : l'ancre #logiciel ne doit pas coller au bord haut du viewport. */}
      <Section id="logiciel" eyebrow="Pas à pas" title="Tes réglages, logiciel par logiciel" className="scroll-mt-4">
        <LogicielExplorer />
      </Section>

      <Container className="pb-8">
        <Reveal>
          <p className="text-center text-sm text-ash">
            Les noms de menus peuvent légèrement changer selon la version de ton logiciel.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/" variant="ghost">
              ← Retour à l&rsquo;accueil
            </ButtonLink>
            <ButtonLink href={site.tiktokUrl}>Voir sur TikTok</ButtonLink>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
