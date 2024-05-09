"use client";

import humanNumber from "human-number";
import { useSetAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";

import { ComponentProps } from "@/types";
import { ChartPie } from "@/components/chart/pie";
import { Section, SectionProps } from "@/components/section";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/action/hooks/use-action";
import { getDbInfo } from "@/db/info/actions/get";
import { isDbInfoReadyAtom } from "@/db/info/atoms/is-ready";
import { getDbInfoTables } from "@/db/info/constants";
import { getTheme } from "@/ui/get-theme";
import { cn } from "@/ui/lib";

export type DbInfoSectionProps = ComponentProps<SectionProps>;

type Data = { tableName: string; value: number; color?: string }[];

const theme = getTheme();

const colors = Object.values(theme.colors.purple)
  .reverse()
  .slice(1)
  .filter((_, i) => i % 3 === 0);

const initialData: Data = getDbInfoTables.map((tableName) => ({ tableName, value: 0 }));

export function DbInfoSection({ className, ...props }: DbInfoSectionProps) {
  const [data, setData] = useState<Data>(initialData);
  const { execute, isPending } = useAction(true);
  const totalRows = useMemo(() => data.reduce((acc, { value }) => acc + value, 0), [data]);
  const setIsDbInfoReady = useSetAtom(isDbInfoReadyAtom);

  useEffect(() => {
    (async () => {
      const result = await execute(getDbInfo);
      setData(result.map((data, i) => ({ ...data, color: colors[i] || theme.colors.zinc[50] })));
    })();
  }, [execute]);

  useEffect(() => {
    setIsDbInfoReady(!isPending);
  }, [isPending, setIsDbInfoReady]);

  return (
    <Section
      {...props}
      className={cn("", className)}
      contentProps={{ className: "flex gap-4 items-stretch pt-0" }}
      variant="secondary"
      spacing="none"
    >
      <div className="relative h-32 w-32 flex-shrink-0">
        {!isPending && (
          <p className="absolute left-1/2 top-1/2 z-0 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center">
            <span className="text-2xl font-medium">{humanNumber(totalRows, (i) => i.toFixed(0))}</span>
            <span className="leading-none">rows</span>
          </p>
        )}

        {isPending ? (
          <Skeleton className="h-full w-full rounded-full" />
        ) : (
          <ChartPie
            data={data}
            dataKey="value"
            pieProps={{ innerRadius: "75%", isAnimationActive: false }}
          />
        )}
      </div>

      <ul className="grid-auto-fit-[9rem] grid flex-1 gap-4 py-2 max-md:basis-full">
        {data.map((data) => (
          <li key={data.tableName}>
            {isPending ? (
              <Skeleton className="h-full" />
            ) : (
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
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
