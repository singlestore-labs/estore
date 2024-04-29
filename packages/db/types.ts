export type Row<T extends object = object> = { id: number } & T;
export type RowWithCreatedAt<T extends object = object> = Row<T> & { created_at: string };

export type UserRow = RowWithCreatedAt;

export type ProductRow = RowWithCreatedAt<{
  description: string;
  image: string;
  image_text: string;
  price: number;
  gender: string;
  description_v: string;
  image_text_v: string;
}>;

export type ProductSizeRow = Row<{
  value: string;
}>;

export type ProductSKURow = Row<{
  product_id: ProductRow["id"];
  product_size_id: ProductSizeRow["id"];
  stock: number;
}>;

export type ProductLikeRow = RowWithCreatedAt<{
  user_id: UserRow["id"];
  product_id: ProductRow["id"];
}>;

export type OrderRow = RowWithCreatedAt<{
  user_id: UserRow["id"];
  product_sku_id: ProductRow["id"];
}>;
