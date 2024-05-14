import { db } from "@repo/db";
import { ORDERS_TABLE_NAME } from "@repo/db/constants";

export async function getTotalOrders() {
  try {
    const result = await db.controllers.query<{ week_start: Date; value: number }[]>({
      query: `\
        SELECT
          DATE_SUB(DATE(created_at), INTERVAL WEEKDAY(created_at) DAY) AS week_start,
          COUNT(*) AS value
        FROM ${ORDERS_TABLE_NAME}
        WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 12 WEEK)
        GROUP BY week_start
        ORDER BY week_start ASC
      `,
    });

    return {
      total: result.reduce((acc, i) => acc + i.value, 0),
      history: result.map((i) => ({ ...i, week_start: i.week_start.toLocaleDateString() })),
    };
  } catch (error) {
    console.error(error);
    return { total: 0, history: [] };
  }
}
