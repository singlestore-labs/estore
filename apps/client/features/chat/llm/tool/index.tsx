import { z } from "zod";

import { createChatLLMTool } from "@/chat/llm/tool/lib/create";
import { ChatMessageProductCard } from "@/chat/message/product/components/card";
import { ChatMessageProductController } from "@/chat/message/product/components/controller";
import { ChatMessageProdcutSalesChart } from "@/chat/message/product/components/sales-chart";
import { findProducts } from "@/product/lib/find";
import { getProducts } from "@/product/lib/get";
import { getRandomProductIds } from "@/product/lib/get-random-ids";
import { getRecommendedProducts } from "@/product/lib/get-recommended";
import { getTopProduct } from "@/product/lib/get-top";
import { getUserId } from "@/user/lib/get-id";

export const chatLLMTools = {
  find_products: createChatLLMTool({
    name: "find_products",
    description: "Useful when you need to find products",
    schema: z.object({
      prompt: z.string().describe("User's prompt"),
      color: z.string().describe("Product color").optional(),
      priceMax: z.number().describe("Product max price").optional(),
      priceMin: z.number().describe("Product min price").optional(),
      gender: z.enum(["women", "unisex"]).describe("What gender the product is for").optional(),
      size: z.enum(["xxxs", "xxs", "xs", "s", "m", "l", "xl", "oneSize"]).describe("Product size").optional(),
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
    schema: z.object({ limit: z.number().min(1).optional().describe("Number of products to get") }),
    node: ChatMessageProductController,
    call: async ({ limit }) => {
      const productIds = await getRandomProductIds({ limit });
      const products = await getProducts({ where: `id IN (${productIds.join(",")})`, limit });
      return { name: "get_random_products", props: { products } };
    },
  }),

  recommend_products: createChatLLMTool({
    name: "recommend_products",
    description: "Useful when you need to recommend products",
    schema: z.object({ limit: z.number().min(1).optional().describe("Number of products to recommend") }),
    node: ChatMessageProductController,
    call: async ({ limit }) => {
      const userId = await getUserId();
      if (!userId) throw new Error("userId is undefined");
      const products = await getRecommendedProducts(userId, { limit });
      return { name: "recommend_products", props: { products } };
    },
  }),

  get_product_sales: createChatLLMTool({
    name: "get_product_sales",
    description: "Useful when you to get a product sales history chart",
    schema: z.object({ title: z.string().describe("Product title or description").optional() }),
    node: ChatMessageProdcutSalesChart,
    call: async ({ title: description }) => {
      const filter = description ? { description } : { id: (await getRandomProductIds())[0] };
      const [[key, value]] = Object.entries(filter);
      const result = await getProducts({
        where: `LOWER(${key}) = '${value}'`,
        limit: 1,
        metaColumns: ["sales"],
      });
      return { name: "get_product_sales", props: { product: result[0] } };
    },
  }),

  get_top_product: createChatLLMTool({
    name: "get_top_product",
    description: "Useful when you need to get the top product",
    schema: z.object({}),
    node: ChatMessageProductCard,
    call: async ({}) => {
      const product = await getTopProduct();
      return { name: "get_top_product", props: { product } };
    },
  }),
};
