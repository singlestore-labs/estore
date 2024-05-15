import resolveConfig from "tailwindcss/resolveConfig";

import tailwindConfig from "@/tailwind-config";

export function getTheme() {
  return resolveConfig(tailwindConfig).theme;
}

export function getColors(
  theme: ReturnType<typeof getTheme>,
  name: keyof ReturnType<typeof getTheme>["colors"],
) {
  return Object.values(theme.colors[name]).reverse();
}
