/**
 * Décor global : grain, vignettage et lueur de bougie.
 * Server Component sans JS : tout est CSS. Les calques sont fixes et
 * `aria-hidden` / `pointer-events-none` pour ne jamais gêner le contenu ni les taps.
 * z-index négatif implicite via l'ordre : placés avant <main> avec -z-10.
 */
export function Atmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Lueur de bougie : halo or chaud en haut, légère oscillation. */}
      <div className="absolute left-1/2 top-[-12%] h-[60vh] w-[120vw] -translate-x-1/2 animate-flicker rounded-full bg-[radial-gradient(closest-side,rgb(196_155_75/0.16),transparent)]" />
      <div className="atmosphere-vignette absolute inset-0" />
      <div className="atmosphere-grain absolute inset-0" />
    </div>
  );
}
