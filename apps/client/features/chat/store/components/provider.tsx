"use client";

import { Provider } from "jotai";
import { ReactNode } from "react";

import { ChatStoreHydrate, ChatStoreHydrateProps } from "@/chat/store/components/hydrate";

export type ChatStoreProviderProps = {
  children: ReactNode;
} & ChatStoreHydrateProps;

export function ChatStoreProvider({ children, store, ...props }: ChatStoreProviderProps) {
  return (
    <Provider store={store}>
      <ChatStoreHydrate
        {...props}
        store={store}
      />
      {children}
    </Provider>
  );
}
