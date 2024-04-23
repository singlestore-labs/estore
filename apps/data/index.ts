import { db } from "@repo/db";
import {
  ORDERS_TABLE_NAME,
  PRODUCTS_TABLE_NAME,
  PRODUCT_LIKES_TABLE_NAME,
  PRODUCT_SIZES_TABLE_NAME,
  USERS_TABLE_NAME,
} from "@repo/db/constants";
import { toChunks } from "@repo/helpers";
import { readFile, readdir } from "fs/promises";
import path from "path";

function dropTables() {
  return Promise.all(
    [
      USERS_TABLE_NAME,
      PRODUCTS_TABLE_NAME,
      PRODUCT_SIZES_TABLE_NAME,
      PRODUCT_LIKES_TABLE_NAME,
      ORDERS_TABLE_NAME,
    ].map((tableName) => db.connection.query(`DROP TABLE IF EXISTS ${tableName}`)),
  );
}

function createTables() {
  return Promise.all([
    db.connection.query(`
      CREATE TABLE IF NOT EXISTS ${process.env.DB_NAME}.${USERS_TABLE_NAME} (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        createdAt DATETIME
      )
    `),

    db.connection.query(`
      CREATE TABLE IF NOT EXISTS ${process.env.DB_NAME}.${PRODUCTS_TABLE_NAME} (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        createdAt DATETIME,
        description TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
        image VARCHAR(256),
        price DECIMAL(9,2),
        gender VARCHAR(64),
        description_v VECTOR(1536)
      )
    `),

    db.connection.query(`
      CREATE TABLE IF NOT EXISTS ${process.env.DB_NAME}.${PRODUCT_SIZES_TABLE_NAME} (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        createdAt DATETIME,
        productId BIGINT,
        label VARCHAR(64),
        inStock INT
      )
    `),

    db.connection.query(`
      CREATE TABLE IF NOT EXISTS ${process.env.DB_NAME}.${PRODUCT_LIKES_TABLE_NAME} (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        createdAt DATETIME,
        userId BIGINT,
        productId BIGINT
      )
    `),

    db.connection.query(`
      CREATE TABLE IF NOT EXISTS ${process.env.DB_NAME}.${ORDERS_TABLE_NAME} (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        createdAt DATETIME,
        groupId BIGINT,
        userId BIGINT,
        productId BIGINT,
        productSizeId BIGINT
      )
    `),
  ]);
}

async function insertValues() {
  const exportPath = path.join(process.cwd(), "export");
  const files = (await readdir(exportPath)).filter((i) => i.includes(".json"));

  for await (const fileName of files) {
    const [tableName] = fileName.split(".")[0].split("-");
    const fileContent = await readFile(path.join(exportPath, fileName), "utf-8");
    const values = JSON.parse(fileContent);
    const limit = tableName === PRODUCTS_TABLE_NAME ? 1000 : 10000;

    if (values.length > limit) {
      for await (const chunk of toChunks(values, limit)) {
        await db.controllers.insertMany({ collection: tableName, values: chunk });
      }
    } else {
      await db.controllers.insertMany({ collection: tableName, values: values });
    }
  }
}

(async () => {
  try {
    await dropTables();
    await createTables();
    await insertValues();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
