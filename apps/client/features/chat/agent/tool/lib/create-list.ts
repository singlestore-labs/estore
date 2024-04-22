import { DynamicStructuredTool } from "@langchain/core/tools";
import { db } from "@repo/db";
import { PRODUCTS_TABLE_NAME } from "@repo/db/constants";
import { z } from "zod";

import { CHAT_AGENT_TOOLS } from "@/chat/agent/tool/constants";
import { stringifyChatAgentToolOutput } from "@/chat/agent/tool/lib/stringify-output";
import { IS_DEV } from "@/constants/env";
import { Product } from "@/product/types";

export function createChatAgentToolList() {
  return [
    new DynamicStructuredTool({
      name: CHAT_AGENT_TOOLS.find_products,
      description: `Useful when you need to find number of products`,
      schema: z.object({
        prompt: z.string().describe("Unmodified user's prompt"),
        limit: z.number().min(1).max(5).optional().describe("Number of products to search"),
      }),
      func: async ({ prompt, limit = 1 }) => {
        if (IS_DEV) console.log(CHAT_AGENT_TOOLS.find_products);
        try {
          let query = `SELECT id, createdAt, description, image, price, gender FROM ${PRODUCTS_TABLE_NAME} LIMIT ${limit}`;
          const result: Product[] = await db.controllers.query({ query });
          return stringifyChatAgentToolOutput({ name: CHAT_AGENT_TOOLS.find_products, props: { result } });
        } catch (error) {
          return stringifyChatAgentToolOutput({ name: CHAT_AGENT_TOOLS.find_products, props: {}, error });
        }
      },
    }),

    new DynamicStructuredTool({
      name: CHAT_AGENT_TOOLS.product_sales,
      description: `Useful when you need to retrieve a product sales history`,
      schema: z.object({ productId: z.number() }),
      func: async ({ productId }) => {
        if (IS_DEV) console.log(CHAT_AGENT_TOOLS.recommend_products);
        try {
          const result: Product["sales"] = [];
          return stringifyChatAgentToolOutput({ name: CHAT_AGENT_TOOLS.recommend_products, props: { result } });
        } catch (error) {
          return stringifyChatAgentToolOutput({ name: CHAT_AGENT_TOOLS.recommend_products, props: {}, error });
        }
      },
    }),

    new DynamicStructuredTool({
      name: CHAT_AGENT_TOOLS.top_product,
      description: `Useful when you need to retrieve the top product`,
      schema: z.object({}),
      func: async ({}) => {
        if (IS_DEV) console.log(CHAT_AGENT_TOOLS.top_product);
        try {
          const result = await db.controllers.query({
            query: `SELECT id, createdAt, description, image, price, gender FROM ${PRODUCTS_TABLE_NAME} LIMIT 1`,
          });
          return stringifyChatAgentToolOutput({ name: CHAT_AGENT_TOOLS.top_product, props: { result } });
        } catch (error) {
          return stringifyChatAgentToolOutput({ name: CHAT_AGENT_TOOLS.top_product, props: {}, error });
        }
      },
    }),
  ];
}
