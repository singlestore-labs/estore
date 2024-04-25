export type Row<T extends object = object> = { id: number; createdAt: string } & T;

export type UserRow = Row;

export type ProductRow = Row<{
  description: string;
  description_v: string;
  image: string;
  imageText: string;
  imageText_v: string;
  price: number;
  gender: string;
}>;

export type ProductSizeRow = Row<{
  productId: ProductRow["id"];
  label: string;
  inStock: number;
}>;

export type ProductLikeRow = Row<{
  userId: UserRow["id"];
  productId: ProductRow["id"];
}>;

export type OrderRow = Row<{
  groupId: number;
  userId: UserRow["id"];
  productId: ProductRow["id"];
  productSizeId: ProductSizeRow["id"] | null;
}>;
