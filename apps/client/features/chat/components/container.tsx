import { ComponentProps } from "@/types";
import { ChatInputCard, ChatInputCardProps } from "@/chat/input/components/card";
import { ChatMessageList, ChatMessageListProps } from "@/chat/message/components/list";
import { cn } from "@/ui/lib";

export type ChatContainerProps = ComponentProps<
  "div",
  {
    listProps?: ChatMessageListProps["listProps"];
    inputProps?: Omit<ChatInputCardProps, "formProps">;
    formProps?: ChatInputCardProps["formProps"];
  }
>;

export function ChatContainer({ className, listProps, inputProps, formProps, ...props }: ChatContainerProps) {
  return (
    <div
      {...props}
      className={cn("flex w-full max-w-full flex-1 flex-col items-center justify-center", className)}
    >
      <ChatMessageList
        className={cn("flex-1")}
        listProps={{
          ...listProps,
          className: cn("max-w-5xl px-4", listProps?.className),
        }}
      />
      <ChatInputCard
        formProps={formProps}
        className={cn("z-[3] max-w-5xl px-4", inputProps?.className)}
      />
    </div>
  );
}
