import { atom } from "jotai";

import { createChatMessage } from "@/chat/message/lib/create";
import { ChatMessageProductCard } from "@/chat/message/product/components/card";
import { ChatMessageProductListRecommended } from "@/chat/message/product/components/list-recommended";
import { ChatMessageProdcutSalesChart } from "@/chat/message/product/components/sales-chart";
import { ChatMessage } from "@/chat/message/types";
import { products } from "@/data/products";

export const chatMessagesAtom = atom<ChatMessage[]>([
  createChatMessage({
    role: "function",
    node: <ChatMessageProdcutSalesChart product={products[0]} />,
  }),
  createChatMessage({ role: "user", content: "How many sales do these sneakers have?" }),
  createChatMessage({
    role: "function",
    node: <ChatMessageProductListRecommended products={products} />,
  }),
  createChatMessage({ role: "user", content: "I want to buy dark sneakers" }),
  createChatMessage({
    role: "function",
    node: <ChatMessageProductCard product={products[0]} />,
  }),
  createChatMessage({ role: "user", content: "Reccomend a product" }),
]);

export const hasMessagesAtom = atom<boolean>((get) => !!get(chatMessagesAtom).length);