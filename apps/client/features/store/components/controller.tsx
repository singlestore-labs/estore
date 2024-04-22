"use client";

import { useHydrateAtoms } from "jotai/utils";

import { chatMessagesAtom } from "@/chat/message/atoms/messages";
import { ChatMessage } from "@/chat/message/types";

export type StoreControllerProps = {
  messages: ChatMessage[];
};

export function StoreController({ messages }: StoreControllerProps) {
  useHydrateAtoms([[chatMessagesAtom, messages]]);

  return null;
}
