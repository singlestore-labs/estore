import { getProducts } from "@/product/lib/get";
import { Product } from "@/product/types";

export function getProductByIds(ids: Product["id"][]) {
  const idsDefinition = ids.join(",");
  return getProducts({ where: `id IN (${idsDefinition})`, extra: `ORDER BY FIELD(id, ${idsDefinition})` });
}
