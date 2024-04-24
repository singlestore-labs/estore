import { chatLLMTools } from "@/chat/llm/tool";

export function isLLMToolKey(key: any): key is keyof typeof chatLLMTools {
  return key && key in chatLLMTools;
}
