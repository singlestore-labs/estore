import { llm } from "@repo/ai";
import { db } from "@repo/db";
import { CHAT_MESSAGES_TABLE_NAME } from "@repo/db/constants";
import { ReactNode } from "react";
import zodToJsonSchema from "zod-to-json-schema";

import { createChatLLMMessage } from "@/chat/llm/message/lib/create";
import { normalizeChatLLMMessage } from "@/chat/llm/message/lib/normalize";
import { ChatLLMMessage } from "@/chat/llm/message/types";
import { chatLLMTools } from "@/chat/llm/tool";
import { createChatLLMToolHandler } from "@/chat/llm/tool/lib/create-handler";
import { ChatName } from "@/chat/types";
import { IS_DEV } from "@/constants/config";
import { getUserId } from "@/user/lib/get-id";

export async function createChatLLM(name: ChatName = "main") {
  const userId = await getUserId();

  async function getMessages() {
    const chatLLMMessage = await db.controllers.findMany<ChatLLMMessage[]>({
      collection: CHAT_MESSAGES_TABLE_NAME,
      where: `user_id = ${userId}`,
      extra: "ORDER BY created_at ASC",
    });
    return chatLLMMessage.map(normalizeChatLLMMessage);
  }

  function clearMessages() {
    return db.controllers.deleteMany({
      collection: CHAT_MESSAGES_TABLE_NAME,
      where: `user_id = ${userId}`,
    });
  }

  async function sendMessage(
    content: string,
    {
      onNode,
      onError,
      onContent,
    }: {
      onNode?: (node: ReactNode) => Promise<void>;
      onError?: (error: Error | unknown) => Promise<void>;
      onContent?: (content: string) => Promise<void>;
    } = {},
  ) {
    if (!userId) throw new Error("userId is undefined");

    const [stream] = await Promise.all([
      llm.chat.completions.create({
        model: "gpt-3.5-turbo",
        temperature: 0,
        stream: true,
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content },
        ],
        tools: Object.values(chatLLMTools).map(({ name, description, schema }) => ({
          type: "function",
          function: { name, description, parameters: zodToJsonSchema(schema) },
        })),
      }),

      createChatLLMMessage({ role: "user", user_id: userId, content: JSON.stringify(content) }),
    ]);

    const { handleDeltaTool, callTool } = createChatLLMToolHandler();

    let llmContent = "";
    for await (const chunk of stream) {
      const tool = chunk.choices[0].delta.tool_calls?.[0]?.function;
      const content = chunk.choices[0].delta.content || "";
      if (tool) handleDeltaTool(tool);
      if (content) {
        llmContent += content;
        await onContent?.(content);
      }
    }

    try {
      await Promise.all([
        (async () => {
          if (!llmContent) return;
          return createChatLLMMessage({
            role: "assistant",
            user_id: userId,
            content: JSON.stringify(llmContent),
          });
        })(),
        callTool({
          onNode,
          onResult: async (result) => {
            await createChatLLMMessage({ role: "function", user_id: userId, content: JSON.stringify(result) });
          },
        }),
      ]);
    } catch (error) {
      if (IS_DEV) console.error(error);
      await onError?.(error);
    }
  }

  return { getMessages, clearMessages, sendMessage };
}
