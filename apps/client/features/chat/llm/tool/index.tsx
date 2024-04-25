import { z } from "zod";

import { createChatLLMTool } from "@/chat/llm/tool/lib/create";
import { ChatMessageProductCard } from "@/chat/message/product/components/card";
import { ChatMessageProductController } from "@/chat/message/product/components/controller";
import { ChatMessageProdcutSalesChart } from "@/chat/message/product/components/sales-chart";
import { findProducts } from "@/product/lib/find-many";
import { getProducts } from "@/product/lib/get-many";
import { getProductRandomId } from "@/product/lib/get-random-id";
import { getRecommendedProducts } from "@/product/lib/get-recommended";
import { getTopProduct } from "@/product/lib/get-top";
import { getUserId } from "@/user/lib/get-id";

export const chatLLMTools = {
  find_products: createChatLLMTool({
    name: "find_products",
    description: "Useful when you need to find products",
    schema: z.object({
      prompt: z.string().describe("Unmodified user's prompt"),
      limit: z.number().min(1).optional().describe("Number of products to search"),
    }),
    node: ChatMessageProductController,
    call: async ({ prompt, limit }) => {
      const products = await findProducts(prompt, { limit });
      return { name: "find_products", props: { products } };
    },
  }),

  recommend_products: createChatLLMTool({
    name: "recommend_products",
    description: "Useful when you need to recommend products",
    schema: z.object({
      prompt: z.string().describe("Unmodified user's prompt"),
      limit: z.number().min(1).optional().describe("Number of products to recommend"),
    }),
    node: ChatMessageProductController,
    call: async ({ prompt, limit }) => {
      const userId = await getUserId();
      if (!userId) throw new Error("userId is undefined");
      const products = await getRecommendedProducts(prompt, userId, { limit });
      return { name: "recommend_products", props: { products } };
    },
  }),

  product_sales: createChatLLMTool({
    name: "product_sales",
    description: "Useful when you need to retrieve a product sales history chart",
    schema: z.object({ title: z.string().describe("Product title or description").optional() }),
    node: ChatMessageProdcutSalesChart,
    call: async ({ title: description }) => {
      const filter = description ? { description } : { id: await getProductRandomId() };
      const [[key, value]] = Object.entries(filter);
      const product = (await getProducts({ where: `LOWER(${key}) = '${value}'`, limit: 1 }))[0];
      return { name: "product_sales", props: { product } };
    },
  }),

  top_product: createChatLLMTool({
    name: "top_product",
    description: "Useful when you need to retrieve a product sales history chart",
    schema: z.object({}),
    node: ChatMessageProductCard,
    call: async ({}) => {
      const product = await getTopProduct();
      return { name: "top_product", props: { product } };
    },
  }),
};
