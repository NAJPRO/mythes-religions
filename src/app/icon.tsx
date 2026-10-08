import { ImageResponse } from "next/og";
import { cinzelBold, colors } from "@/lib/og";

// Favicon généré : un "M" doré sur fond sombre, lisible même à 16px.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
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
          fontSize: 48,
          border: `3px solid ${colors.goldDeep}`,
          borderRadius: 14,
        }}
      >
        M
      </div>
    ),
    { ...size, fonts: [{ name: "Cinzel", data: await cinzelBold(), weight: 700 }] },
  );
}
