import { Hero } from "@/components/hero";
import { ChatContainer } from "@/chat/components/container";
import { getChatMessages } from "@/chat/message/lib/get-list";
import { ChatStoreProvider } from "@/chat/store/components/provider";
import { MAIN_CHAT_SHORTCUTS } from "@/main/chat/constants/shortcuts";

export default async function Home() {
  const messages = await getChatMessages();

  return (
    <div className="relative flex w-full max-w-full flex-1 flex-col items-center justify-center gap-16">
      <ChatStoreProvider
        config={{
          name: "main",
          deleteUserLikesOnClear: true,
          deleteUserOrdersOnClear: true,
          affectedDataOnClear: ["messages", "shopping history", "likes"],
        }}
        messages={messages}
        shortcuts={MAIN_CHAT_SHORTCUTS}
      >
        <Hero />
        <ChatContainer placeholder="Describe the product you wish to buy" />
      </ChatStoreProvider>
    </div>
  );
}
