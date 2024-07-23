import { OPENAI_API_KEY } from "@repo/ai/constants";
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } from "@repo/db/constants";
import { createEleganceServerClient } from "@singlestore/elegance-sdk/server";

let cert;

fetch("https://portal.singlestore.com/static/ca/singlestore_bundle.pem")
  .then(function (response) {
    response.text().then(function (text) {
      cert = text;
    });
  })

export const db = createEleganceServerClient("mysql", {
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: Number(DB_PORT),
    multipleStatements: true,
    ssl: {
      cert
    }
  },
  ai: {
    openai: {
      apiKey: OPENAI_API_KEY,
    },
  },
});
