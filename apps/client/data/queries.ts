import { embeddings } from "@/data/embeddings";
import { createFindProductsQuery } from "@/product/queries/find";
import { Query } from "@/query/type";

export const queries = [
  {
    title: "Find products",
    description: "Finds product ids based on filters using hybrid search",
    getQuery: () => {
      return createFindProductsQuery(embeddings.jeans, {
        color: "blue",
        priceMin: 100,
        priceMax: 1000,
        gender: "women",
        size: "xs",
        limit: 5,
      });
    },
  },

  {
    title: "Top products",
    description: "Retrieves the best products based on sales and likes",
    getQuery: () => createFindProductsQuery([], {}),
  },

  {
    title: "Product sales",
    description: "Retrieves the sales history of products",
    getQuery: () => createFindProductsQuery([], {}),
  },
] satisfies Query[];
