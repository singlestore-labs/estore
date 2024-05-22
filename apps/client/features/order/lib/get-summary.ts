import { db } from "@repo/db";

import { createGetOrdersSummaryQuery } from "@/order/queries/get-summary";

export async function getOrdersSummary(...args: Parameters<typeof createGetOrdersSummaryQuery>) {
  const [
    totalOrders,
    totalRevenue,
    uniqueCustomers,
    ordersByDay,
    topSellingProducts,
    ordersByProductType,
    customersTotalSpent,
  ] = await db.controllers.query<
    [
      { total_orders: number }[],
      { total_revenue: string }[],
      { unique_customers: number }[],
      { order_date: Date; orders_count: number }[],
      { id: number; description: string; orders_count: number }[],
      { label: string; orders_count: number }[],
      { user_kd: number; total_spent: string }[],
    ]
  >({
    query: createGetOrdersSummaryQuery(...args),
  });

  return {
    totalOrders,
    totalRevenue,
    uniqueCustomers,
    ordersByDay,
    topSellingProducts,
    ordersByProductType,
    customersTotalSpent,
  };
}
