import { ProductRow } from "@repo/db/types";

export const PRODUCT_COLUMNS: Exclude<keyof ProductRow, "title_v" | "description_v">[] = [
  "id",
  "created_at",
  "title",
  "description",
  "image",
  "price",
  "gender",
] as const;
