import { ReactNode } from "react";

import { ComponentProps } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableProps,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/ui/lib";

export type AnalyticsQueryResultTableProps<T extends Record<string, any>[] = Record<string, any>[]> =
  ComponentProps<
    TableProps,
    { data: T } & { renderRow?: (result: T[number], rowNode: ReactNode) => ReactNode }
  >;

export function AnalyticsQueryResultTable<T extends Record<string, any>[] = Record<string, any>[]>({
  className,
  data,
  wrapperProps,
  renderRow,
  ...props
}: AnalyticsQueryResultTableProps<T>) {
  if (!data?.length) return null;
  const heads = Object.keys(data[0]);

  return (
    <Table
      {...props}
      className={cn("", className)}
      wrapperProps={{ ...wrapperProps, className: cn("h-80", wrapperProps?.className) }}
    >
      <TableHeader className="bg-card sticky top-0">
        <TableRow>
          {heads.map((head) => (
            <TableHead key={head}>{head}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((result, i) => {
          const rowNode = (
            <TableRow key={i}>
              {Object.values(result).map((value) => (
                <TableCell key={value}>{value}</TableCell>
              ))}
            </TableRow>
          );

          return renderRow ? renderRow(result, rowNode) : rowNode;
        })}
      </TableBody>
    </Table>
  );
}
