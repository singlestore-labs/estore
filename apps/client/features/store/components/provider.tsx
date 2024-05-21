"use client";

import { Provider, createStore } from "jotai";
import { ReactNode } from "react";

import { ComponentProps } from "@/types";
import { StoreHydrate, StoreHydrateProps } from "@/store/components/hydrate";

export type StoreProviderProps = ComponentProps<{ children?: ReactNode } & Omit<StoreHydrateProps, "store">>;

const store = createStore();

export function StoreProvider({ children, ...props }: StoreProviderProps) {
  return (
    <Provider store={store}>
      <StoreHydrate
        {...props}
        store={store}
      />
      {children}
    </Provider>
  );
}
