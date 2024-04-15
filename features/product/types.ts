export type Product = {
  id: string;
  description: string;
  price: number;
  image: string;
  sizes: Record<string, number>;
  likes: number;
  sales: number;
};
