import { NormalizedDatasetRecord, SourceDatasetRecord } from "@/types";
import { parse } from "csv-parse/sync";
import { existsSync, mkdirSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import randomInt from "random-int";

const sourceDatasetPath = path.join(process.cwd(), "source/current_farfetch_listings.csv");
const normalizedDatasetPath = path.join(process.cwd(), "export/normalized-dataset.json");

if (!existsSync(sourceDatasetPath)) {
  mkdirSync(sourceDatasetPath.split("/")[0]);
}

if (!existsSync(normalizedDatasetPath)) {
  mkdirSync(normalizedDatasetPath.split("/")[0]);
}

(async () => {
  const records: NormalizedDatasetRecord[] = (
    parse(await readFile(sourceDatasetPath, "utf-8"), { columns: true }) as SourceDatasetRecord[]
  ).map((i) => {
    let sizesInStock = {};

    if (i.availableSizes) {
      try {
        const iSizes: Record<string, any>[] = JSON.parse(i.availableSizes.replace(/\'/g, '"'));
        if (iSizes[0]?.size === "One Size") {
          sizesInStock = { oneSize: randomInt(0, 10000) };
        } else {
          sizesInStock = iSizes.reduce(
            (acc, { size }) => ({ ...acc, [size]: randomInt(0, 10000) }),
            {} as NormalizedDatasetRecord["sizesInStock"],
          );
        }
      } catch (error) {}
    }

    return {
      id: i.id,
      description: i.shortDescription,
      image: i["images.cutOut"],
      price: +i["priceInfo.finalPrice"],
      sizesInStock,
      gender: i.gender,
    };
  });

  await writeFile(normalizedDatasetPath, JSON.stringify(records, null, 2), "utf-8");
})();
