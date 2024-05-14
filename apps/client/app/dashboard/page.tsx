import { Metadata } from "next";

import { OrderRecentSection } from "@/order/components/recent-section";
import { OrdersTotalCard } from "@/order/components/total-card";
import { ProductTopSection } from "@/product/components/top-section";

export const metadata: Metadata = {
  title: `Dashboard`,
};

export default function PageDashboard() {
  return (
    <div className="relative mt-6 flex flex-1 flex-col gap-4 px-4">
      <div className="grid-auto-fill-[12rem] grid gap-4">
        <OrdersTotalCard />
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
