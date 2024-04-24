import { getProducts } from "@/product/lib/get-many";

export async function findProducts(prompt: string, filter: Parameters<typeof getProducts>[0]) {
  return getProducts(filter);
}
