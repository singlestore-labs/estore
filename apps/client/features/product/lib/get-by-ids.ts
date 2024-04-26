import { getProducts } from "@/product/lib/get";
import { Product } from "@/product/types";

export function getProductByIds(ids: Product["id"][]) {
  return getProducts({ where: `id IN (${ids.join(",")})` });
}
