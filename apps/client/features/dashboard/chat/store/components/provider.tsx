"use client";

import { createStore } from "jotai";

import { ComponentProps } from "@/types";
import { ChatStoreProvider, ChatStoreProviderProps } from "@/chat/store/components/provider";

export type DashboardChatStoreProviderProps = ComponentProps<Omit<ChatStoreProviderProps, "store">>;

const store = createStore();

export function DashboardChatStoreProvider({ ...props }: DashboardChatStoreProviderProps) {
  return (
    <ChatStoreProvider
      {...props}
      store={store}
    />
  );
}
