import { atom } from "jotai";

import { ChatMessage } from "@/chat/message/types";

export const chatMessagesAtom = atom<ChatMessage[]>([]);

export const hasChatMessagesAtom = atom<boolean>((get) => !!get(chatMessagesAtom).length);
