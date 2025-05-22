import {
  ORDERS_TABLE_NAME,
  PRODUCTS_TABLE_NAME,
  PRODUCT_LIKES_TABLE_NAME,
  PRODUCT_SIZES_TABLE_NAME,
  PRODUCT_SKU_TABLE_NAME,
  PRODUCT_TYPES_TABLE_NAME,
  USERS_TABLE_NAME,
} from "@repo/db/constants";
import { countTableRows } from "@repo/db/lib/count-table-rows";

import { ComponentProps } from "@/types";
import { SectionProps } from "@/components/section";
import { DbInfoSection as _DbInfoSection } from "@/db/info/components/section";

export type DbInfoSectionProps = ComponentProps<SectionProps>;

export async function DbInfoSection({ className, ...props }: DbInfoSectionProps) {
  const data = await Promise.all(
    [
      USERS_TABLE_NAME,
      ORDERS_TABLE_NAME,
      PRODUCT_LIKES_TABLE_NAME,
      PRODUCT_SKU_TABLE_NAME,
      PRODUCTS_TABLE_NAME,
      PRODUCT_TYPES_TABLE_NAME,
      PRODUCT_SIZES_TABLE_NAME,
    ].map(async (tableName) => ({
      tableName,
      value: await countTableRows(tableName),
    })),
  );

  return <_DbInfoSection data={data} />;
}
