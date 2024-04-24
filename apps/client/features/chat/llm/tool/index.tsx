import { z } from "zod";

import { createChatLLMTool } from "@/chat/llm/tool/lib/create";
import { ChatMessageProductController } from "@/chat/message/product/components/controller";

export const chatLLMTools = {
  find_products: createChatLLMTool(
    {
      name: "find_products",
      description: "Useful when you need to find products",
      schema: z.object({
        prompt: z.string().describe("Unmodified user's prompt"),
        limit: z.number().min(1).optional().describe("Number of products to search"),
      }),
    },
    async ({ prompt, limit }) => {
      return { name: "find_products", props: { products: [] } };
    },
    ({ products }) => <ChatMessageProductController products={products} />,
  ),
};
