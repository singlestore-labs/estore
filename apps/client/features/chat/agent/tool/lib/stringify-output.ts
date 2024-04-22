import { ChatAgentToolOutput } from "@/chat/agent/tool/types";

export function stringifyChatAgentToolOutput<T extends Omit<ChatAgentToolOutput, "role">>(tool: T) {
  return JSON.stringify({ ...tool, role: "function" } satisfies ChatAgentToolOutput);
}
