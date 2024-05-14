import {
  ORDERS_TABLE_NAME,
  PRODUCTS_TABLE_NAME,
  PRODUCT_LIKES_TABLE_NAME,
  PRODUCT_SIZES_TABLE_NAME,
  PRODUCT_SKU_TABLE_NAME,
  USERS_TABLE_NAME,
} from "@repo/db/constants";
import { countTableRows } from "@repo/db/lib/count-table-rows";
import humanNumber from "human-number";

import { ComponentProps } from "@/types";
import { ChartPie } from "@/components/chart/pie";
import { InfoCard } from "@/components/info-card";
import { Section, SectionProps } from "@/components/section";
import { getTheme } from "@/ui/get-theme";
import { cn } from "@/ui/lib";

export type DbInfoSectionProps = ComponentProps<SectionProps>;

const theme = getTheme();

const colors = Object.values(theme.colors.purple)
  .reverse()
  .slice(1)
  .filter((_, i) => i % 3 === 0);

export async function DbInfoSection({ className, ...props }: DbInfoSectionProps) {
  const data = await Promise.all(
    [
      USERS_TABLE_NAME,
      ORDERS_TABLE_NAME,
      PRODUCT_LIKES_TABLE_NAME,
      PRODUCT_SKU_TABLE_NAME,
      PRODUCTS_TABLE_NAME,
      PRODUCT_SIZES_TABLE_NAME,
    ].map(async (tableName, i) => ({
      tableName,
      value: await countTableRows(tableName),
      color: colors[i],
    })),
  );

  const totalRows = data.reduce((acc, { value }) => acc + value, 0);

  return (
    <Section
      {...props}
      className={cn("", className)}
      contentProps={{ className: "flex gap-4 items-stretch pt-0" }}
      variant="secondary"
      spacing="none"
    >
      <div className="relative h-32 w-32 flex-shrink-0">
        <p className="absolute left-1/2 top-1/2 z-0 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center">
          <span className="text-2xl font-medium">{humanNumber(totalRows, (i) => i.toFixed(0))}</span>
          <span className="leading-none">rows</span>
        </p>

        <ChartPie
          data={data}
          dataKey="value"
          pieProps={{ innerRadius: "75%" }}
        />
      </div>

      <ul className="grid-auto-fit-[9rem] grid flex-1 gap-4 max-md:basis-full">
        {data.map((data) => (
          <li key={data.tableName}>
            <InfoCard
              title={data.tableName}
              value={humanNumber(data.value, (i) => i.toFixed(0))}
              className="h-full"
            >
              <span
                className="mb-4 ml-auto mr-4 mt-auto h-2 w-2 rounded-full"
                style={{ backgroundColor: data.color }}
              />
            </InfoCard>
          </li>
        ))}
      </ul>
    </Section>
  );
}
