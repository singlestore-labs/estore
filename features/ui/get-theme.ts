import resolveConfig from "tailwindcss/resolveConfig";

import tailwindConfig from "@/tailwind-config";

export function getTheme() {
  return resolveConfig(tailwindConfig).theme;
}
