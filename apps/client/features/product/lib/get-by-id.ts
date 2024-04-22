import { getProducts } from "@/product/lib/get-many";
import { Product } from "@/product/types";

export async function getProdcutById(id: Product["id"]): Promise<Product | undefined> {
  try {
    return (await getProducts({ where: `id = ${id}` }))[0];
  } catch (error) {
    return undefined;
  }
}
