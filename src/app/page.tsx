import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { HeroGlow } from "@/components/ui/HeroGlow";
import { Reveal } from "@/components/ui/Reveal";
import { RevealWords } from "@/components/ui/RevealWords";
import { Section } from "@/components/ui/Section";
import { ValueChip } from "@/components/ui/ValueChip";
import { resources } from "@/content/resources";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* Hero en animations CSS (pas motion) : visible dès le HTML, voir RevealWords. */}
      <section className="relative pb-6 pt-16 text-center sm:pt-24">
        <HeroGlow />
        <Container>
          <p className="mb-4 animate-fade-rise font-mono text-xs uppercase tracking-[0.3em] text-gold-400">
            {site.handle}
          </p>
          <h1 className="font-display text-display leading-[1.05] text-bone">
            <RevealWords text="Mythes & Religions" accent={["&"]} />
          </h1>
          <p
            className="mx-auto mt-6 max-w-md animate-fade-rise text-lg text-ash"
            style={{ animationDelay: "500ms" }}
          >
            Mythes, légendes et récits d&rsquo;horreur racontés à voix basse. Ici, tu retrouves
            les liens et ressources partagés en commentaire.
          </p>
          <div className="mt-9 animate-fade-rise" style={{ animationDelay: "650ms" }}>
            <ButtonLink href={site.tiktokUrl}>Voir sur TikTok</ButtonLink>
          </div>
        </Container>
      </section>

      <Section id="ressources" eyebrow="Ressources" title="Les liens du commentaire">
        {/* Une colonne sur mobile (cible tactile large), deux dès sm. */}
        <ul className="grid gap-4 sm:grid-cols-2">
          {resources.map((resource, i) => (
            <li key={resource.id}>
              <Reveal delay={(i % 2) * 0.1} className="h-full">
                {/* Le lien englobe toute la carte : toute la surface est tappable. */}
                <Link href={resource.href} className="block h-full rounded-card">
                  <Card interactive className="flex h-full flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <Badge>{resource.tag}</Badge>
                      {resource.highlight && <ValueChip value={resource.highlight} />}
                    </div>
                    <h3 className="font-display text-xl text-bone">{resource.title}</h3>
                    <p className="text-sm text-ash">{resource.description}</p>
                  </Card>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
