import { Metadata } from "next";

import { ChatContainer } from "@/chat/components/container";
import { getChatMessages } from "@/chat/message/lib/get-list";
import { ChatStoreProvider } from "@/chat/store/components/provider";
import { DashboardChatWrapper } from "@/dashboard/chat/components/wrapper";
import { DASHBOARD_CHAT_SHORTCUTS } from "@/dashboard/chat/constants/shortcuts";
import { DashboardContainer } from "@/dashboard/components/container";

export const metadata: Metadata = {
  title: `Dashboard`,
};

const chatName = "dashboard";

export default async function PageDashboard() {
  const messages = await getChatMessages(chatName);

  return (
    <div className="mt-6 flex flex-1 items-start px-4">
      <DashboardContainer />
      <DashboardChatWrapper>
        <ChatStoreProvider
          config={{
            name: chatName,
            deleteUserLikesOnClear: false,
            deleteUserOrdersOnClear: false,
            affectedDataOnClear: ["messages"],
          }}
          messages={messages}
          shortcuts={DASHBOARD_CHAT_SHORTCUTS}
        >
          <ChatContainer
            className="absolute left-0 top-0 h-full w-full pb-4"
            placeholder="Message"
          />
        </ChatStoreProvider>
      </DashboardChatWrapper>
    </div>
  );
}
