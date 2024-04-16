import { ComponentProps } from "@/types";
import { ChatInputCard } from "@/chat/input/components/card";
import { ChatMessageList } from "@/chat/messages/components/list";
import { cn } from "@/ui/lib";

export type ChatContainerProps = ComponentProps<"div">;

export function ChatContainer({ className, ...props }: ChatContainerProps) {
  return (
    <div
      {...props}
      className={cn("flex w-full max-w-full flex-1 flex-col items-center justify-center", className)}
    >
      <ChatMessageList
        className="flex-1"
        listProps={{ className: "max-w-5xl px-4" }}
      />
      <ChatInputCard className="z-[3] max-w-5xl px-4" />
    </div>
  );
}
