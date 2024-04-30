import { FunctionToolCallDelta } from "openai/resources/beta/threads/runs/steps.mjs";
import { ReactNode } from "react";

import { chatLLMTools } from "@/chat/llm/tool";
import { isLLMToolKey } from "@/chat/llm/tool/lib/is-key";

type ToolCallResults = Awaited<ReturnType<(typeof chatLLMTools)[keyof typeof chatLLMTools]["call"]>>;

export function createChatLLMToolHandler() {
  let name = "";
  let args = "";

  function handleDeltaTool(tool?: FunctionToolCallDelta["function"]) {
    if (tool?.name) name = tool.name;
    if (tool?.arguments) args += tool.arguments;
  }

  async function callTool({
    onResult,
    onNode,
  }: {
    onResult?: (result: ToolCallResults) => Promise<void>;
    onNode?: (node: ReactNode) => Promise<void>;
  }) {
    if (isLLMToolKey(name)) {
      const tool = chatLLMTools[name];
      tool.setArgs(args);
      await tool.call();
      onResult?.(tool.getResult());
      onNode?.(tool.getNode());
    }
  }

  return { handleDeltaTool, callTool };
}
