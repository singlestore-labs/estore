import { getProducts } from "@/product/lib/get-many";

export async function findProducts(prompt: string, { limit = 1 }: { limit?: number }) {
  return getProducts({ limit });
}
