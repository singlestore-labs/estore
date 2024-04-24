import { ChatCompletionTool } from "openai/resources/chat/completions.mjs";
import zodToJsonSchema from "zod-to-json-schema";

import { createChatLLMTool } from "@/chat/llm/tool/lib/create";

export function formatChatLLMTools(tools: ReturnType<typeof createChatLLMTool>[]): ChatCompletionTool[] {
  return tools.map(({ name, description, schema }) => ({
    type: "function",
    function: { name, description, parameters: zodToJsonSchema(schema) },
  }));
}
