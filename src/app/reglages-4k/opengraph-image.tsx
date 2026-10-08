import { ImageResponse } from "next/og";
import { cinzelBold, OgFrame, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = "Réglages pour des vidéos 4K";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <OgFrame eyebrow={site.name} title="Réglages pour des vidéos 4K" subtitle="4 règles · tous les logiciels" />,
    { ...size, fonts: [{ name: "Cinzel", data: await cinzelBold(), weight: 700 }] },
  );
}
