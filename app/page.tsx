import { Hero } from "@/components/hero";
import { ChatContainer } from "@/chat/components/container";

export default async function Home() {
  return (
    <div className="relative flex w-full max-w-full flex-1 flex-col items-center justify-center gap-16">
      <Hero />
      <ChatContainer />
    </div>
  );
}
