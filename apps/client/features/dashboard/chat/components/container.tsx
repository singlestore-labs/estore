import { ComponentProps } from "@/types";
import { ChatContainer } from "@/chat/components/container";
import { ChatStoreProvider } from "@/chat/store/components/provider";
import { Chat } from "@/chat/types";
import { DashboardChatCard, DashboardChatCardProps } from "@/dashboard/chat/components/card";
import { DASHBOARD_CHAT_SHORTCUTS } from "@/dashboard/chat/constants/shortcuts";

export type DashboardChatContainerProps = ComponentProps<DashboardChatCardProps>;

const chatName: Chat["name"] = "dashboard";

export async function DashboardChatContainer({ ...props }: DashboardChatContainerProps) {
  return (
    <DashboardChatCard {...props}>
      <ChatStoreProvider
        config={{
          name: chatName,
          deleteUserLikesOnClear: false,
          deleteUserOrdersOnClear: false,
          affectedDataOnClear: ["messages"],
        }}
        shortcuts={DASHBOARD_CHAT_SHORTCUTS}
      >
        <ChatContainer
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
      </ChatStoreProvider>
    </DashboardChatCard>
  );
}
