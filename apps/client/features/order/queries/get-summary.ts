import {
  ORDERS_TABLE_NAME,
  PRODUCTS_TABLE_NAME,
  PRODUCT_SKU_TABLE_NAME,
  PRODUCT_TYPES_TABLE_NAME,
} from "@repo/db/constants";

export function createGetOrdersSummaryQuery({
  interval = 1,
  intervalUnit = "MONTH",
}: { interval?: number; intervalUnit?: "DAY" | "WEEK" | "MONTH" } = {}) {
  const intervalDef = `INTERVAL ${interval} ${intervalUnit}`;

  return `\
-- Total number of orders
SELECT COUNT(*) AS total_orders
FROM ${ORDERS_TABLE_NAME}
WHERE created_at >= NOW() - ${intervalDef};

-- Total revenue
SELECT SUM(products.price) AS total_revenue
FROM ${ORDERS_TABLE_NAME} orders
JOIN ${PRODUCT_SKU_TABLE_NAME} sku ON orders.product_sku_id = sku.id
JOIN ${PRODUCTS_TABLE_NAME} products ON sku.product_id = products.id
WHERE orders.created_at >= NOW() - ${intervalDef};

-- Number of unique customers
SELECT COUNT(DISTINCT user_id) AS unique_customers
FROM ${ORDERS_TABLE_NAME}
WHERE created_at >= NOW() - ${intervalDef};

-- Orders per day
SELECT
    DATE(created_at) AS order_date,
    COUNT(*) AS orders_count
FROM ${ORDERS_TABLE_NAME}
WHERE created_at >= NOW() - ${intervalDef}
GROUP BY DATE(created_at)
ORDER BY DATE(created_at) ASC;

-- Top-selling products
SELECT
    products.id,
    products.title,
    COUNT(orders.id) AS orders_count
FROM ${ORDERS_TABLE_NAME} orders
JOIN ${PRODUCT_SKU_TABLE_NAME} sku ON orders.product_sku_id = sku.id
JOIN ${PRODUCTS_TABLE_NAME} products ON sku.product_id = products.id
WHERE orders.created_at >= NOW() - ${intervalDef}
GROUP BY products.id, products.title
ORDER BY orders_count DESC
LIMIT 10;

-- Orders by product type
SELECT
    product_types.label,
    COUNT(orders.id) AS orders_count
FROM ${ORDERS_TABLE_NAME} orders
JOIN ${PRODUCT_SKU_TABLE_NAME} sku ON orders.product_sku_id = sku.id
JOIN ${PRODUCTS_TABLE_NAME} products ON sku.product_id = products.id
JOIN ${PRODUCT_TYPES_TABLE_NAME} product_types ON products.type_id = product_types.id
WHERE orders.created_at >= NOW() - ${intervalDef}
GROUP BY product_types.label
ORDER BY COUNT(orders.id) DESC
LIMIT 10;

-- Top customers by total spend
SELECT
    orders.user_id,
    SUM(products.price) AS total_spent
FROM ${ORDERS_TABLE_NAME} orders
JOIN ${PRODUCT_SKU_TABLE_NAME} sku ON orders.product_sku_id = sku.id
JOIN ${PRODUCTS_TABLE_NAME} products ON sku.product_id = products.id
WHERE orders.created_at >= NOW() - ${intervalDef}
GROUP BY orders.user_id
ORDER BY total_spent DESC
LIMIT 10;

`;
}
