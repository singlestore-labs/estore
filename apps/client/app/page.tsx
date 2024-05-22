import { Hero } from "@/components/hero";
import { ChatContainer } from "@/chat/components/container";
import { Chat } from "@/chat/types";

const chatName: Chat["name"] = "main";

export default function Home() {
  return (
    <div className="relative flex w-full max-w-full flex-1 flex-col items-center justify-center gap-16">
      <Hero chatName={chatName} />
      <ChatContainer
        name={chatName}
        formProps={{ placeholder: "Describe the product you wish to buy" }}
      />
    </div>
  );
}
