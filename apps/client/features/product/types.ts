import { ProductRow } from "@repo/db/types";

export type Product = {
  id: ProductRow["id"];
  description: string;
  price: number;
  image: string;
  sizes: Record<string, number>;
  likes: number;
  sales: { value: number; date: string }[];
};
