import { NormalizedDatasetRecord } from "@/types";
import { db } from "@repo/db";
import {
  ORDERS_TABLE_NAME,
  PRODUCTS_TABLE_NAME,
  PRODUCT_LIKES_TABLE_NAME,
  PRODUCT_SIZES_TABLE_NAME,
  PRODUCT_SKU_TABLE_NAME,
  USERS_TABLE_NAME,
} from "@repo/db/constants";
import { OrderRow, ProductLikeRow, ProductRow, ProductSKURow, ProductSizeRow, UserRow } from "@repo/db/types";
import { getRandomArrayItem, getRandomDate, normalizeDate, toChunks } from "@repo/helpers";
import { existsSync } from "fs";
import { readFile } from "fs/promises";
import path from "path";
import { writeToJSON } from "@/lib/write-to-json";
import { getImageBase64ByName } from "@/lib/get-image-base64";
import { vectorizeImages } from "@repo/ai";
import randomInteger from "random-int";

const USERS_NUMBER = 5_000_000;
const PRODUCT_LIKES_NUMBER = 5_000_000;
const UNIQUE_ORDERS_NUMBER = 5_000_000;

const normalizedDatasetPath = path.join(process.cwd(), "source/normalized-dataset.json");

(async () => {
  const dataset: NormalizedDatasetRecord[] = JSON.parse(await readFile(normalizedDatasetPath, "utf-8")).slice(
    0,
    10000,
  );
  const created_at = normalizeDate(new Date());

  const userRows: UserRow[] = Array.from({ length: USERS_NUMBER }).map((_, i) => ({ id: i + 1, created_at }));
  await writeToJSON(USERS_TABLE_NAME, userRows);

  let productRows: ProductRow[] = [];
  const productsPath = path.join(process.cwd(), `export/${PRODUCTS_TABLE_NAME}.json`);
  if (existsSync(productsPath)) {
    productRows = JSON.parse(await readFile(productsPath, "utf-8"));
  } else {
    let productId = 1;
    for await (const chunk of toChunks(dataset, 1000)) {
      const descriptionVs = await db.ai.createEmbedding(chunk.map((i) => i.description));
      const images = await Promise.all(
        chunk.map((i) => getImageBase64ByName(i.image.substring(i.image.lastIndexOf("/") + 1))),
      );

      const imageVs = await vectorizeImages(images);

      productRows = [
        ...productRows,
        ...chunk.map((product, i) => ({
          id: productId++,
          created_at,
          description: product.description,
          image: product.image,
          image_text: imageVs[i][0],
          price: product.price,
          gender: product.gender,
          description_v: JSON.stringify(descriptionVs[i]),
          image_text_v: JSON.stringify(imageVs[i][1]),
        })),
      ];
    }
    await writeToJSON(PRODUCTS_TABLE_NAME, productRows);
  }

  let productSizeRows: ProductSizeRow[];
  const sizes = new Set<string>();
  productRows.forEach(({ id }) => {
    Object.keys(dataset[id - 1].sizesInStock).forEach((i) => sizes.add(i));
  });
  productSizeRows = [...sizes].map((value, i) => ({ id: i + 1, value }));
  await writeToJSON(PRODUCT_SIZES_TABLE_NAME, productSizeRows);

  let productSKUId = 1;
  let prodcutSKURows: ProductSKURow[] = productRows.flatMap((product) => {
    let sizes = dataset[product.id - 1].sizesInStock;
    if (!Object.keys(sizes).length) sizes = { oneSize: randomInteger(1000, 10000) };
    return Object.entries(sizes).map(([size, stock]) => {
      return {
        id: productSKUId++,
        product_id: product.id,
        product_size_id: productSizeRows.find((i) => i.value === size)!.id,
        stock,
      } satisfies ProductSKURow;
    });
  });
  await writeToJSON(PRODUCT_SKU_TABLE_NAME, prodcutSKURows);

  const productLikeRows: ProductLikeRow[] = Array.from({ length: PRODUCT_LIKES_NUMBER }).map((_, i) => ({
    id: i + 1,
    created_at,
    user_id: getRandomArrayItem(userRows).id,
    product_id: getRandomArrayItem(productRows).id,
  }));
  await writeToJSON(PRODUCT_LIKES_TABLE_NAME, productLikeRows);

  const orderRows: OrderRow[] = Array.from({ length: UNIQUE_ORDERS_NUMBER }).map((_, i) => ({
    id: i + 1,
    created_at: normalizeDate(getRandomDate(new Date(2024, 0, 1))),
    user_id: getRandomArrayItem(userRows).id,
    product_sku_id: getRandomArrayItem(prodcutSKURows).id,
  }));
  await writeToJSON(ORDERS_TABLE_NAME, orderRows);
  console.log("Generated");
})();
