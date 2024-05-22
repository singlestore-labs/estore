import { ComponentProps } from "@/types";
import { ChatContainer } from "@/chat/components/container";
import { getChatMessages } from "@/chat/message/lib/get-list";
import { ChatStoreProvider } from "@/chat/store/components/provider";
import { DashboardChatCard, DashboardChatCardProps } from "@/dashboard/chat/components/card";
import { DASHBOARD_CHAT_SHORTCUTS } from "@/dashboard/chat/constants/shortcuts";

export type DashboardChatContainerProps = ComponentProps<DashboardChatCardProps>;

const chatName = "dashboard";

export async function DashboardChatContainer({ ...props }: DashboardChatContainerProps) {
  const messages = await getChatMessages(chatName);

  return (
    <DashboardChatCard {...props}>
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
          className="h-full justify-end overflow-hidden rounded-lg pb-6"
          listProps={{ className: "max-w-full" }}
          inputProps={{ className: "max-w-full px-6" }}
          formProps={{ placeholder: "Message", size: "sm" }}
        />
      </ChatStoreProvider>
    </DashboardChatCard>
  );
}
