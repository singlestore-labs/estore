import { products } from "@/data/products";
import { ProductDialog } from "@/product/components/dialog";

export default function PageProduct({ params }: { params: { id: string } }) {
  const product = products[0];

  return <ProductDialog {...product} />;
}
