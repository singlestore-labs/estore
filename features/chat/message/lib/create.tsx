import { nanoid } from "nanoid";
import { ReactNode } from "react";

import { Override } from "@/types";
import { ChatMessageContentCard } from "@/chat/message/content/components/card";
import { ChatMessage } from "@/chat/message/types";

type _ChatMessage = Override<
  ChatMessage,
  { node?: ((props: Omit<ChatMessage, "node">) => ReactNode) | ReactNode }
>;

export function createChatMessage<T extends _ChatMessage = _ChatMessage>({
  id = nanoid(),
  createdAt = new Date(),
  role = "system",
  content = "",
  node,
}: Partial<T> = {}): ChatMessage {
  const message = { id, createdAt, role, content };
  let _node: ReactNode;

  if (node) {
    _node = typeof node === "function" ? node(message) : node;
  } else {
    _node = <ChatMessageContentCard {...message} />;
  }

  return { ...message, node: _node };
}
