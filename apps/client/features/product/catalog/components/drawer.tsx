import { ComponentProps } from "@/types";
import { Drawer, DrawerProps } from "@/components/drawer";
import { ProductCatalogContainer } from "@/product/catalog/components/container";
import { getProductCatalog } from "@/product/catalog/lib/get";
import { cn } from "@/ui/lib";

export type ProductCatalogDrawerProps = ComponentProps<DrawerProps>;

export async function ProductCatalogDrawer({ className, ...props }: ProductCatalogDrawerProps) {
  const catalog = await getProductCatalog();

  return (
    <Drawer
      {...props}
      className={cn("", className)}
      triggerChildren="Product catalog"
    >
      <ProductCatalogContainer data={catalog} />
    </Drawer>
  );
}
