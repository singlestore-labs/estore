"use client";

import { createStore } from "jotai";
import { useHydrateAtoms } from "jotai/utils";

import { chatConfigAtom } from "@/chat/atoms/config";
import { chatMessagesAtom } from "@/chat/message/atoms/messages";
import { ChatMessage } from "@/chat/message/types";
import { chatShortcutsAtom } from "@/chat/shortcut/atoms/shortcuts";
import { ChatShortcut } from "@/chat/shortcut/types";
import { ChatConfig } from "@/chat/types";

export type ChatStoreHydrateProps = {
  store: ReturnType<typeof createStore>;
  config: ChatConfig;
  messages: ChatMessage[];
  shortcuts: ChatShortcut[];
};

export function ChatStoreHydrate({ store, config, messages, shortcuts }: ChatStoreHydrateProps) {
  useHydrateAtoms(
    [
      [chatConfigAtom, config],
      [chatMessagesAtom, messages],
      [chatShortcutsAtom, shortcuts],
    ],
    { store },
  );

  return null;
}
