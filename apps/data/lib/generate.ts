import { NormalizedDatasetRecord } from "@/types";
import { db } from "@repo/db";
import { OrderRow, ProductLikeRow, ProductRow, ProductSizeRow, UserRow } from "@repo/db/types";
import { createWriteStream, existsSync } from "fs";
import { readFile } from "fs/promises";
import path from "path";
import randomInt from "random-int";

const USERS_NUMBER = 5_000_000;
const PRODUCT_LIKES_NUMBER = 5_000_000;
const UNIQUE_ORDERS_NUMBER = 2_000_000;

const normalizedDatasetPath = path.join(process.cwd(), "export/normalized-dataset.json");

(async () => {
  const dataset: NormalizedDatasetRecord[] = JSON.parse(await readFile(normalizedDatasetPath, "utf-8")).slice(
    0,
    10000,
  );
  const createdAt = normalizeDate(new Date());

  let productRows: ProductRow[] = [];
  let productId = 0;
  const productsPath = path.join(process.cwd(), `export/products.json`);
  if (existsSync(productsPath)) {
    productRows = JSON.parse(await readFile(productsPath, "utf-8"));
  } else {
    for await (const chunk of toChunks(dataset, 1000)) {
      const embeddings = await db.ai.createEmbedding(chunk.map((i) => i.description));
      productRows = [
        ...productRows,
        ...chunk.map((product, i) => ({
          id: productId++,
          createdAt,
          description: product.description,
          image: product.image,
          price: product.price,
          gender: product.gender,
          description_v: JSON.stringify(embeddings[i]),
        })),
      ];
    }
    await writeToJSON(`products`, productRows);
  }

  if (!existsSync(path.join(process.cwd(), `export/product_sizes.json`))) {
    let productSizeId = 0;
    const productSizeRows: ProductSizeRow[] = productRows.flatMap(({ id: productId }) => {
      return Object.entries(dataset[productId].sizesInStock).map(([label, inStock]) => {
        return { id: productSizeId++, createdAt, label, inStock, productId };
      });
    });
    await writeToJSON("product_sizes", productSizeRows);
  }

  const userRows: UserRow[] = Array.from({ length: USERS_NUMBER }).map((_, id) => ({ id, createdAt }));
  await writeToJSON("users", userRows);

  const productLikeRows: ProductLikeRow[] = Array.from({ length: PRODUCT_LIKES_NUMBER }).map((_, id) => ({
    id,
    createdAt,
    userId: getRandomArrayItem(userRows).id,
    productId: getRandomArrayItem(productRows).id,
  }));
  await writeToJSON("product_likes", productLikeRows);

  let orderId = 0;
  const orderRows: OrderRow[] = Array.from({ length: UNIQUE_ORDERS_NUMBER }).flatMap((_, groupId) => {
    const userId = getRandomArrayItem(userRows).id;
    return Array.from({ length: randomInt(1, 5) }).map(() => ({
      id: orderId++,
      createdAt: normalizeDate(getRandomDate(new Date(2024, 0, 1))),
      groupId,
      userId,
      productId: getRandomArrayItem(productRows).id,
    })) satisfies OrderRow[];
  });
  await writeToJSON("orders", orderRows);
})();

function getRandomArrayItem<T extends any[]>(arr: T): T[number] {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomDate(from: Date) {
  const min = from.getTime();
  const max = new Date().getTime();
  const randomTime = Math.random() * (max - min) + min;
  return new Date(randomTime);
}

function normalizeDate(date: Date) {
  return date.toISOString().slice(0, 19).replace("T", " ");
}

// function writeToJSON(name: string, data: any) {
//   return writeFile(path.join(process.cwd(), `export/${name}.json`), JSON.stringify(data, null, 2), "utf-8");
// }

async function writeToJSON(name: string, data: any[], chunkSize = 100000) {
  console.log({ name, length: data.length });
  return new Promise((res) => {
    const filePath = path.join(process.cwd(), `export/${name}.json`);
    const stream = createWriteStream(filePath, { encoding: "utf-8" });

    stream.write("[\n");

    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);
      const jsonChunk = JSON.stringify(chunk, null, 2);
      const trimmedChunk = jsonChunk.slice(1, jsonChunk.length - 1).replace("\n", "");
      if (i > 0) stream.write(",\n");
      stream.write(trimmedChunk);
    }

    stream.write("\n]");
    stream.end();
    res(true);
  });
}

export function toChunks<T>(array: T[], chunkSize: number): T[][] {
  const chunks = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }

  return chunks;
}
