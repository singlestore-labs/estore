import { db } from "@repo/db";
import { CHAT_MESSAGES_TABLE_NAME } from "@repo/db/constants";

import { Optional } from "@/types";
import { ChatLLMMessage } from "@/chat/llm/message/types";

export async function createChatLLMMessage(message: Optional<Omit<ChatLLMMessage, "id">, "createdAt">) {
  return (await db.controllers.insertOne({
    collection: CHAT_MESSAGES_TABLE_NAME,
    value: { createdAt: new Date().getTime(), ...message },
  })) as ChatLLMMessage;
}
