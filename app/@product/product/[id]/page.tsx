import { ProductDialog } from "@/product/components/dialog";

import { products } from "../../../../data/products";

export default function PageProduct({ params }: { params: { id: string } }) {
  console.log("PageProduct", "id:", params.id);
  const product = products[0];

  return <ProductDialog {...product} />;
}
