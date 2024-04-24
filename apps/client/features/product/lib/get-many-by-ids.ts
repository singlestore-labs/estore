import { getProducts } from "@/product/lib/get-many";
import { Product } from "@/product/types";

export function getProductByIDs(ids: Product["id"][]) {
  return getProducts({ where: `id IN (${ids.join(",")})` });
}
