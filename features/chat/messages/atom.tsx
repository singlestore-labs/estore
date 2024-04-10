import { atom } from "jotai";

import { createChatMessage } from "@/chat/message/lib/create";
import { ChatMessage } from "@/chat/message/types";
import { ProductCard } from "@/product/components/card";

export const chatMessagesAtom = atom<ChatMessage[]>([
  createChatMessage({ role: "function", node: <ProductCard /> }),
]);

export const hasMessagesAtom = atom<boolean>((get) => !!get(chatMessagesAtom).length);
