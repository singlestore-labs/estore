import { OrderRow } from "@repo/db/types";

import { Override } from "@/types";
import { Product } from "@/product/types";

export type Order = OrderRow;

export type OrderRecent = Override<Order, { created_at: Date }> & {
  product_id: Product["id"];
  product_description: Product["description"];
  product_image: Product["image"];
  product_price: Product["price"];
};
