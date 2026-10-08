import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Réglages pour des vidéos 4K" };

// Page provisoire : évite un 404 sur le lien de la home en attendant le vrai contenu.
export default function Reglages4kPage() {
  return (
    <Container className="py-24 text-center">
      <h1 className="font-display text-title text-bone">Réglages pour des vidéos 4K</h1>
      <p className="mx-auto mt-4 max-w-md text-ash">Cette page arrive bientôt.</p>
      <ButtonLink href="/" variant="ghost" className="mt-8">
        Retour
      </ButtonLink>
    </Container>
  );
}
