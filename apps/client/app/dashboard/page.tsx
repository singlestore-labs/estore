import { Metadata } from "next";

import { ChatContainer } from "@/chat/components/container";
import { Chat } from "@/chat/types";
import { DashboardChatCard } from "@/dashboard/chat/components/card";
import { DashboardContainer } from "@/dashboard/components/container";

export const metadata: Metadata = {
  title: `Dashboard`,
};

const chatName: Chat["name"] = "dashboard";

export default function PageDashboard() {
  return (
    <div className="mt-6 flex flex-1 items-start justify-start px-4">
      <DashboardContainer />
      <DashboardChatCard>
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
      </DashboardChatCard>
    </div>
  );
}
