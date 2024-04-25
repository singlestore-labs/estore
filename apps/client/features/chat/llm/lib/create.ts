import OpenAI from "openai";
import { ReactNode } from "react";
import zodToJsonSchema from "zod-to-json-schema";

import { chatLLMTools } from "@/chat/llm/tool";
import { createChatLLMToolHandler } from "@/chat/llm/tool/lib/create-handler";
import { OPENAI_API_KEY } from "@/constants/env";

export function createChatLLM() {
  const llm = new OpenAI({ apiKey: OPENAI_API_KEY });

  async function send(
    content: string,
    {
      onContent,
      onNode,
    }: {
      onContent?: (content: string) => Promise<void>;
      onNode?: (node: ReactNode) => Promise<void>;
    } = {},
  ) {
    const stream = await llm.chat.completions.create({
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
    });

    const { handleDeltaTool, callTool } = createChatLLMToolHandler();

    for await (const chunk of stream) {
      const tool = chunk.choices[0].delta.tool_calls?.[0]?.function;
      const content = chunk.choices[0].delta.content || "";
      if (tool) handleDeltaTool(tool);
      if (content) await onContent?.(content);
    }

    await callTool({
      onResult: async (result) => {},
      onNode: onNode,
    });
  }

  return { send };
}
