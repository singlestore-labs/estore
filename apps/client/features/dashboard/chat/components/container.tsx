import { ComponentProps } from "@/types";
import { ChatContainer, ChatContainerProps } from "@/chat/components/container";
import { getChatMessages } from "@/chat/message/lib/get-list";
import { ChatStoreProvider } from "@/chat/store/components/provider";
import { DASHBOARD_CHAT_SHORTCUTS } from "@/dashboard/chat/constants/shortcuts";

export type DashboardChatContainerProps = ComponentProps<ChatContainerProps>;

export async function DashboardChatContainer({ ...props }: DashboardChatContainerProps) {
  const messages = await getChatMessages();

  return (
    <ChatStoreProvider
      config={{
        name: "dashboard",
        deleteUserLikesOnClear: false,
        deleteUserOrdersOnClear: false,
        affectedDataOnClear: ["messages"],
      }}
      messages={messages}
      shortcuts={DASHBOARD_CHAT_SHORTCUTS}
    >
      <ChatContainer
        placeholder="Message"
        {...props}
      />
    </ChatStoreProvider>
  );
}
