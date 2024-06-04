import { Metadata } from "next";

import { Drawer } from "@/components/drawer";
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
      <div className="flex max-w-full flex-1 flex-col gap-4 px-4">
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

      <Drawer
        triggerChildren="Talk to the data"
        maxWidth="100%"
      >
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
