import { ComponentProps } from "@/types";
import { Section } from "@/components/section";
import { ProductCatalogList } from "@/product/catalog/components/list";
import { ProductCatalogItem } from "@/product/catalog/type";
import { cn } from "@/ui/lib";

export type ProductCatalogContainerProps = ComponentProps<"div", { data: ProductCatalogItem[] }>;

export function ProductCatalogContainer({ className, data, ...props }: ProductCatalogContainerProps) {
  return (
    <div
      {...props}
      className={cn("flex h-full w-full flex-col gap-4 overflow-y-auto overflow-x-hidden p-4", className)}
    >
      {data.map((data) => (
        <Section
          key={data[0].id}
          title={
            <>
              {data[0].label}
              <sup className="ml-1">({data[0].products_count})</sup>
            </>
          }
          variant="secondary"
          spacing="none"
          size="sm"
          titleProps={{ className: "capitalize" }}
        >
          <ProductCatalogList data={data} />
        </Section>
      ))}
    </div>
  );
}
