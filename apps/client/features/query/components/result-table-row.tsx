import { ReactNode } from "react";

import { ComponentProps } from "@/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ProductTooltipCard } from "@/product/components/tooltip-card";
import { QuerySlugs } from "@/query/type";

export type QueryResultTableRowProps = ComponentProps<{
  children?: ReactNode;
  querySlug: QuerySlugs;
  result: Record<string, any>;
}>;

const nodes: Partial<Record<QuerySlugs, (...args: any[]) => ReactNode>> = {
  find_products: ({ id }) => <ProductTooltipCard id={id} />,
  top_products: ({ id }) => <ProductTooltipCard id={id} />,
};

export function QueryResultTableRow({ children, querySlug, result }: QueryResultTableRowProps) {
  const node = nodes[querySlug]?.(result);
  if (!node) return children;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="border-none p-0">{node}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
