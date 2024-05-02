import { ProductRow } from "@repo/db/types";

export const PRODUCT_COLUMNS: Exclude<keyof ProductRow, "description_v" | "image_text_v">[] = [
  "id",
  "created_at",
  "description",
  "image",
  "image_text",
  "price",
  "gender",
] as const;
