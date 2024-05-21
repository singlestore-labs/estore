import { Metadata } from "next";

import { DashboardChatContainer } from "@/dashboard/chat/components/container";
import { DashboardChatWrapper } from "@/dashboard/chat/components/wrapper";
import { DashboardContainer } from "@/dashboard/components/container";

export const metadata: Metadata = {
  title: `Dashboard`,
};

export default function PageDashboard() {
  return (
    <div className="mt-6 flex flex-1 items-start px-4">
      <DashboardContainer />
      <DashboardChatWrapper>
        <DashboardChatContainer className="absolute left-0 top-0 h-full w-full pb-4" />
      </DashboardChatWrapper>
    </div>
  );
}
