import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-8 border-t border-line/60 py-10">
      <Container className="flex flex-col items-center gap-3 text-center text-sm text-ash">
        <a
          href={site.tiktokUrl}
          target="_blank"
          rel="noopener noreferrer"
          // py-2 : agrandit la zone tactile sans changer l'aspect.
          className="py-2 font-medium text-gold-300 hover:text-gold-200"
        >
          TikTok {site.handle}
        </a>
        {/* L'année est calculée au build : le site est statique, pas besoin de JS client. */}
        <p>© {new Date().getFullYear()} {site.name}</p>
      </Container>
    </footer>
  );
}
