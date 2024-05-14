import { db } from "@repo/db";
import { ORDERS_TABLE_NAME } from "@repo/db/constants";

export async function getTotalOrders() {
  try {
    const result = await db.controllers.query<{ week_range: string; value: number }[]>({
      query: `\
        SELECT
          CONCAT(
            DATE_FORMAT(DATE_SUB(created_at, INTERVAL WEEKDAY(created_at) DAY), '%Y-%m-%d'),
            ' - ',
            DATE_FORMAT(DATE_ADD(DATE_SUB(created_at, INTERVAL WEEKDAY(created_at) DAY), INTERVAL 6 DAY), '%Y-%m-%d')
          ) AS week_range,
          COUNT(*) AS value
        FROM ${ORDERS_TABLE_NAME}
        WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 12 WEEK)
        GROUP BY week_range
        ORDER BY week_range ASC
      `,
    });

    return {
      total: result.reduce((acc, i) => acc + i.value, 0),
      history: result,
    };
  } catch (error) {
    console.error(error);
    return { total: 0, history: [] };
  }
}
