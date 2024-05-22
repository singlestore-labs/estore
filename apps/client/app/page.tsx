import { MainChatContainer } from "@/main/chat/components/container";

export default function Home() {
  return (
    <div className="relative flex w-full max-w-full flex-1 flex-col items-center justify-center gap-16">
      <MainChatContainer />
    </div>
  );
}
