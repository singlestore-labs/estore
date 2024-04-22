import { createChatAgent } from "@/chat/agent/lib/create";

export async function getChatMessages() {
  try {
    const chatAgent = await createChatAgent();
    return (await chatAgent.getMessages()).reverse();
  } catch (error) {
    return [];
  }
}
