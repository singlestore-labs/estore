import { atom } from "jotai";

import { ChatMessage } from "@/chat/message/types";

export const chatMessagesAtom = atom<ChatMessage[]>([]);

export const hasMessagesAtom = atom<boolean>((get) => !!get(chatMessagesAtom).length);
