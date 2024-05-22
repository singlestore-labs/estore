import { createChatLLM } from "@/chat/llm/lib/create";
import { Chat } from "@/chat/types";

export async function getChatMessages(chatName: Chat["name"]) {
  try {
    const chatLLM = await createChatLLM(chatName);
    return (await chatLLM.getMessages()).reverse();
  } catch (error) {
    return [];
  }
}
