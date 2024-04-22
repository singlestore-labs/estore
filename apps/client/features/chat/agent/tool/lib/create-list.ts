import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";

import { CHAT_AGENT_TOOLS } from "@/chat/agent/tool/constants";
import { stringifyChatAgentToolOutput } from "@/chat/agent/tool/lib/stringify-output";
import { IS_DEV } from "@/constants/env";

export function createChatAgentToolList() {
  return [
    new DynamicStructuredTool({
      name: CHAT_AGENT_TOOLS.db_schema,
      description: `Useful when you need to retrieve a MySQL database schema.`,
      schema: z.object({}),
      func: async () => {
        if (IS_DEV) console.log(CHAT_AGENT_TOOLS.db_schema);
        try {
          const result = {};
          return stringifyChatAgentToolOutput({ name: CHAT_AGENT_TOOLS.db_schema, props: { result } });
        } catch (error) {
          return stringifyChatAgentToolOutput({ name: CHAT_AGENT_TOOLS.db_schema, props: {}, error });
        }
      },
    }),
  ];
}
