import { redirect } from "next/navigation";

import { ROUTES } from "@/constants/routes";
import { ProductDialog } from "@/product/components/dialog";
import { getProdcutById } from "@/product/lib/get-by-id";

export default async function PageProduct({ params }: { params: { id: string } }) {
  const product = await getProdcutById(+params.id);

  if (!product) {
    redirect(ROUTES.ROOT);
  }

  return <ProductDialog {...product} />;
}
