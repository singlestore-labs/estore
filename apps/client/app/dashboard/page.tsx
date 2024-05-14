import { Metadata } from "next";

import { OrdersTrendCard } from "@/order/components/trend-card";
import { OrderRecentSection } from "@/order/recent/components/section";
import { OrdersRevenueTrendCard } from "@/order/revenure/components/trend-card";
import { ProductTopSection } from "@/product/components/top-section";

export const metadata: Metadata = {
  title: `Dashboard`,
};

export default function PageDashboard() {
  return (
    <div className="relative mt-6 flex flex-1 flex-col gap-4 px-4">
      <div className="grid-auto-fit-[20rem] grid gap-4">
        <OrdersRevenueTrendCard />
        <OrdersTrendCard />
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
