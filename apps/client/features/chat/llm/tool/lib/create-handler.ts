import { FunctionToolCallDelta } from "openai/resources/beta/threads/runs/steps.mjs";

import { ChatLLMTools } from "@/chat/llm/tool";
import { isLLMToolKey } from "@/chat/llm/tool/lib/is-key";

export function createChatLLMToolHandler(tools: ChatLLMTools) {
  let name = "";
  let args = "";

  function handleDeltaTool(tool?: FunctionToolCallDelta["function"]) {
    if (tool?.name) name = tool.name;
    if (tool?.arguments) args += tool.arguments;
  }

  async function callTool(
    callback?: (
      node: ReturnType<ChatLLMTools[keyof ChatLLMTools]["getNode"]>,
      result: ReturnType<ChatLLMTools[keyof ChatLLMTools]["getResult"]>,
    ) => Promise<void>,
  ) {
    if (isLLMToolKey(name)) {
      const tool = tools[name];
      tool.setArgs(args);
      await tool.call();
      await callback?.(tool.getNode(), tool.getResult());
    }
  }

  return { handleDeltaTool, callTool };
}
