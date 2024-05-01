import { createEleganceServerClient } from "@singlestore/elegance-sdk/server";

export const db = createEleganceServerClient("mysql", {
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
  },
  ai: {
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
    },
  },
});
