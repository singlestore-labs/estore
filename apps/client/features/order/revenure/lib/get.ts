import { db } from "@repo/db";
import { ORDERS_TABLE_NAME, PRODUCTS_TABLE_NAME, PRODUCT_SKU_TABLE_NAME } from "@repo/db/constants";

export async function getOrdersRevenue() {
  try {
    const result = await db.controllers.query<{ order_date: Date; value: string }[]>({
      query: `\
        SELECT
            DATE(orders.created_at) AS order_date,
            SUM(products.price) AS value
        FROM ${ORDERS_TABLE_NAME} orders
        JOIN (SELECT id, product_id FROM ${PRODUCT_SKU_TABLE_NAME}) sku ON orders.product_sku_id = sku.id
        JOIN (SELECT id, price FROM ${PRODUCTS_TABLE_NAME}) products ON sku.product_id = products.id
        WHERE orders.created_at >= CURDATE() - INTERVAL 14 DAY
        GROUP BY DATE(orders.created_at)
        ORDER BY DATE(orders.created_at)
      `,
    });

    const maxValue = Math.max(...result.map((i) => +i.value));

    return {
      total: result.reduce((acc, i) => acc + +i.value, 0),
      history: result.map((i) => ({
        ...i,
        order_date: i.order_date.toLocaleDateString(),
        percent: (+i.value / maxValue) * 100,
      })),
    };
  } catch (error) {
    console.error(error);
    return { total: 0, history: [] };
  }
}
