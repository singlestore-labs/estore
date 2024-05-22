import { createLLMChatCompletion } from "@repo/ai";
import { db } from "@repo/db";
import { CHAT_MESSAGES_TABLE_NAME } from "@repo/db/constants";
import zodToJsonSchema from "zod-to-json-schema";

import { getChatByName } from "@/chat/lib/get-by-name";
import { createChatLLMMessage } from "@/chat/llm/message/lib/create";
import { normalizeChatLLMMessage } from "@/chat/llm/message/lib/normalize";
import { ChatLLMMessage } from "@/chat/llm/message/types";
import { chatLLMTools } from "@/chat/llm/tool";
import { createChatLLMToolHandler } from "@/chat/llm/tool/lib/create-handler";
import { Chat } from "@/chat/types";
import { IS_DEV } from "@/constants/config";
import { getUserId } from "@/user/lib/get-id";

async function handleSteram(
  stream: any,
  {
    onTextToken,
    onToolCall,
  }: { onTextToken?: (contnet: string) => Promise<void>; onToolCall?: (tool: any) => void },
) {
  let text = "";

  for await (const chunk of stream) {
    const tool = chunk.choices[0].delta.tool_calls?.[0]?.function;
    const textToken = chunk.choices[0].delta.content || "";
    if (tool) onToolCall?.(tool);
    if (textToken) {
      text += textToken;
      await onTextToken?.(textToken);
    }
  }

  return text;
}

export async function createChatLLM(name: Chat["name"] = "main") {
  const [userId, chat] = await Promise.all([getUserId(), getChatByName(name)]);
  const tools = chatLLMTools[name];

  async function getMessages() {
    const chatLLMMessage = await db.controllers.findMany<ChatLLMMessage[]>({
      collection: CHAT_MESSAGES_TABLE_NAME,
      where: `user_id = ${userId} AND chat_id = ${chat.id}`,
      extra: "ORDER BY created_at ASC",
    });
    return chatLLMMessage.map((message) => normalizeChatLLMMessage(message, tools));
  }

  function clearMessages() {
    return db.controllers.deleteMany({
      collection: CHAT_MESSAGES_TABLE_NAME,
      where: `user_id = ${userId} AND chat_id = ${chat.id}`,
    });
  }

  async function sendMessage(
    content: string,
    {
      onTextToken,
      onToolCall,
      onError,
    }: {
      onTextToken?: (content: string) => Promise<void>;
      onToolCall?: Parameters<ReturnType<typeof createChatLLMToolHandler>["callTool"]>[0];
      onError?: (error: Error | unknown) => Promise<void>;
    } = {},
  ) {
    if (!userId) throw new Error("userId is undefined");

    const [stream] = await Promise.all([
      createLLMChatCompletion(content, {
        stream: true,
        tools: Object.values(tools).map(({ name, description, schema }) => ({
          type: "function",
          function: { name, description, parameters: zodToJsonSchema(schema) },
        })),
      }),

      createChatLLMMessage({
        role: "user",
        user_id: userId,
        chat_id: chat.id,
        content: JSON.stringify(content),
      }),
    ]);

    const { handleDeltaTool, callTool } = createChatLLMToolHandler(tools);

    const responseText = await handleSteram(stream, {
      onTextToken,
      onToolCall: handleDeltaTool,
    });

    try {
      await Promise.all([
        (async () => {
          if (!responseText) return;
          return createChatLLMMessage({
            role: "assistant",
            user_id: userId,
            chat_id: chat.id,
            content: JSON.stringify(responseText),
          });
        })(),

        callTool(async (node, result) => {
          if (result?.props && "stream" in result.props) {
            const responseText = await handleSteram(result.props.stream, { onTextToken });
            await createChatLLMMessage({
              role: "assistant",
              user_id: userId,
              chat_id: chat.id,
              content: JSON.stringify(responseText),
            });
          } else {
            await Promise.all([
              onToolCall?.(node, result),
              createChatLLMMessage({
                role: "function",
                user_id: userId,
                chat_id: chat.id,
                content: JSON.stringify(result),
              }),
            ]);
          }
        }),
      ]);
    } catch (error) {
      if (IS_DEV) console.error(error);
      await onError?.(error);
    }
  }

  return { getMessages, clearMessages, sendMessage };
}
