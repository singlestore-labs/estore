"use client";

import { useHydrateAtoms } from "jotai/utils";
import { ReactNode } from "react";

import { chatConfigAtom } from "@/chat/atoms/config";
import { chatMessagesAtom } from "@/chat/message/atoms/messages";
import { ChatMessage } from "@/chat/message/types";
import { chatShortcutsAtom } from "@/chat/shortcut/atoms/shortcuts";
import { ChatShortcut } from "@/chat/shortcut/types";
import { ChatConfig } from "@/chat/types";

export type ChatStoreHydrateProps = {
  children?: ReactNode;
  config: ChatConfig;
  messages: ChatMessage[];
  shortcuts: ChatShortcut[];
};

export function ChatStoreHydrate({ children, config, messages, shortcuts }: ChatStoreHydrateProps) {
  useHydrateAtoms([
    [chatConfigAtom, config],
    [chatMessagesAtom, messages],
    [chatShortcutsAtom, shortcuts],
  ]);

  return children;
}
