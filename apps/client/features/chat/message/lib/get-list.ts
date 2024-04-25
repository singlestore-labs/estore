import { createChatLLM } from "@/chat/llm/lib/create";

export async function getChatMessages() {
  try {
    const chatAgent = await createChatLLM();
    return (await chatAgent.getMessages()).reverse();
  } catch (error) {
    return [];
  }
}
