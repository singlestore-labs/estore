const ROOT = "/";
const withRoot = (path: string) => `${ROOT}${path}`;

const PRODUCTS = withRoot("products");
const PRODUCT_BY_ID = (id: string) => `${PRODUCTS}/${id}`;

export const ROUTES = {
  ROOT,
  PRODUCTS,
  PRODUCT_BY_ID,
  withRoot,
} as const;
