import { db } from "@repo/db";
import {
  CHATS_TABLE_NAME,
  CHAT_MESSAGES_TABLE_NAME,
  ORDERS_TABLE_NAME,
  PRODUCTS_TABLE_NAME,
  PRODUCT_LIKES_TABLE_NAME,
  PRODUCT_SIZES_TABLE_NAME,
  PRODUCT_SKU_TABLE_NAME,
  PRODUCT_TYPES_TABLE_NAME,
  TABLE_NAMES,
  USERS_TABLE_NAME,
} from "@repo/db/constants";
import { toChunks } from "@repo/helpers";
import { readFile, readdir } from "fs/promises";
import path from "path";

function dropTables() {
  return Promise.all(TABLE_NAMES.map((tableName) => db.connection.query(`DROP TABLE IF EXISTS ${tableName}`)));
}

function createTables() {
  return Promise.all([
    db.connection.query(`
      CREATE TABLE IF NOT EXISTS ${USERS_TABLE_NAME} (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        created_at DATETIME
      )
    `),

    db.connection.query(`
      CREATE TABLE IF NOT EXISTS ${PRODUCTS_TABLE_NAME} (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        created_at DATETIME,
        title TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
        description TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
        image VARCHAR(256),
        price DECIMAL(9,2),
        gender VARCHAR(64),
        type_id BIGINT,
        title_v VECTOR(1536),
        description_v VECTOR(1536),
        FULLTEXT KEY(title, description)
      )
    `),

    db.connection.query(`
      CREATE TABLE IF NOT EXISTS ${PRODUCT_TYPES_TABLE_NAME} (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        label VARCHAR(64)
      )
    `),

    db.connection.query(`
      CREATE TABLE IF NOT EXISTS ${PRODUCT_SIZES_TABLE_NAME} (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        value VARCHAR(64)
      )
    `),

    db.connection.query(`
      CREATE TABLE IF NOT EXISTS ${PRODUCT_SKU_TABLE_NAME} (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        product_id BIGINT,
        product_size_id BIGINT,
        stock INT
      )
    `),

    db.connection.query(`
      CREATE TABLE IF NOT EXISTS ${PRODUCT_LIKES_TABLE_NAME} (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        created_at DATETIME,
        user_id BIGINT,
        product_id BIGINT
      )
    `),

    db.connection.query(`
      CREATE TABLE IF NOT EXISTS ${ORDERS_TABLE_NAME} (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        created_at DATETIME,
        user_id BIGINT,
        product_sku_id BIGINT
      )
    `),

    db.connection.query(`
      CREATE TABLE IF NOT EXISTS ${CHATS_TABLE_NAME} (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(128)
      )
    `),

    db.connection.query(`
      CREATE TABLE IF NOT EXISTS ${CHAT_MESSAGES_TABLE_NAME} (
          id BIGINT AUTO_INCREMENT PRIMARY KEY,
          created_at BIGINT,
          chat_id BIGINT,
          user_id BIGINT,
          role VARCHAR(64),
          content JSON
      )
    `),
  ]);
}

async function insertValues() {
  const exportPath = path.join(process.cwd(), "export");
  const fileNames = (await readdir(exportPath)).filter((i) => i.includes(".json"));

  for await (const fileNamesChunk of toChunks(fileNames, 5)) {
    await Promise.all(
      fileNamesChunk.map(async (fileName) => {
        console.log(`Inserting ${fileName}`);
        const [tableName] = fileName.split(".")[0].split("-");
        const fileContent = await readFile(path.join(exportPath, fileName), "utf-8");
        const values = JSON.parse(fileContent);
        const limit = tableName === PRODUCTS_TABLE_NAME ? 1000 : 10000;

        if (values.length > limit) {
          for await (const chunk of toChunks(values, limit)) {
            await db.controllers.insertMany({ collection: tableName, values: chunk });
          }
        } else {
          await db.controllers.insertMany({ collection: tableName, values });
        }
      }),
    );
  }
}

(async () => {
  try {
    console.log("Inserting data");
    await dropTables();
    await createTables();
    await insertValues();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
