import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

/** Header minimal : juste le nom, pas de menu. Le site n'a qu'un but, trouver la ressource. */
export function Header() {
  return (
    <header className="border-b border-line/60">
      <Container className="flex h-14 items-center">
        <Link href="/" className="font-display text-sm uppercase tracking-[0.3em] text-gold-300">
          {site.name}
        </Link>
      </Container>
    </header>
  );
}
