import { ANALYTICS_QUERY_SLUGS } from "@/analytics/query/constants/slugs";
import { AnalyticsQuery } from "@/analytics/query/type";
import { embeddings } from "@/data/embeddings";
import { createFindProductIdsQuery } from "@/product/queries/find-ids";
import { createGetTopProductIdsQuery } from "@/product/queries/get-top-ids";
import { createGetProductSalesHistoryQuery } from "@/product/sales/queries/get-history";

export const ANALYTICS_QUERY_LIST = [
  {
    slug: ANALYTICS_QUERY_SLUGS.find_products,
    title: "Find products",
    description: "Finds product ids based on filters using hybrid search",
    getQuery: () => {
      return createFindProductIdsQuery(embeddings.jeans, {
        color: "blue",
        priceMin: 100,
        priceMax: 1000,
        size: "xs",
        limit: 5,
      });
    },
  },

  {
    slug: ANALYTICS_QUERY_SLUGS.top_products,
    title: "Top products",
    description: "Retrieves the top product ids based on sales and likes",
    getQuery: () => createGetTopProductIdsQuery({ limit: 10 }),
  },

  {
    slug: ANALYTICS_QUERY_SLUGS.product_sales,
    title: "Product sales",
    description: "Retrieves the sales history of a product",
    getQuery: () => createGetProductSalesHistoryQuery({ id: 1 }),
  },
] satisfies AnalyticsQuery[];
