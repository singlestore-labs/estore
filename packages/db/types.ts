export type Row<T extends object = object> = { id: number } & T;
export type RowWithCreatedAt<T extends object = object> = Row<T> & { created_at: string };

export type UserRow = RowWithCreatedAt;

export type ProductRow = RowWithCreatedAt<{
  title: string;
  description: string;
  image: string;
  price: number;
  gender: string;
  type_id?: ProductTypeRow["id"];
  title_v: string;
  description_v: string;
}>;

export type ProductTypeRow = Row<{
  label: string;
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
