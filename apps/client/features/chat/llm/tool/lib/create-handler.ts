import { FunctionToolCallDelta } from "openai/resources/beta/threads/runs/steps.mjs";

import { chatLLMTools } from "@/chat/llm/tool";
import { isLLMToolKey } from "@/chat/llm/tool/lib/is-key";

export function createChatLLMToolHandler() {
  const props = { name: "", arguments: "" };

  function handle(tool?: FunctionToolCallDelta["function"]) {
    if (tool?.name) props.name = tool.name;
    if (tool?.arguments) props.arguments += tool.arguments;
  }

  function getTool() {
    if (isLLMToolKey(props.name)) {
      return chatLLMTools[props.name];
    }
  }

  return { handle, getTool };
}
