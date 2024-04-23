import Link from "next/link";

import { ComponentProps } from "@/types";
import { Button } from "@/components/ui/button";
import { ChatMessageCard, ChatMessageCardProps } from "@/chat/message/components/card";
import { ROUTES } from "@/constants/routes";
import { ProductSalesChart } from "@/product/sales/components/chart";
import { Product } from "@/product/types";
import { cn } from "@/ui/lib";

export type ChatMessageProdcutSalesChartProps = ComponentProps<ChatMessageCardProps, { product: Product }>;

export function ChatMessageProdcutSalesChart({
  children,
  className,
  product,
  ...props
}: ChatMessageProdcutSalesChartProps) {
  const _children = children || (
    <p>
      Sales of{" "}
      <Button
        asChild
        variant="link"
        size="link"
      >
        <Link
          href={ROUTES.PRODUCT_BY_ID(product.id)}
          className="capitalize"
        >
          {product.description}
        </Link>
      </Button>{" "}
      for the last {product.sales?.length} days:
    </p>
  );

  return (
    <ChatMessageCard
      variant="secondary"
      {...props}
      className={cn("w-full max-w-full gap-4 py-4", className)}
    >
      {_children}
      <ProductSalesChart sales={product.sales} />
    </ChatMessageCard>
  );
}
