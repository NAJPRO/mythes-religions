/** Concatène des classes en ignorant les valeurs falsy. Évite une dépendance (clsx) pour 3 lignes. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
