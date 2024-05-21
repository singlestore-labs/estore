"use server";

import { forwardActionError } from "@/action/error/lib/forward";
import { createChatLLM } from "@/chat/llm/lib/create";
import { ChatName } from "@/chat/types";

export async function clearChatMessages(chatName: ChatName = "main") {
  try {
    const chatLLM = await createChatLLM(chatName);
    await chatLLM.clearMessages();
  } catch (error) {
    return forwardActionError(error);
  }
}
