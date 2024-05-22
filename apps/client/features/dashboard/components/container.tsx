import { ComponentProps } from "@/types";
import { OrdersTrendInfoCard } from "@/order/components/trend-info/card";
import { OrderRecentSection } from "@/order/recent/components/section";
import { OrdersRevenueTrendInfoCard } from "@/order/revenure/components/trend-info-card";
import { ProductTopSection } from "@/product/components/top-section";
import { ProductTypesRevenueSplitInfoCard } from "@/product/type/components/revenue-split-info/card";
import { cn } from "@/ui/lib";

export type DashboardContainerProps = ComponentProps<"div">;

export function DashboardContainer({ className, ...props }: DashboardContainerProps) {
  return (
    <div
      {...props}
      className={cn("flex max-w-full flex-1 flex-col gap-4", className)}
    >
      <div className="flex flex-wrap gap-4">
        <OrdersRevenueTrendInfoCard className="flex-1 basis-80" />
        <OrdersTrendInfoCard className="flex-1 basis-80" />
        <ProductTypesRevenueSplitInfoCard className="flex-1 basis-80" />
      </div>

      <div className="flex flex-wrap items-start gap-4">
        <ProductTopSection
          className="flex-grow-full basis-96"
          contentProps={{ className: "max-h-[35.3125rem]" }}
        />
        <OrderRecentSection
          className="flex-grow basis-96"
          contentProps={{ className: "max-h-[35.625rem]" }}
        />
      </div>
    </div>
  );
}
