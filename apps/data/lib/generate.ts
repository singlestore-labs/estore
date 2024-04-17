import { NormalizedDatasetRecord } from "@/types";
import { readFile } from "fs/promises";
import path from "path";
import { db } from "@repo/db";

const normalizedDatasetPath = path.join(process.cwd(), "export/dataset.json");

(async () => {
  const dataset: NormalizedDatasetRecord[] = JSON.parse(await readFile(normalizedDatasetPath, "utf-8"));
  console.log(dataset);
})();
