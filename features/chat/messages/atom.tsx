import { atom } from "jotai";

import { createChatMessage } from "@/chat/message/lib/create";
import { ChatMessage } from "@/chat/message/types";
import { ProductCard } from "@/product/components/card";
import { ProductsRecommendedMessage } from "@/products/recommended/components/message";

import { products } from "../../../data/products";

export const chatMessagesAtom = atom<ChatMessage[]>([
  createChatMessage({
    role: "function",
    node: <ProductsRecommendedMessage products={products} />,
  }),

  createChatMessage({
    role: "function",
    node: <ProductCard {...products[0]} />,
  }),
]);

export const hasMessagesAtom = atom<boolean>((get) => !!get(chatMessagesAtom).length);
