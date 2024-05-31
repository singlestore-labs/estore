import { getProductsByTypeId } from "@/product/actions/get-by-type-id";
import { ProductType } from "@/product/type/type";

export type ProductCatalogItem = [ProductType, Awaited<ReturnType<typeof getProductsByTypeId>>];
