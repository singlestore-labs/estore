export type ProductSizes = Record<string, number>;

export type Product = {
  id: string;
  description: string;
  price: number;
  image: string;
  sizes: ProductSizes;
};
