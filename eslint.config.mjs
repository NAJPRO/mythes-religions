import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// Config plate (ESLint 9) : Next 16 n'embarque plus `next lint`, on lance eslint directement.
const config = [
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
  ...nextCoreWebVitals,
  ...nextTypescript,
];

export default config;
