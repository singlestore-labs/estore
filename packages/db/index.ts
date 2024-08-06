import { OPENAI_API_KEY } from "@repo/ai/constants";
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, TIER } from "@repo/db/constants";
import { createEleganceServerClient } from "@singlestore/elegance-sdk/server";

let extraSettings;

if (TIER === "shared") {
  let cert;
  fetch("https://portal.singlestore.com/static/ca/singlestore_bundle.pem")
    .then(function (response) {
      response.text().then(function (text) {
        cert = text;
      });
    })
  extraSettings = {
    ssl: {
      cert
    }
  }
}
export const db = createEleganceServerClient("mysql", {
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: Number(DB_PORT),
    multipleStatements: true,
    ...extraSettings
  },
  ai: {
    openai: {
      apiKey: OPENAI_API_KEY,
    },
  },
});
