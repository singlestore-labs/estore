import { atom } from "jotai";
import { useMemo } from "react";

import { ChatMessage } from "@/chat/message/types";
import { Chat } from "@/chat/types";

export type ChatMesssagesAtomValue = Record<Chat["name"], ChatMessage[]>;

export const chatMessagesAtom = atom<ChatMesssagesAtomValue>({ main: [], dashboard: [] });

export function useHasChatMessagesAtomValue(chatName: Chat["name"]) {
  return useMemo(() => atom((get) => !!get(chatMessagesAtom)[chatName].length), [chatName]);
}

export function useChatMessagesAtomValue(chatName: Chat["name"]) {
  return useMemo(() => atom((get) => get(chatMessagesAtom)[chatName]), [chatName]);
}

export function useSetChatMessagesAtom(chatName: Chat["name"]) {
  return useMemo(() => {
    return atom(null, (get, set, update: (value: ChatMesssagesAtomValue[typeof chatName]) => ChatMessage[]) => {
      const currentMessages = get(chatMessagesAtom);
      set(chatMessagesAtom, { ...currentMessages, [chatName]: update(currentMessages[chatName]) });
    });
  }, [chatName]);
}
