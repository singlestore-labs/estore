import { createLLMChatCompletion } from "@repo/ai";
import { db } from "@repo/db";
import {
  ORDERS_TABLE_NAME,
  PRODUCTS_TABLE_NAME,
  PRODUCT_LIKES_TABLE_NAME,
  PRODUCT_SIZES_TABLE_NAME,
  PRODUCT_SKU_TABLE_NAME,
  PRODUCT_TYPES_TABLE_NAME,
  USERS_TABLE_NAME,
} from "@repo/db/constants";
import { getDatabaseSchema } from "@repo/db/lib/get-schema";
import { z } from "zod";

import { createChatLLMTool } from "@/chat/llm/tool/lib/create";
import { ChatMessageProductCard } from "@/chat/message/product/components/card";
import { ChatMessageProductController } from "@/chat/message/product/components/controller";
import { ChatMessageProdcutSalesChart } from "@/chat/message/product/components/sales-chart";
import { Chat } from "@/chat/types";
import { getOrdersSummary } from "@/order/lib/get-summary";
import { findProducts } from "@/product/lib/find";
import { getProducts } from "@/product/lib/get";
import { getRandomProductIds } from "@/product/lib/get-random-ids";
import { getRecommendedProducts } from "@/product/lib/get-recommended";
import { getTopProducts } from "@/product/lib/get-top";
import { getUserId } from "@/user/lib/get-id";

export type ChatLLMTools = Record<string, ReturnType<typeof createChatLLMTool>>;
export type ChatLLMToolsMap = Record<Chat["name"], ChatLLMTools>;

export const chatLLMTools: ChatLLMToolsMap = {
  main: {
    find_products: createChatLLMTool({
      name: "find_products",
      description: "Useful when you need to find products",
      schema: z.object({
        prompt: z.string().describe("User's prompt"),
        color: z.string().describe("Product color").optional(),
        price: z.number().describe("Product exact price").optional(),
        priceMax: z.number().describe("Product max price").optional(),
        priceMin: z.number().describe("Product min price").optional(),
        gender: z.enum(["women", "unisex"]).describe("What gender the product is for").optional(),
        size: z
          .enum(["xxxs", "xxs", "xs", "s", "m", "l", "xl", "xxl", "oneSize"])
          .describe("Product size")
          .optional(),
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
      schema: z.object({ title: z.string().describe("Product title").optional() }),
      node: ChatMessageProdcutSalesChart,
      call: async ({ title }) => {
        const filter = title ? { title } : { id: (await getRandomProductIds())[0] };
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
        const product = (await getTopProducts({ limit: 1 }))[0];
        return { name: "get_top_product", props: { product } };
      },
    }),
  },

  dashboard: {
    get_orders_summary: createChatLLMTool({
      name: "get_orders_summary",
      description: "Useful when you need to get a summary of orders",
      schema: z.object({
        interval: z.number().describe("Interval").optional(),
        intervalUnit: z.enum(["DAY", "WEEK", "MONTH"]).describe("Interval unit").optional(),
      }),
      call: async ({ interval = 1, intervalUnit = "MONTH" }) => {
        const result = await getOrdersSummary({ interval, intervalUnit });

        const stream = await createLLMChatCompletion(
          `The context:\n${JSON.stringify(result)}
          `,
          {
            systemRole: `\
              You are an e-commerce assistant.
              You must write a summary based on the provided context.
              Your response must contain markdown.
            `,
            stream: true,
          },
        );

        return { name: "get_orders_summary", props: { stream } };
      },
    }),

    query_db: createChatLLMTool({
      name: "query_db",
      description: `Useful when you need to answer a user's question about the following data: ${[
        USERS_TABLE_NAME,
        PRODUCTS_TABLE_NAME,
        PRODUCT_SKU_TABLE_NAME,
        PRODUCT_SIZES_TABLE_NAME,
        PRODUCT_TYPES_TABLE_NAME,
        PRODUCT_LIKES_TABLE_NAME,
        ORDERS_TABLE_NAME,
      ].join(", ")}.`,
      schema: z.object({ prompt: z.string().describe("The user's prompt") }),
      call: async ({ prompt }) => {
        const schema = await getDatabaseSchema();
        const queryNotAllowedKey = "Query not allowed";

        const queryCompletion = await createLLMChatCompletion(
          `${prompt}\nThe MySQL database schema:\n${JSON.stringify(schema)}
          `,
          {
            systemRole: `\
              You are a MySQL database expert.
              You must write MySQL query to answer the user's prompt.
              If the user request relates to a CREATE or DELETE or UPDATE operation, your response must contain "${queryNotAllowedKey}".
              Else your response must contain the MySQL query only without any formatting.
              Columns ending in "_v" are forbidden and must be removed from the query.
            `,
          },
        );

        if (typeof queryCompletion === "object" && queryCompletion && "choices" in queryCompletion) {
          const query = queryCompletion.choices[0].message.content;
          if (!query) throw new Error(`Query undefined`);
          if (query.includes(queryNotAllowedKey)) throw new Error(queryNotAllowedKey);

          const context = await db.controllers.query({ query });

          const stream = await createLLMChatCompletion(`${prompt}\nThe context:\n${JSON.stringify(context)}`, {
            systemRole: `\
              You are an e-commerce assistant.
              You must answer a user's question based on the provided context.
              Your response must contain markdown.
            `,
            stream: true,
          });

          return { name: "query_db", props: { stream } };
        }

        throw new Error("Something went wrong :)");
      },
    }),
  },
};
