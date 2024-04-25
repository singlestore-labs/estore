import { NormalizedDatasetRecord } from "@/types";
import { db } from "@repo/db";
import {
  ORDERS_TABLE_NAME,
  PRODUCTS_TABLE_NAME,
  PRODUCT_LIKES_TABLE_NAME,
  PRODUCT_SIZES_TABLE_NAME,
  USERS_TABLE_NAME,
} from "@repo/db/constants";
import { OrderRow, ProductLikeRow, ProductRow, ProductSizeRow, UserRow } from "@repo/db/types";
import { getRandomArrayItem, getRandomDate, normalizeDate, toChunks } from "@repo/helpers";
import { existsSync } from "fs";
import { readFile } from "fs/promises";
import path from "path";
import randomInt from "random-int";
import _groupBy from "lodash.groupby";
import { writeToJSON } from "@/lib/write-to-json";

const USERS_NUMBER = 5_000_000;
const PRODUCT_LIKES_NUMBER = 5_000_000;
const UNIQUE_ORDERS_NUMBER = 2_000_000;

const normalizedDatasetPath = path.join(process.cwd(), "source/normalized-dataset.json");

(async () => {
  const dataset: NormalizedDatasetRecord[] = JSON.parse(await readFile(normalizedDatasetPath, "utf-8")).slice(
    0,
    10000,
  );
  const createdAt = normalizeDate(new Date());

  let productRows: ProductRow[] = [];
  const productsPath = path.join(process.cwd(), `export/${PRODUCTS_TABLE_NAME}.json`);
  if (existsSync(productsPath)) {
    productRows = JSON.parse(await readFile(productsPath, "utf-8"));
  } else {
    let productId = 0;
    for await (const chunk of toChunks(dataset, 1000)) {
      const descriptionVs = await db.ai.createEmbedding(chunk.map((i) => i.description));

      productRows = [
        ...productRows,
        ...chunk.map((product, i) => ({
          id: productId++,
          createdAt,
          description: product.description,
          description_v: JSON.stringify(descriptionVs[i]),
          image: product.image,
          imageText: "",
          imageText_v: "",
          price: product.price,
          gender: product.gender,
        })),
      ];
    }
    await writeToJSON(PRODUCTS_TABLE_NAME, productRows);
  }

  let productSizeRows: ProductSizeRow[];
  const productSizesPath = path.join(process.cwd(), `export/${PRODUCT_SIZES_TABLE_NAME}.json`);
  if (existsSync(productSizesPath)) {
    productSizeRows = JSON.parse(await readFile(productSizesPath, "utf-8"));
  } else {
    let productSizeId = 0;
    productSizeRows = productRows.flatMap(({ id: productId }) => {
      return Object.entries(dataset[productId].sizesInStock).map(([label, inStock]) => {
        return { id: productSizeId++, createdAt, label, inStock, productId };
      });
    });
    await writeToJSON(PRODUCT_SIZES_TABLE_NAME, productSizeRows);
  }
  const productSizesGroup = _groupBy(productSizeRows, "productId");

  const userRows: UserRow[] = Array.from({ length: USERS_NUMBER }).map((_, id) => ({ id, createdAt }));
  await writeToJSON(USERS_TABLE_NAME, userRows);

  const productLikeRows: ProductLikeRow[] = Array.from({ length: PRODUCT_LIKES_NUMBER }).map((_, id) => ({
    id,
    createdAt,
    userId: getRandomArrayItem(userRows).id,
    productId: getRandomArrayItem(productRows).id,
  }));
  await writeToJSON(PRODUCT_LIKES_TABLE_NAME, productLikeRows);

  let orderId = 0;
  const orderRows: OrderRow[] = Array.from({ length: UNIQUE_ORDERS_NUMBER }).flatMap((_, groupId) => {
    const userId = getRandomArrayItem(userRows).id;
    return Array.from({ length: randomInt(1, 5) }).map(() => {
      const productId = getRandomArrayItem(productRows).id;
      const productSize = productSizesGroup[productId];
      const productSizeId = productSize ? getRandomArrayItem(productSize).id : null;
      return {
        id: orderId++,
        createdAt: normalizeDate(getRandomDate(new Date(2024, 0, 1))),
        groupId,
        userId,
        productId,
        productSizeId,
      };
    }) satisfies OrderRow[];
  });
  await writeToJSON(ORDERS_TABLE_NAME, orderRows);
})();
