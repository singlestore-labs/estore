"use client";

import { useHydrateAtoms } from "jotai/utils";

import { chatMessagesAtom } from "@/chat/message/atoms/messages";
import { ChatMessage } from "@/chat/message/types";
import { chatShortcutsAtom } from "@/chat/shortcut/atoms/shortcuts";
import { ChatShortcut } from "@/chat/shortcut/types";

export type ChatStoreControllerProps = {
  messages: ChatMessage[];
  shortcuts: ChatShortcut[];
};

export function ChatStoreController({ messages, shortcuts }: ChatStoreControllerProps) {
  useHydrateAtoms([
    [chatMessagesAtom, messages],
    [chatShortcutsAtom, shortcuts],
  ]);

  return null;
}
