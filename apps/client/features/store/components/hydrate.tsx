import { useHydrateAtoms } from "jotai/utils";
import { ReactNode } from "react";

import { ChatMesssagesAtomValue, chatMessagesAtom } from "@/chat/message/atoms/messages";
import { UserProductLikesAtomValue, userProdcutLikesAtom } from "@/user/product/atoms/likes";

export type StoreHydrateProps = {
  children?: ReactNode;
  chatMessages: ChatMesssagesAtomValue;
  userProductLikes: UserProductLikesAtomValue;
};

export function StoreHydrate({ children, chatMessages, userProductLikes }: StoreHydrateProps) {
  useHydrateAtoms([
    [chatMessagesAtom, chatMessages],
    [userProdcutLikesAtom, userProductLikes],
  ]);

  return children;
}
