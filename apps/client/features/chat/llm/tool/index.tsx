import { z } from "zod";

import { createChatLLMTool } from "@/chat/llm/tool/lib/create";
import { ChatMessageProductCard } from "@/chat/message/product/components/card";
import { ChatMessageProductController } from "@/chat/message/product/components/controller";
import { ChatMessageProdcutSalesChart } from "@/chat/message/product/components/sales-chart";
import { findProducts } from "@/product/lib/find-many";
import { getProducts } from "@/product/lib/get-many";
import { getProductRandomIds } from "@/product/lib/get-random-ids";
import { getRecommendedProducts } from "@/product/lib/get-recommended";
import { getTopProduct } from "@/product/lib/get-top";
import { getUserId } from "@/user/lib/get-id";

export const chatLLMTools = {
  find_products: createChatLLMTool({
    name: "find_products",
    description: "Useful when you need to find products",
    schema: z.object({
      prompt: z.string().describe("Unmodified user's prompt"),
      color: z.string().describe("Product color").optional(),
      priceMax: z.number().describe("Product max price").optional(),
      priceMin: z.number().describe("Product min price").optional(),
      gender: z.string().describe("Product gender").optional(),
      size: z.string().describe("Product size in the following format: xxxs, xxs, xs, s, m, l, xl").optional(),
      limit: z.number().min(1).optional().describe("Number of products to search"),
    }),
    node: ChatMessageProductController,
    call: async ({ prompt, ...filter }) => {
      const products = await findProducts(prompt, filter);
      return { name: "find_products", props: { products } };
    },
  }),

  get_random_products: createChatLLMTool({
    name: "get_random_products",
    description: "Useful when you need to get random products",
    schema: z.object({
      limit: z.number().min(1).optional().describe("Number of products to get"),
    }),
    node: ChatMessageProductController,
    call: async ({ limit }) => {
      const productIDs = await getProductRandomIds({ limit });
      const products = await getProducts({ where: `id IN (${productIDs.join(",")})`, limit });
      return { name: "get_random_products", props: { products } };
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

  get_product_sales: createChatLLMTool({
    name: "get_product_sales",
    description: "Useful when you need to retrieve a product sales history chart",
    schema: z.object({ title: z.string().describe("Product title or description").optional() }),
    node: ChatMessageProdcutSalesChart,
    call: async ({ title: description }) => {
      const filter = description ? { description } : { id: (await getProductRandomIds())[0] };
      const [[key, value]] = Object.entries(filter);
      const product = (await getProducts({ where: `LOWER(${key}) = '${value}'`, limit: 1 }))[0];
      return { name: "get_product_sales", props: { product } };
    },
  }),

  get_top_product: createChatLLMTool({
    name: "get_top_product",
    description: "Useful when you need to retrieve a product sales history chart",
    schema: z.object({}),
    node: ChatMessageProductCard,
    call: async ({}) => {
      const product = await getTopProduct();
      return { name: "get_top_product", props: { product } };
    },
  }),
};
