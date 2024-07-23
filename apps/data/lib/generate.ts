import { NormalizedDatasetRecord } from "@/types";
import { db } from "@repo/db";
import {
  ORDERS_TABLE_NAME,
  PRODUCTS_TABLE_NAME,
  PRODUCT_LIKES_TABLE_NAME,
  PRODUCT_SIZES_TABLE_NAME,
  PRODUCT_SKU_TABLE_NAME,
  PRODUCT_TYPES_TABLE_NAME,
  USERS_TABLE_NAME,
} from "@repo/db/constants";
import {
  OrderRow,
  ProductLikeRow,
  ProductRow,
  ProductSKURow,
  ProductSizeRow,
  ProductTypeRow,
  UserRow,
} from "@repo/db/types";
import { getRandomArrayItem, getRandomDate, toChunks } from "@repo/helpers";
import { readFile, readdir } from "fs/promises";
import path from "path";
import { writeDataset } from "@/lib/write-dataset";
import { getImageBase64ByName } from "@/lib/get-image-base64";
import randomInteger from "random-int";
import { serializeDate } from "@repo/db/lib/serialize-date";
import { vectorizeImages } from "@repo/ai/lib/vectorize-images";
import { createProductType } from "@/lib/create-product-type";

const USERS_NUMBER = 5_000_000;
const PRODUCT_LIKES_NUMBER = 25_000_000;
const UNIQUE_ORDERS_NUMBER = 15_000_000;

const normalizedDatasetPath = path.join(process.cwd(), "source/normalized-dataset.json");

(async () => {
  const exportFileNames = await readdir(path.join(process.cwd(), `export`));

  const dataset: NormalizedDatasetRecord[] = JSON.parse(await readFile(normalizedDatasetPath, "utf-8")).slice(
    0,
    10000,
  );
  const created_at = serializeDate(new Date());

  console.log(`Generating ${USERS_TABLE_NAME}`);
  const userRows: UserRow[] = Array.from({ length: USERS_NUMBER }).map((_, i) => ({ id: i + 1, created_at }));
  await writeDataset(USERS_TABLE_NAME, userRows);

  let productRows: (ProductRow & { [K: string]: any })[] = [];
  const productExportFileNames = exportFileNames.filter((i) => i.startsWith(PRODUCTS_TABLE_NAME));
  if (productExportFileNames.length) {
    console.log(`Loading ${PRODUCTS_TABLE_NAME}`);
    for await (const fileName of productExportFileNames) {
      const fileContent = await readFile(path.join(process.cwd(), `export/${fileName}`), "utf-8");
      productRows = [...productRows, ...JSON.parse(fileContent)];
    }
  } else {
    console.log(`Generating ${PRODUCTS_TABLE_NAME}`);
    let productId = 1;
    for await (const chunk of toChunks(dataset, 1000)) {
      const descriptionVs = await db.ai.createEmbedding(chunk.map((i) => i.description));
      const images = await Promise.all(
        chunk.map((i) => getImageBase64ByName(i.image.substring(i.image.lastIndexOf("/") + 1))),
      );

      const imageVs = await vectorizeImages(images);
      const types = await Promise.all(chunk.map((i) => createProductType(i.description)));

      productRows = [
        ...productRows,
        ...chunk.map((product, i) => ({
          id: productId++,
          created_at,
          title: product.description,
          description: imageVs[i][0],
          type: types[i],
          image: product.image,
          price: product.price,
          gender: product.gender,
          title_v: JSON.stringify(descriptionVs[i]),
          description_v: JSON.stringify(imageVs[i][1]),
        })),
      ];
    }

    console.log(`Generating ${PRODUCT_TYPES_TABLE_NAME}`);
    const productTypeRows: ProductTypeRow[] = [...new Set(productRows.map((i) => i.type))].map((label, i) => {
      return { id: i + 1, label };
    });
    await writeDataset(PRODUCT_TYPES_TABLE_NAME, productTypeRows);

    productRows = productRows.map(({ type, ...i }) => {
      return { ...i, type_id: productTypeRows.find(({ label }) => label === type)?.id };
    });

    await writeDataset(PRODUCTS_TABLE_NAME, productRows, { length: 2500 });
  }

  console.log(`Generating ${PRODUCT_SIZES_TABLE_NAME}`);
  let productSizeRows: ProductSizeRow[];
  const sizes = new Set<string>();
  productRows.forEach(({ id }) => {
    Object.keys(dataset[id - 1].sizesInStock).forEach((i) => sizes.add(i));
  });
  productSizeRows = [...sizes].map((value, i) => ({ id: i + 1, value }));
  await writeDataset(PRODUCT_SIZES_TABLE_NAME, productSizeRows);

  console.log(`Generating ${PRODUCT_SKU_TABLE_NAME}`);
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
  await writeDataset(PRODUCT_SKU_TABLE_NAME, prodcutSKURows);

  console.log(`Generating ${PRODUCT_LIKES_TABLE_NAME}`);
  let productLikeRows: ProductLikeRow[] = [];
  let productLikeFileIndex = 0;
  for await (const i of [...Array(PRODUCT_LIKES_NUMBER).keys()]) {
    productLikeRows.push({
      id: i + 1,
      created_at,
      user_id: getRandomArrayItem(userRows).id,
      product_id: getRandomArrayItem(productRows).id,
    });

    if (productLikeRows.length === 100_000) {
      await writeDataset(ORDERS_TABLE_NAME, productLikeRows, { index: productLikeFileIndex });
      productLikeRows = [];
      productLikeFileIndex++;
    }
  }

  console.log(`Generating ${ORDERS_TABLE_NAME}`);
  let orderRows: OrderRow[] = [];
  let orderFileIndex = 0;
  for await (const i of [...Array(UNIQUE_ORDERS_NUMBER).keys()]) {
    orderRows.push({
      id: i + 1,
      created_at: serializeDate(getRandomDate(new Date(2023, 0, 1))),
      user_id: getRandomArrayItem(userRows).id,
      product_sku_id: getRandomArrayItem(prodcutSKURows).id,
    });

    if (orderRows.length === 100_000) {
      await writeDataset(ORDERS_TABLE_NAME, orderRows, { index: orderFileIndex });
      orderRows = [];
      orderFileIndex++;
    }
  }

  console.log("Generated");
})();
