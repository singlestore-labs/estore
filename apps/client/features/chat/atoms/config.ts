import { atom } from "jotai";
import { useMemo } from "react";

import { Chat, ChatConfig } from "@/chat/types";

export type ChatConfigAtomValue = Record<Chat["name"], ChatConfig>;

export const chatConfigAtom = atom<ChatConfigAtomValue>({
  main: {
    deleteUserLikesOnClear: true,
    deleteUserOrdersOnClear: true,
    affectedDataOnClear: ["messages", "shopping history", "likes"],
  },
  dashboard: {
    deleteUserLikesOnClear: false,
    deleteUserOrdersOnClear: false,
    affectedDataOnClear: ["messages"],
  },
});

export function useChatConfigAtomValue(chatName: Chat["name"]) {
  return useMemo(() => atom((get) => get(chatConfigAtom)[chatName]), [chatName]);
}
