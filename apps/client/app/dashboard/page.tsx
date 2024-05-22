import { Metadata } from "next";

import { DashboardChatContainer } from "@/dashboard/chat/components/container";
import { DashboardContainer } from "@/dashboard/components/container";

export const metadata: Metadata = {
  title: `Dashboard`,
};

export default function PageDashboard() {
  return (
    <div className="mt-6 flex flex-1 items-start justify-start px-4">
      <DashboardContainer />
      <DashboardChatContainer />
    </div>
  );
}
