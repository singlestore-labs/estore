import { ProductDialog } from "@/product/components/dialog";

export default function PageProduct({ params }: { params: { id: string } }) {
  console.log("PageProduct", "id:", params.id);
  const product = undefined;

  return <ProductDialog product={product} />;
}
