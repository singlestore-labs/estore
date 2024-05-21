"use client";

import { useHydrateAtoms } from "jotai/utils";

import { chatConfigAtom } from "@/chat/atoms/config";
import { chatMessagesAtom } from "@/chat/message/atoms/messages";
import { ChatMessage } from "@/chat/message/types";
import { chatShortcutsAtom } from "@/chat/shortcut/atoms/shortcuts";
import { ChatShortcut } from "@/chat/shortcut/types";
import { ChatConfig } from "@/chat/types";

export type ChatStoreHydrateProps = {
  config: ChatConfig;
  messages: ChatMessage[];
  shortcuts: ChatShortcut[];
};

export function ChatStoreHydrate({ config, messages, shortcuts }: ChatStoreHydrateProps) {
  useHydrateAtoms([
    [chatConfigAtom, config],
    [chatMessagesAtom, messages],
    [chatShortcutsAtom, shortcuts],
  ]);

  return null;
}
