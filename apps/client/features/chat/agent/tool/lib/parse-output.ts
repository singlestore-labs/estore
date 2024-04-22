import { ChatAgentToolOutput } from "@/chat/agent/tool/types";

export function parseChatAgentToolOutput(output: string): ChatAgentToolOutput {
  return JSON.parse(output);
}
