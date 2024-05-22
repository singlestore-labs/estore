import { ChatLLMTools, chatLLMTools } from "@/chat/llm/tool";

export function isLLMToolKey(key: any): key is ChatLLMTools[keyof ChatLLMTools] {
  return key && Object.values(chatLLMTools).some((i) => key in i);
}
