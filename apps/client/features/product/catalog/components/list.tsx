import { ComponentProps } from "@/types";
import { ProductCatalogItem } from "@/product/catalog/type";
import { ProductCard } from "@/product/components/card";
import { cn } from "@/ui/lib";

export type ProductCatalogListProps = ComponentProps<"ul", { data: ProductCatalogItem }>;

export function ProductCatalogList({ className, data, ...props }: ProductCatalogListProps) {
  return (
    <ul
      {...props}
      className={cn("grid-auto-fit-[12.5rem] grid gap-4", className)}
    >
      {data[1].map((product) => (
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
  );
}
