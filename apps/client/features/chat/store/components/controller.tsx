"use client";

import { useHydrateAtoms } from "jotai/utils";

import { chatNameAtom } from "@/chat/atoms/name";
import { chatMessagesAtom } from "@/chat/message/atoms/messages";
import { ChatMessage } from "@/chat/message/types";
import { chatShortcutsAtom } from "@/chat/shortcut/atoms/shortcuts";
import { ChatShortcut } from "@/chat/shortcut/types";
import { ChatName } from "@/chat/types";

export type ChatStoreControllerProps = {
  name: ChatName;
  messages: ChatMessage[];
  shortcuts: ChatShortcut[];
};

export function ChatStoreController({ name, messages, shortcuts }: ChatStoreControllerProps) {
  useHydrateAtoms([
    [chatNameAtom, name],
    [chatMessagesAtom, messages],
    [chatShortcutsAtom, shortcuts],
  ]);

  return null;
}
