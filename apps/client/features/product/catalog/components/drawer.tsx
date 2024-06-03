import { ComponentProps } from "@/types";
import { Drawer, DrawerProps } from "@/components/drawer";
import { getProductCatalog } from "@/product/catalog/actions/get";
import { ProductCatalogContainer } from "@/product/catalog/components/container";
import { countProductTypes } from "@/product/type/lib/count";
import { cn } from "@/ui/lib";

export type ProductCatalogDrawerProps = ComponentProps<DrawerProps>;

export async function ProductCatalogDrawer({ className, ...props }: ProductCatalogDrawerProps) {
  const [catalog, productTypesCount] = await Promise.all([
    getProductCatalog({ limit: 4, products: { limit: 3 } }),
    countProductTypes(),
  ]);

  return (
    <Drawer
      {...props}
      className={cn("", className)}
      triggerChildren="Product catalog"
    >
      <ProductCatalogContainer
        data={catalog}
        count={productTypesCount}
      />
    </Drawer>
  );
}
