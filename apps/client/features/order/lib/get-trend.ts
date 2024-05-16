import { db } from "@repo/db";
import { ORDERS_TABLE_NAME } from "@repo/db/constants";

export async function getOrdersTrend() {
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

    const maxValue = Math.max(...result.map((i) => i.value));

    return {
      total: result.reduce((acc, i) => acc + i.value, 0),
      history: result.map((i) => ({
        ...i,
        week_start: i.week_start.toLocaleDateString(),
        percent: (i.value / maxValue) * 100,
      })),
    };
  } catch (error) {
    console.error(error);
    return { total: 0, history: [] };
  }
}
