import { atom } from "jotai";

import { ChatShortcut } from "@/chat/shortcut/types";

export const chatShortcutsAtom = atom<ChatShortcut[]>([]);
