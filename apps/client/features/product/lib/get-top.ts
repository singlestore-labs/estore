import { getProducts } from "@/product/lib/get-many";
import { Product } from "@/product/types";

export async function getTopProduct(): Promise<Product> {
  const product = (await getProducts({ limit: 1 }))[0];
  return product;
}
