import { isChatLLMMessageTool } from "@/chat/llm/message/lib/is-tool";
import { ChatLLMMessage, ChatLLMMessageTool } from "@/chat/llm/message/types";
import { chatLLMTools } from "@/chat/llm/tool";
import { createChatMessage } from "@/chat/message/lib/create";
import { ChatMessage } from "@/chat/message/types";

export function normalizeChatLLMMessage(message: ChatLLMMessage | ChatLLMMessageTool): ChatMessage {
  let content: ChatMessage["content"] | undefined = undefined;
  let node: ChatMessage["node"] | undefined = undefined;

  if (isChatLLMMessageTool(message)) {
    const tool = chatLLMTools[message.content.name];
    if (tool.node) node = <tool.node {...message.content.props} />;
  } else {
    content = message.content;
  }

  return createChatMessage({
    id: message.id.toString(),
    createdAt: new Date(message.created_at),
    role: message.role,
    content,
    node,
  });
}
