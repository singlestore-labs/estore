import { timeAgo, toCurrency } from "@repo/helpers";

import { ComponentProps } from "@/types";
import { Section, SectionProps } from "@/components/section";
import { getOrdersRecent } from "@/order/recent/lib/get";
import { ProductCardSecondary } from "@/product/components/card/secondary";
import { cn } from "@/ui/lib";

export type OrderRecentSectionProps = ComponentProps<SectionProps>;

export async function OrderRecentSection({ className, contentProps, ...props }: OrderRecentSectionProps) {
  const data = await getOrdersRecent();

  return (
    <Section
      {...props}
      className={cn("overflow-hidden", className)}
      title="Recent sales"
      size="sm"
      contentProps={{
        ...contentProps,
        className: cn("p-0 overflow-auto", contentProps?.className),
      }}
    >
      <ul className="flex flex-col text-sm">
        {data.map((order) => (
          <li
            key={order.id}
            className="flex flex-wrap items-center justify-between gap-4 border-b px-5 py-2"
          >
            <ProductCardSecondary
              id={order.product_id}
              image={order.product_image}
              title={order.product_title}
              size="sm"
              className="flex-1 basis-1/3"
            />
            <div className="flex-1 text-right">
              <p>{toCurrency(order.product_price)}</p>
              <p className="text-muted-foreground text-xs">{timeAgo(order.created_at)}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
