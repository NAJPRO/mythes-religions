/**
 * Lueur dorée qui pulse doucement derrière le titre du hero.
 * Un seul calque, animé en opacity + transform (jamais de filter/blur animé,
 * trop coûteux sur un mobile d'entrée de gamme). Le flou est "cuit" dans le
 * dégradé radial. L'animation est coupée par prefers-reduced-motion (CSS).
 */
export function HeroGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center overflow-hidden">
      <div className="mt-6 h-72 w-[135%] max-w-4xl animate-glow-pulse rounded-full bg-[radial-gradient(closest-side,rgb(196_155_75/0.28),rgb(196_155_75/0.08)_55%,transparent)]" />
    </div>
  );
}
