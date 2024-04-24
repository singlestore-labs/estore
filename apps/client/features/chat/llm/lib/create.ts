import OpenAI from "openai";

import { chatLLMTools } from "@/chat/llm/tool";
import { createChatLLMTool } from "@/chat/llm/tool/lib/create";
import { createChatLLMToolHandler } from "@/chat/llm/tool/lib/create-handler";
import { formatChatLLMTools } from "@/chat/llm/tool/lib/format";
import { OPENAI_API_KEY } from "@/constants/env";

export function createChatLLM() {
  const llm = new OpenAI({ apiKey: OPENAI_API_KEY });

  async function send(
    content: string,
    {
      onContent,
      onTool,
    }: {
      onContent?: (content: string) => Promise<void> | void;
      onTool?: (
        tool: Exclude<ReturnType<ReturnType<typeof createChatLLMToolHandler>["getTool"]>, undefined>,
      ) => Promise<void> | void;
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
      tools: formatChatLLMTools(Object.values(chatLLMTools)),
    });

    const toolHandler = createChatLLMToolHandler();

    for await (const chunk of stream) {
      const tool = chunk.choices[0].delta.tool_calls?.[0]?.function;
      const content = chunk.choices[0].delta.content || "";
      if (tool) toolHandler.handle(tool);
      if (content) await onContent?.(content);
    }

    const tool = toolHandler.getTool();
    if (tool) onTool?.(tool);
  }

  return { send } as const;
}
