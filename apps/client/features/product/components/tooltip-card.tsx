import { useEffect, useRef, useState } from "react";

import { ComponentProps } from "@/types";
import { Loader } from "@/components/loader";
import { Card } from "@/components/ui/card";
import { useAction } from "@/action/hooks/use-action";
import { getProductByIds } from "@/product/actions/get-by-ids";
import { ProductCard, ProductCardProps } from "@/product/components/card";
import { Product } from "@/product/types";
import { cn } from "@/ui/lib";

export type ProductTooltipCardProps = ComponentProps<Pick<ProductCardProps, "id" | "className">>;

export function ProductTooltipCard({ id, className }: ProductTooltipCardProps) {
  const [product, setProduct] = useState<Product>();
  const { execute, isPending } = useAction();
  const idRef = useRef<Product["id"] | undefined>();

  useEffect(() => {
    (async () => {
      if (id === idRef.current) return;
      idRef.current = id;
      const result = await execute(() => getProductByIds([id]));
      setProduct(result[0]);
    })();
  }, [id, execute]);

  if (isPending) {
    return (
      <Card className="relative flex size-64 items-center justify-center">
        <Loader className="size-12" />
      </Card>
    );
  }

  if (!isPending && product) {
    return (
      <ProductCard
        {...product}
        id={id}
        className={cn("", className)}
      />
    );
  }

  return null;
}
