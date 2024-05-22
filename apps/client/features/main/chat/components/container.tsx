import { ComponentProps } from "@/types";
import { Hero } from "@/components/hero";
import { ChatContainer, ChatContainerProps } from "@/chat/components/container";
import { getChatMessages } from "@/chat/message/lib/get-list";
import { ChatStoreProvider } from "@/chat/store/components/provider";
import { Chat } from "@/chat/types";
import { MAIN_CHAT_SHORTCUTS } from "@/main/chat/constants/shortcuts";

export type MainChatContainerProps = ComponentProps<ChatContainerProps>;

const chatName: Chat["name"] = "main";

export async function MainChatContainer({ ...props }: MainChatContainerProps) {
  const messages = await getChatMessages(chatName);

  return (
    <ChatStoreProvider
      {...props}
      config={{
        name: chatName,
        deleteUserLikesOnClear: true,
        deleteUserOrdersOnClear: true,
        affectedDataOnClear: ["messages", "shopping history", "likes"],
      }}
      messages={messages}
      shortcuts={MAIN_CHAT_SHORTCUTS}
    >
      <Hero />
      <ChatContainer formProps={{ placeholder: "Describe the product you wish to buy" }} />
    </ChatStoreProvider>
  );
}
