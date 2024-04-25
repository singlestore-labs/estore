import { createChatLLM } from "@/chat/llm/lib/create";

export async function getChatMessages() {
  try {
    const chatLLM = await createChatLLM();
    return (await chatLLM.getMessages()).reverse();
  } catch (error) {
    return [];
  }
}
