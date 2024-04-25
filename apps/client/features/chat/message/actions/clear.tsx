"use server";

import { forwardActionError } from "@/action/error/lib/forward";
import { createChatLLM } from "@/chat/llm/lib/create";

export async function clearChatMessages() {
  try {
    const chatLLM = await createChatLLM();
    await chatLLM.clearMessages();
  } catch (error) {
    return forwardActionError(error);
  }
}
