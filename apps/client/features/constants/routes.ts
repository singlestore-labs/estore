const ROOT = "/";
const withRoot = (path: string) => `${ROOT}${path}`;

const PRODUCT = withRoot("product");
const PRODUCT_BY_ID = (id: string) => `${PRODUCT}/${id}`;

export const ROUTES = {
  ROOT,
  PRODUCT,
  PRODUCT_BY_ID,
  withRoot,
} as const;
