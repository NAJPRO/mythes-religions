import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ValueChip } from "@/components/ui/ValueChip";
import { resources } from "@/content/resources";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section className="pb-6 pt-16 text-center sm:pt-24">
        <Container>
          <Reveal>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-gold-400">{site.handle}</p>
            <h1 className="font-display text-display leading-[1.05] text-bone">
              Mythes <span className="text-gold-300">&amp;</span> Religions
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-md text-lg text-ash">
              Mythes, légendes et récits d&rsquo;horreur racontés à voix basse. Ici, tu retrouves
              les liens et ressources partagés en commentaire.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="mt-9">
            <ButtonLink href={site.tiktokUrl}>Voir sur TikTok</ButtonLink>
          </Reveal>
        </Container>
      </section>

      <Section id="ressources" eyebrow="Ressources" title="Les liens du commentaire">
        {/* Une colonne sur mobile (cible tactile large), deux dès sm. */}
        <ul className="grid gap-4 sm:grid-cols-2">
          {resources.map((resource, i) => (
            <li key={resource.id}>
              <Reveal delay={i * 0.08} className="h-full">
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
