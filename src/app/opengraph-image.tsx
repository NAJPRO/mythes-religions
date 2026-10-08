import { ImageResponse } from "next/og";
import { cinzelBold, OgFrame, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

// Générée une fois au build puis servie comme fichier statique : aucune
// exécution serverless à chaque partage (un lien TikTok peut en déclencher beaucoup).
export const alt = site.name;
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <OgFrame eyebrow={site.handle} title={site.name} subtitle="Mythes & récits d'horreur" />,
    { ...size, fonts: [{ name: "Cinzel", data: await cinzelBold(), weight: 700 }] },
  );
}
