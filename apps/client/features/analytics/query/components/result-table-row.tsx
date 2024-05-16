import { ReactNode } from "react";

import { ComponentProps } from "@/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AnalyticsQuerySlugs } from "@/analytics/query/type";
import { ProductTooltipCard } from "@/product/components/tooltip-card";

export type AnalyticsQueryResultTableRowProps = ComponentProps<{
  children?: ReactNode;
  querySlug: AnalyticsQuerySlugs;
  result: Record<string, any>;
}>;

const nodes: Partial<Record<AnalyticsQuerySlugs, (...args: any[]) => ReactNode>> = {
  find_products: ({ id }) => <ProductTooltipCard id={id} />,
  top_products: ({ id }) => <ProductTooltipCard id={id} />,
};

export function AnalyticsQueryResultTableRow({
  children,
  querySlug,
  result,
}: AnalyticsQueryResultTableRowProps) {
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
