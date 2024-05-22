"use client";

import { Provider, createStore } from "jotai";
import { ReactNode } from "react";

import { ComponentProps } from "@/types";
import { StoreHydrate, StoreHydrateProps } from "@/store/components/hydrate";

export type StoreProviderProps = ComponentProps<{ children?: ReactNode } & StoreHydrateProps>;

export const store = createStore();

export function StoreProvider({ children, ...props }: StoreProviderProps) {
  return (
    <Provider>
      <StoreHydrate {...props}>{children}</StoreHydrate>
    </Provider>
  );
}
