import { redirect } from "next/navigation";

import { ROUTES } from "@/constants/routes";
import { ProductDialog } from "@/product/components/dialog";
import { getProductByIds } from "@/product/lib/get-by-ids";

export default async function PageProduct({ params }: { params: Promise<{ id: string }> }) {
  const product = (await getProductByIds([+(await params).id]))[0];

  if (!product) {
    redirect(ROUTES.ROOT);
  }

  return <ProductDialog {...product} />;
}
