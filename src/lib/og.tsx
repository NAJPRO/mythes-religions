import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Cinzel lu depuis node_modules plutôt que téléchargé : le build ne dépend
 * d'aucun réseau, et la police est garantie identique à celle du site.
 * (Satori n'accepte pas le woff2, d'où le .woff.)
 */
export async function cinzelBold() {
  return readFile(path.join(process.cwd(), "node_modules/@fontsource/cinzel/files/cinzel-latin-700-normal.woff"));
}

export const ogSize = { width: 1200, height: 630 };

export const colors = { ink: "#0a0806", gold: "#d9bf7c", goldDeep: "#a87f33", bone: "#ece3d2", ash: "#a99f8d" };

/** Cadre commun des images de partage : fond sombre, lueur or, double filet doré. */
export function OgFrame({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: `radial-gradient(ellipse at 50% 0%, rgba(196,155,75,0.28), ${colors.ink} 65%)`,
        padding: 36,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: `2px solid ${colors.goldDeep}`,
          padding: 48,
          textAlign: "center",
          fontFamily: "Cinzel",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 8, color: colors.goldDeep, textTransform: "uppercase" }}>{eyebrow}</div>
        <div style={{ fontSize: 88, lineHeight: 1.1, color: colors.bone, marginTop: 28 }}>{title}</div>
        <div style={{ fontSize: 34, color: colors.gold, marginTop: 32 }}>{subtitle}</div>
      </div>
    </div>
  );
}
