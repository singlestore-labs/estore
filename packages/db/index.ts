import { OPENAI_API_KEY } from "@repo/ai/constants";
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from "@repo/db/constants";
import { createEleganceServerClient } from "@singlestore/elegance-sdk/server";

export const db = createEleganceServerClient("mysql", {
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    multipleStatements: true,
  },
  ai: {
    openai: {
      apiKey: OPENAI_API_KEY,
    },
  },
});
