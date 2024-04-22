import { DynamicStructuredTool } from "@langchain/core/tools";
import { db } from "@repo/db";
import { PRODUCTS_TABLE_NAME } from "@repo/db/constants";
import { z } from "zod";

import { CHAT_AGENT_TOOLS } from "@/chat/agent/tool/constants";
import { stringifyChatAgentToolOutput } from "@/chat/agent/tool/lib/stringify-output";
import { IS_DEV } from "@/constants/env";
import { Product } from "@/product/types";
import { getUserId } from "@/user/lib/get-id";

export function createChatAgentToolList() {
  return [
    new DynamicStructuredTool({
      name: CHAT_AGENT_TOOLS.find_products,
      description: `Useful when you need to find a product or many products`,
      returnDirect: true,
      schema: z.object({
        prompt: z.string().describe("Unmodified user's prompt"),
        limit: z.number().min(1).max(5).optional().describe("Number of products to search"),
      }),
      func: async ({ prompt, limit = 1 }) => {
        if (IS_DEV) console.log(CHAT_AGENT_TOOLS.find_products);
        try {
          const userId = await getUserId();
          console.log(userId);

          let query = `SELECT id, createdAt, description, image, price, gender FROM ${PRODUCTS_TABLE_NAME} LIMIT ${limit}`;

          const products = (await db.controllers.query<Product[]>({ query })).map((i) => ({
            ...i,
            sales: [],
            sizes: {},
            likes: 0,
          }));

          return stringifyChatAgentToolOutput({ name: CHAT_AGENT_TOOLS.find_products, props: { products } });
        } catch (error) {
          return stringifyChatAgentToolOutput({ name: CHAT_AGENT_TOOLS.find_products, props: {}, error });
        }
      },
    }),

    new DynamicStructuredTool({
      name: CHAT_AGENT_TOOLS.product_sales,
      description: `Useful when you need to retrieve a product sales history`,
      returnDirect: true,
      schema: z.object({ productId: z.number() }),
      func: async ({ productId }) => {
        if (IS_DEV) console.log(CHAT_AGENT_TOOLS.recommend_products);
        try {
          const sales: Product["sales"] = [];
          return stringifyChatAgentToolOutput({ name: CHAT_AGENT_TOOLS.recommend_products, props: { sales } });
        } catch (error) {
          return stringifyChatAgentToolOutput({ name: CHAT_AGENT_TOOLS.recommend_products, props: {}, error });
        }
      },
    }),

    new DynamicStructuredTool({
      name: CHAT_AGENT_TOOLS.top_product,
      description: `Useful when you need to retrieve the top product`,
      returnDirect: true,
      schema: z.object({}),
      func: async ({}) => {
        if (IS_DEV) console.log(CHAT_AGENT_TOOLS.top_product);
        try {
          const product: Product = {
            ...(
              await db.controllers.query<Product[]>({
                query: `SELECT id, createdAt, description, image, price, gender FROM ${PRODUCTS_TABLE_NAME} LIMIT 1`,
              })
            )[0],
            likes: 0,
            sales: [],
            sizes: {},
          };
          return stringifyChatAgentToolOutput({ name: CHAT_AGENT_TOOLS.top_product, props: { product } });
        } catch (error) {
          return stringifyChatAgentToolOutput({ name: CHAT_AGENT_TOOLS.top_product, props: {}, error });
        }
      },
    }),
  ];
}
