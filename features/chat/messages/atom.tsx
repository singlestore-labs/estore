import { atom } from "jotai";

import { createChatMessage } from "@/chat/message/lib/create";
import { ChatMessageProductCard } from "@/chat/message/product/components/card";
import { ChatMessageProdcutSalesChart } from "@/chat/message/product/components/sales-chart";
import { ChatMessageProductsRecommended } from "@/chat/message/products/components/recommended";
import { ChatMessage } from "@/chat/message/types";

import { products } from "../../../data/products";

export const chatMessagesAtom = atom<ChatMessage[]>([
  createChatMessage({
    role: "function",
    node: <ChatMessageProdcutSalesChart product={products[0]} />,
  }),

  createChatMessage({ role: "user", content: "How many sales do these sneakers have?" }),

  createChatMessage({
    role: "function",
    node: <ChatMessageProductsRecommended products={products} />,
  }),

  createChatMessage({ role: "user", content: "I want to buy dark sneakers" }),

  createChatMessage({
    role: "function",
    node: <ChatMessageProductCard product={products[0]} />,
  }),

  createChatMessage({ role: "user", content: "Reccomend a product" }),

  createChatMessage({
    role: "assistant",
    content: "Hello, I'm here to assist you. What would you like to buy today?",
  }),
]);

export const hasMessagesAtom = atom<boolean>((get) => !!get(chatMessagesAtom).length);
