import { atom } from "jotai";
import { useMemo } from "react";

import { ChatShortcut } from "@/chat/shortcut/types";
import { Chat } from "@/chat/types";
import { DASHBOARD_CHAT_SHORTCUTS } from "@/dashboard/chat/constants/shortcuts";
import { MAIN_CHAT_SHORTCUTS } from "@/main/chat/constants/shortcuts";

export type ChatShortcutsAtomValue = Record<Chat["name"], ChatShortcut[]>;

export const chatShortcutsAtom = atom<ChatShortcutsAtomValue>({
  main: MAIN_CHAT_SHORTCUTS,
  dashboard: DASHBOARD_CHAT_SHORTCUTS,
});

export function useChatShortcutsAtomValue(chatName: Chat["name"]) {
  return useMemo(() => atom((get) => get(chatShortcutsAtom)[chatName]), [chatName]);
}
