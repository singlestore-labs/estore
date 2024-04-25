import { existsSync } from "fs";
import { readFile } from "fs/promises";
import path from "path";

const imagesPath = path.join(process.cwd(), `source/cutout-img/cutout`);

export async function getImageBase64ByName(name: string) {
  const imagePath = path.join(imagesPath, name);
  if (!existsSync(imagePath)) return;
  const base64 = await readFile(imagePath, "base64");
  return `data:image/jpeg;base64,${base64}`;
}
