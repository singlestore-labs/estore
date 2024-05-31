import { ComponentProps } from "@/types";
import { Drawer, DrawerProps } from "@/components/drawer";
import { Section } from "@/components/section";
import { ProductCatalogList } from "@/product/catalog/components/list";
import { getProductCatalog } from "@/product/catalog/lib/get";
import { cn } from "@/ui/lib";

export type ProductCatalogDrawerProps = ComponentProps<DrawerProps>;

export async function ProductCatalogDrawer({ className, ...props }: ProductCatalogDrawerProps) {
  const catalog = await getProductCatalog({ limit: 3 });

  return (
    <Drawer
      {...props}
      className={cn("", className)}
      triggerChildren="Product catalog"
    >
      <div className="h-full w-full overflow-hidden rounded-lg">
        <div className="flex h-full w-full flex-col gap-8 overflow-y-auto overflow-x-hidden p-4">
          {catalog.map((data) => (
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
      </div>
    </Drawer>
  );
}
