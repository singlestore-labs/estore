import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";

import { CHAT_AGENT_TOOLS } from "@/chat/agent/tool/constants";
import { stringifyChatAgentToolOutput } from "@/chat/agent/tool/lib/stringify-output";
import { IS_DEV } from "@/constants/env";
import { getProducts } from "@/product/lib/get-many";
import { getProductSales } from "@/product/sales/lib/get-by-id";
import { Product } from "@/product/types";
import { getUserId } from "@/user/lib/get-id";

export function createChatAgentToolList() {
  return [
    new DynamicStructuredTool({
      name: CHAT_AGENT_TOOLS.find_products,
      description: `Useful when you need to find products`,
      returnDirect: true,
      schema: z.object({
        prompt: z.string().describe("Unmodified user's prompt"),
        limit: z.number().min(1).optional().describe("Number of products to search"),
      }),
      func: async ({ prompt, limit = 1 }) => {
        if (IS_DEV) console.log(CHAT_AGENT_TOOLS.find_products);
        try {
          const userId = await getUserId();
          const products = await getProducts({ limit });
          return stringifyChatAgentToolOutput({ name: CHAT_AGENT_TOOLS.find_products, props: { products } });
        } catch (error) {
          return stringifyChatAgentToolOutput({ name: CHAT_AGENT_TOOLS.find_products, props: {}, error });
        }
      },
    }),

    new DynamicStructuredTool({
      name: CHAT_AGENT_TOOLS.product_sales,
      description: `Useful when you need to retrieve a product sales history chart`,
      returnDirect: true,
      schema: z.object({ title: z.string().describe("Product title or description") }),
      func: async ({ title: description }) => {
        if (IS_DEV) console.log(CHAT_AGENT_TOOLS.product_sales);
        try {
          const sales: Product["sales"] = await getProductSales({ description });
          return stringifyChatAgentToolOutput({ name: CHAT_AGENT_TOOLS.product_sales, props: { sales } });
        } catch (error) {
          return stringifyChatAgentToolOutput({ name: CHAT_AGENT_TOOLS.product_sales, props: {}, error });
        }
      },
    }),

    new DynamicStructuredTool({
      name: CHAT_AGENT_TOOLS.top_product,
      description: `Useful when you need to find the top product`,
      returnDirect: true,
      schema: z.object({}),
      func: async () => {
        if (IS_DEV) console.log(CHAT_AGENT_TOOLS.top_product);
        try {
          const product: Product = (await getProducts({ limit: 1 }))[0];
          return stringifyChatAgentToolOutput({ name: CHAT_AGENT_TOOLS.top_product, props: { product } });
        } catch (error) {
          return stringifyChatAgentToolOutput({ name: CHAT_AGENT_TOOLS.top_product, props: {}, error });
        }
      },
    }),
  ];
}
