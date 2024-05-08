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

export type QueryResultTableProps = ComponentProps<TableProps, { data: Record<string, any>[] }>;

export function QueryResultTable({ className, data, wrapperProps, ...props }: QueryResultTableProps) {
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
        {data.map((data, i) => (
          <TableRow key={i}>
            {Object.values(data).map((value) => (
              <TableCell key={value}>{value}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
