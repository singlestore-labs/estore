"use client";

import { Provider } from "jotai";
import { ReactNode } from "react";

import { ComponentProps } from "@/types";
import { store } from "@/store";
import { StoreHydrate, StoreHydrateProps } from "@/store/components/hydrate";

export type StoreProviderProps = ComponentProps<{ children?: ReactNode } & StoreHydrateProps>;

export function StoreProvider({ children, ...props }: StoreProviderProps) {
  return (
    <Provider store={store}>
      <StoreHydrate {...props}>{children}</StoreHydrate>
    </Provider>
  );
}
