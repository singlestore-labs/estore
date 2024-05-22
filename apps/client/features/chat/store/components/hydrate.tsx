"use client";

import { useHydrateAtoms } from "jotai/utils";
import { ReactNode } from "react";

import { chatConfigAtom } from "@/chat/atoms/config";
import { chatShortcutsAtom } from "@/chat/shortcut/atoms/shortcuts";
import { ChatShortcut } from "@/chat/shortcut/types";
import { ChatConfig } from "@/chat/types";

export type ChatStoreHydrateProps = {
  children?: ReactNode;
  config: ChatConfig;
  shortcuts: ChatShortcut[];
};

export function ChatStoreHydrate({ children, config, shortcuts }: ChatStoreHydrateProps) {
  useHydrateAtoms([
    [chatConfigAtom, config],
    [chatShortcutsAtom, shortcuts],
  ]);

  return children;
}
