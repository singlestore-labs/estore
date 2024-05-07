import humanNumber from "human-number";

import { ComponentProps } from "@/types";
import { ChartPie } from "@/components/chart/pie";
import { Section, SectionProps } from "@/components/section";
import { Card } from "@/components/ui/card";
import { getTheme } from "@/ui/get-theme";
import { cn } from "@/ui/lib";

export type DbInfoSectionProps = ComponentProps<
  SectionProps,
  { data: Promise<{ tableName: string; value: number }[]> }
>;

const theme = getTheme();

const colors = Object.values(theme.colors.purple)
  .reverse()
  .slice(1)
  .filter((_, i) => i % 3 === 0);

export async function DbInfoSection({ className, data, ...props }: DbInfoSectionProps) {
  const _data = (await data).map((data, i) => ({ ...data, color: colors[i] || theme.colors.zinc[50] }));
  const totalRows = _data.reduce((acc, { value }) => acc + value, 0);

  return (
    <Section
      {...props}
      className={cn("", className)}
      contentProps={{ className: "flex gap-4 items-stretch" }}
      variant="secondary"
      size="xs"
    >
      <div className="relative h-32 w-32 flex-shrink-0">
        <p className="absolute left-1/2 top-1/2 z-0 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center">
          <span className="text-2xl font-medium">{humanNumber(totalRows, (i) => i.toFixed(0))}</span>
          <span className="leading-none">rows</span>
        </p>

        <ChartPie
          data={_data}
          dataKey="value"
          pieProps={{ innerRadius: "75%" }}
        />
      </div>

      <ul className="grid-auto-fit-[9rem] grid flex-1 gap-4 py-2 max-md:basis-full">
        {_data.map((data) => (
          <li key={data.tableName}>
            <Card className="flex h-full flex-col justify-end p-4">
              <p
                className="text-xl font-medium"
                title={`${data.value}`}
              >
                {humanNumber(data.value, (i) => i.toFixed(0))}
              </p>
              <h4 className="flex items-center justify-between gap-1 leading-none">
                {data.tableName}
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: data.color }}
                />
              </h4>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
