import { ChatLLMMessage, ChatLLMMessageTool } from "@/chat/llm/message/types";

export function isChatLLMMessageTool(
  message: ChatLLMMessage | ChatLLMMessageTool,
): message is ChatLLMMessageTool {
  return typeof message.content === "object" && "name" in message.content && "props" in message.content;
}
