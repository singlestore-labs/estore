"use client";

import { createStore } from "jotai";

import { ComponentProps } from "@/types";
import { ChatStoreProvider, ChatStoreProviderProps } from "@/chat/store/components/provider";

export type MainChatStoreProviderProps = ComponentProps<Omit<ChatStoreProviderProps, "store">>;

const store = createStore();

export function MainChatStoreProvider({ ...props }: MainChatStoreProviderProps) {
  return (
    <ChatStoreProvider
      {...props}
      store={store}
    />
  );
}
