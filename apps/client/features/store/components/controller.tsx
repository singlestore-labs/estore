"use client";

import { useHydrateAtoms } from "jotai/utils";

import { chatMessagesAtom } from "@/chat/message/atoms/messages";
import { ChatMessage } from "@/chat/message/types";
import { ProdcutLike } from "@/product/likes/types";
import { userProdcutLikesAtom } from "@/user/product/atoms/likes";

export type StoreControllerProps = {
  messages: ChatMessage[];
  userProductLikes: ProdcutLike[];
};

export function StoreController({ messages, userProductLikes }: StoreControllerProps) {
  useHydrateAtoms([
    [chatMessagesAtom, messages],
    [userProdcutLikesAtom, userProductLikes],
  ]);

  return null;
}
