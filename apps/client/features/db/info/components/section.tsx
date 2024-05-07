import {
  ORDERS_TABLE_NAME,
  PRODUCTS_TABLE_NAME,
  PRODUCT_LIKES_TABLE_NAME,
  PRODUCT_SIZES_TABLE_NAME,
  PRODUCT_SKU_TABLE_NAME,
  USERS_TABLE_NAME,
} from "@repo/db/constants";
import humanNumber from "human-number";

import { ComponentProps } from "@/types";
import { ChartPie } from "@/components/chart/pie";
import { Section, SectionProps } from "@/components/section";
import { getTheme } from "@/ui/get-theme";
import { cn } from "@/ui/lib";

export type DbInfoSectionProps = ComponentProps<
  SectionProps,
  { data: Promise<{ tableName: string; value: number }[]> }
>;

const theme = getTheme();

const colors = Object.values(theme.colors.purple).reverse().slice(3);

export async function DbInfoSection({ className, data, ...props }: DbInfoSectionProps) {
  const _data = (await data).map((data, i) => ({ ...data, color: colors[i] }));
  const totalRows = _data.reduce((acc, { value }) => acc + value, 0);

  return (
    <Section
      {...props}
      className={cn("text-sm", className)}
      contentProps={{ className: "flex items-center gap-6 flex-wrap justify-center" }}
      size="sm"
    >
      <div className="relative h-28 w-28 flex-shrink-0">
        <p className="absolute left-1/2 top-1/2 z-0 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center">
          <span className="text-xl font-medium">{humanNumber(totalRows, (i) => i.toFixed(0))}</span>
          <span className="leading-none">rows</span>
        </p>

        <ChartPie
          data={_data}
          dataKey="value"
          pieProps={{ innerRadius: "75%" }}
        />
      </div>

      <ul className="grid-auto-fit-[8rem] grid flex-1 gap-4 max-md:basis-full">
        {_data.map((data) => (
          <li
            key={data.tableName}
            className="flex items-center gap-2 border-b pb-1"
            title={data.tableName}
            style={{ borderColor: data.color }}
          >
            <div className="flex w-full items-center justify-between">
              <h4>{data.tableName}</h4>
              <p className="bg-accent block rounded px-2 py-1 font-medium">
                {humanNumber(data.value, (i) => i.toFixed(0))}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
