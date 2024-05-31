"use client";

import { useState } from "react";

import { ComponentProps } from "@/types";
import { Button } from "@/components/ui/button";
import { useAction } from "@/action/hooks/use-action";
import { getProductsByTypeId } from "@/product/actions/get-by-type-id";
import { ProductCatalogItem } from "@/product/catalog/type";
import { ProductCard } from "@/product/components/card";
import { cn } from "@/ui/lib";

export type ProductCatalogListProps = ComponentProps<"div", { data: ProductCatalogItem }>;

export function ProductCatalogList({ className, data, ...props }: ProductCatalogListProps) {
  const [type, initialProducts] = data;
  const [products, setProducts] = useState(initialProducts);
  const { execute, isPending } = useAction();

  const handleLoadMoreClick = async () => {
    const _products = await execute(() => getProductsByTypeId(type.id, { offset: products.length, limit: 6 }));
    setProducts((products) => [...products, ..._products]);
  };

  return (
    <div
      {...props}
      className={cn("group relative", className)}
    >
      <ul className="grid-auto-fill-[12.5rem] grid gap-4">
        {products.map((product) => (
          <li
            key={product.id}
            className=""
          >
            <ProductCard
              {...product}
              className="max-w-full"
            />
          </li>
        ))}
      </ul>

      {products.length < type.products_count && (
        <Button
          className="invisible absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full opacity-0 transition-all group-hover:visible group-hover:translate-y-1/2 group-hover:opacity-100"
          variant="outline"
          disabled={isPending}
          isLoading={isPending}
          onClick={handleLoadMoreClick}
        >
          Load more
        </Button>
      )}
    </div>
  );
}
