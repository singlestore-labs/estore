import { Product } from "@/product/types";

export async function getProductSalesById(id: Product["id"]): Promise<Product["sales"]> {
  try {
    const result: Product["sales"] = [];
    return result;
  } catch (error) {
    return [];
  }
}
