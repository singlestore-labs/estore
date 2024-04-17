"use client";

import { ThemeProvider as _ThemeProvider } from "next-themes";
import { ThemeProviderProps as _ThemeProviderProps } from "next-themes/dist/types";

import { ComponentProps } from "@/types";

export type ThemeProviderProps = ComponentProps<_ThemeProviderProps>;

export function ThemeProvider(props: ThemeProviderProps) {
  return <_ThemeProvider {...props} />;
}
