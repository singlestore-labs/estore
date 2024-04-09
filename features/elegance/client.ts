import { createEleganceServerClient } from "@singlestore/elegance-sdk/server";

import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, OPENAI_API_KEY } from "@/constants/env";

export const eleganceClient = createEleganceServerClient("mysql", {
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  },
  ai: {
    openai: {
      apiKey: OPENAI_API_KEY,
    },
  },
});
