import { Hero } from "@/components/hero";
import { ChatContainer } from "@/chat/components/container";
import { getChatMessages } from "@/chat/message/lib/get-list";
import { MAIN_CHAT_SHORTCUTS } from "@/main/chat/constants/shortcuts";
import { MainChatStoreProvider } from "@/main/chat/store/components/provider";

const chatName = "main";

export default async function Home() {
  const messages = await getChatMessages(chatName);

  return (
    <div className="relative flex w-full max-w-full flex-1 flex-col items-center justify-center gap-16">
      <MainChatStoreProvider
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
        <ChatContainer placeholder="Describe the product you wish to buy" />
      </MainChatStoreProvider>
    </div>
  );
}
