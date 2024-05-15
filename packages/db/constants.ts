export const DB_HOST = process.env.DB_HOST || "";
export const DB_USER = process.env.DB_USER || "";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_NAME = process.env.DB_NAME || "";

export const USERS_TABLE_NAME = "users";
export const PRODUCTS_TABLE_NAME = "products";
export const PRODUCT_SKU_TABLE_NAME = "product_sku";
export const PRODUCT_SIZES_TABLE_NAME = "product_sizes";
export const PRODUCT_TYPES_TABLE_NAME = "product_types";
export const PRODUCT_LIKES_TABLE_NAME = "product_likes";
export const ORDERS_TABLE_NAME = "orders";
export const CHAT_MESSAGES_TABLE_NAME = "chat_messages";

export const TABLE_NAMES = [
  USERS_TABLE_NAME,
  PRODUCTS_TABLE_NAME,
  PRODUCT_SKU_TABLE_NAME,
  PRODUCT_SIZES_TABLE_NAME,
  PRODUCT_TYPES_TABLE_NAME,
  PRODUCT_LIKES_TABLE_NAME,
  ORDERS_TABLE_NAME,
  CHAT_MESSAGES_TABLE_NAME,
] as const;
