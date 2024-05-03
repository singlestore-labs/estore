import { toChunks } from "@repo/helpers";
import { writeFile } from "fs/promises";
import path from "path";

export async function writeDataset<T extends any[]>(name: string, data: T) {
  let i = 0;

  const write = async (data: T) => {
    await writeFile(
      path.join(process.cwd(), `export/${name}${i > 0 ? `-${i}` : ""}.json`),
      JSON.stringify(data, null, 2),
      "utf-8",
    );
  };

  if (data.length > 100_000) {
    for await (const chunk of toChunks(data, 100_000)) {
      i++;
      await write(chunk as T);
    }
  } else {
    return write(data);
  }
}
