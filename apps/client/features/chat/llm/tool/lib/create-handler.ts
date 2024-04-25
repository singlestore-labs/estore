import { FunctionToolCallDelta } from "openai/resources/beta/threads/runs/steps.mjs";

import { chatLLMTools } from "@/chat/llm/tool";
import { isLLMToolKey } from "@/chat/llm/tool/lib/is-key";

export function createChatLLMToolHandler() {
  let name = "";
  let args = "";

  function handleDeltaTool(tool?: FunctionToolCallDelta["function"]) {
    if (tool?.name) name = tool.name;
    if (tool?.arguments) args += tool.arguments;
  }

  function getTool() {
    if (isLLMToolKey(name)) {
      const tool = chatLLMTools[name];
      tool.setArgs(args);
      return tool;
    }
  }

  return { handleDeltaTool, getTool };
}
