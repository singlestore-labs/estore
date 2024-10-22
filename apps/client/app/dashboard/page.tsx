import { Metadata } from "next";
import { Suspense } from "react";

import { Drawer } from "@/components/drawer";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatContainer } from "@/chat/components/container";
import { Chat } from "@/chat/types";
import { OrdersTrendInfoCard } from "@/order/components/trend-info/card";
import { OrderRecentSection } from "@/order/recent/components/section";
import { OrdersRevenueTrendInfoCard } from "@/order/revenure/components/trend-info-card";
import { ProductTopSection } from "@/product/components/top-section";
import { ProductTypesRevenueSplitInfoCard } from "@/product/type/components/revenue-split-info/card";

export const metadata: Metadata = {
  title: `Dashboard`,
};

const chatName: Chat["name"] = "dashboard";

export default async function PageDashboard() {
  return (
    <div className="mt-6 flex flex-1 items-start justify-start">
      <div className="flex max-w-full flex-1 flex-col gap-4 px-4 md:h-full">
        <div className="flex flex-wrap gap-4">
          <Suspense fallback={<Skeleton className="h-44 flex-1 basis-80" />}>
            <OrdersRevenueTrendInfoCard className="flex-1 basis-80" />
          </Suspense>
          <Suspense fallback={<Skeleton className="h-44 flex-1 basis-80" />}>
            <OrdersTrendInfoCard className="flex-1 basis-80" />
          </Suspense>
          <Suspense fallback={<Skeleton className="h-44 flex-1 basis-80" />}>
            <ProductTypesRevenueSplitInfoCard className="flex-1 basis-80" />
          </Suspense>
        </div>

        <div className="flex flex-1 flex-wrap items-start gap-4">
          <Suspense fallback={<Skeleton className="flex-grow-full h-[40rem] basis-96 md:h-full" />}>
            <ProductTopSection className="flex-grow-full h-[40rem] basis-96 md:h-full" />
          </Suspense>

          <Suspense fallback={<Skeleton className="h-[35.625rem] flex-grow basis-96" />}>
            <OrderRecentSection
              className="flex-grow basis-96"
              contentProps={{ className: "h-[35.625rem]" }}
            />
          </Suspense>
        </div>
      </div>

      <Drawer triggerChildren="Talk to the data">
        <ChatContainer
          name={chatName}
          className="h-full justify-end overflow-hidden rounded-lg pb-6"
          emptyChildren={
            <span className="text-muted-foreground m-auto text-sm">
              Ask a question about the data to start the chat.
            </span>
          }
          listProps={{ className: "max-w-full" }}
          inputProps={{ className: "max-w-full px-6" }}
          formProps={{ placeholder: "Message", size: "sm" }}
        />
      </Drawer>
    </div>
  );
}
