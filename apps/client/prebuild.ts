import { loadEnvConfig } from "@next/env";
import { db } from "@repo/db";
import { CHAT_MESSAGES_TABLE_NAME } from "@repo/db/constants";

const dir = process.cwd();
const env = loadEnvConfig(dir).combinedEnv;

(async () => {
  try {
    // await db.connection.query(`DROP TABLE ${env.DB_NAME}.${CHAT_MESSAGES_TABLE_NAME}`);
    await Promise.all([
      db.connection.query(`
        CREATE TABLE IF NOT EXISTS ${env.DB_NAME}.${CHAT_MESSAGES_TABLE_NAME} (
          id BIGINT AUTO_INCREMENT PRIMARY KEY,
          createdAt BIGINT,
          userId BIGINT,
          role VARCHAR(64),
          content JSON
        )
      `),
    ]);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
