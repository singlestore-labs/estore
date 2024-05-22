import { Override } from "@/types";
import { chatLLMTools } from "@/chat/llm/tool";
import { Chat } from "@/chat/types";
import { User } from "@/user/types";

export type ChatLLMMessage = {
  id: number;
  created_at: ReturnType<Date["getTime"]>;
  chat_id: Chat["id"];
  user_id: User["id"];
  role: "user" | "assistant" | "system" | "function";
  content: string | Record<string, any>;
};

export type ChatLLMMessageTool = Override<
  ChatLLMMessage,
  { content: { name: keyof typeof chatLLMTools; props: any } }
>;
