import { ImageResponse } from "next/og";
import { cinzelBold, colors } from "@/lib/og";

// Icône d'écran d'accueil iOS : carré plein (iOS applique lui-même les coins arrondis).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: colors.ink,
          color: colors.gold,
          fontFamily: "Cinzel",
          fontSize: 130,
        }}
      >
        M
      </div>
    ),
    { ...size, fonts: [{ name: "Cinzel", data: await cinzelBold(), weight: 700 }] },
  );
}
