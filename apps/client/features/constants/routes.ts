import { Product } from "@/product/types";

const ROOT = "/";
const withRoot = (path: string) => `${ROOT}${path}`;

const PRODUCT = withRoot("product");
const PRODUCT_BY_ID = (id: Product["id"]) => `${PRODUCT}/${id}`;

const DASHBOARD = withRoot("dashboard");
const ANALYTICS = withRoot("analytics");

export const ROUTES = {
  ROOT,
  PRODUCT,
  PRODUCT_BY_ID,
  DASHBOARD,
  ANALYTICS,
  withRoot,
} as const;
