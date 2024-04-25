import { writeToJSON } from "@/lib/write-to-json";
import { vectorizeImages } from "@repo/ai";
import { PRODUCTS_TABLE_NAME } from "@repo/db/constants";
import { ProductRow } from "@repo/db/types";
import { toChunks } from "@repo/helpers";
import { existsSync } from "fs";
import { readFile } from "fs/promises";
import path from "path";

const imagesPath = path.join(process.cwd(), `source/cutout-img/cutout`);

(async () => {
  const productsPath = path.join(process.cwd(), `export/${PRODUCTS_TABLE_NAME}.json`);
  if (!existsSync(productsPath)) return;
  const file = await readFile(productsPath, "utf-8");
  const productRows: Omit<ProductRow, "imageText" | "imageText_v">[] = JSON.parse(file);
  let newProductRows: ProductRow[] = [];

  for await (const chunk of toChunks(productRows, 100)) {
    const images = await Promise.all(
      chunk.map((i) => getImageBase64ByName(i.image.substring(i.image.lastIndexOf("/") + 1))),
    );

    const imageVs = await vectorizeImages(images);

    newProductRows = [
      ...newProductRows,
      ...chunk.map((row, i) => ({
        ...row,
        imageText: imageVs[i][0],
        imageText_v: JSON.stringify(imageVs[i][1]),
      })),
    ];

    console.log(newProductRows.length);
  }

  await writeToJSON(PRODUCTS_TABLE_NAME, newProductRows);
})();

async function getImageBase64ByName(name: string) {
  const imagePath = path.join(imagesPath, name);
  if (!existsSync(imagePath)) return;
  const base64 = await readFile(imagePath, "base64");
  return `data:image/jpeg;base64,${base64}`;
}
