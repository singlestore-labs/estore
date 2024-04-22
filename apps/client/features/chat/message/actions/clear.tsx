"use server";

import { forwardActionError } from "@/action/error/lib/forward";
import { createChatAgent } from "@/chat/agent/lib/create";

export async function clearChatMessages() {
  try {
    const chatSessionAgent = await createChatAgent();
    await chatSessionAgent.chatHistory.clear();
  } catch (error) {
    return forwardActionError(error);
  }
}
