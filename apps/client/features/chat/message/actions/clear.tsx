"use server";

import { revalidatePath } from "next/cache";

import { forwardActionError } from "@/action/error/lib/forward";
import { createChatLLM } from "@/chat/llm/lib/create";
import { Chat } from "@/chat/types";
import { ROUTES } from "@/constants/routes";

export async function clearChatMessages(chatName: Chat["name"]) {
  try {
    const chatLLM = await createChatLLM(chatName);
    await chatLLM.clearMessages();
    revalidatePath(ROUTES.ROOT);
  } catch (error) {
    return forwardActionError(error);
  }
}
