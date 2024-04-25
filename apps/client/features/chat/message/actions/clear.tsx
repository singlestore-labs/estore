"use server";

import { forwardActionError } from "@/action/error/lib/forward";
import { createChatLLM } from "@/chat/llm/lib/create";

export async function clearChatMessages() {
  try {
    const chatSessionAgent = await createChatLLM();
    await chatSessionAgent.clearMessages();
  } catch (error) {
    return forwardActionError(error);
  }
}
