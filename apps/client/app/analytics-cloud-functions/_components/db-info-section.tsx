import {
  ORDERS_TABLE_NAME,
  PRODUCTS_TABLE_NAME,
  PRODUCT_LIKES_TABLE_NAME,
  PRODUCT_SIZES_TABLE_NAME,
  PRODUCT_SKU_TABLE_NAME,
  PRODUCT_TYPES_TABLE_NAME,
  USERS_TABLE_NAME,
} from "@repo/db/constants";

import { ComponentProps } from "@/types";
import {
  DbInfoSection as _DbInfoSection,
  type DbInfoSectionProps as _DbInfoSectionProps,
} from "@/db/info/components/section";

import { apiRequest } from "../../../api";

export type DbInfoSectionProps = ComponentProps<Omit<_DbInfoSectionProps, "data">>;

export async function DbInfoSection({ ...props }: DbInfoSectionProps) {
  const data = await Promise.all(
    [
      USERS_TABLE_NAME,
      ORDERS_TABLE_NAME,
      PRODUCT_LIKES_TABLE_NAME,
      PRODUCT_SKU_TABLE_NAME,
      PRODUCTS_TABLE_NAME,
      PRODUCT_TYPES_TABLE_NAME,
      PRODUCT_SIZES_TABLE_NAME,
    ].map(async (tableName) => {
      const response = await apiRequest(`/tables/${tableName}/count`);
      const value = await response.json();
      return { tableName, value };
    }),
  );

  return (
    <_DbInfoSection
      {...props}
      data={data}
    />
  );
}
