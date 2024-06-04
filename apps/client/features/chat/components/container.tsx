import { ComponentProps } from "@/types";
import { ChatInputCard, ChatInputCardProps } from "@/chat/input/components/card";
import { ChatMessageList, ChatMessageListProps } from "@/chat/message/components/list";
import { Chat } from "@/chat/types";
import { cn } from "@/ui/lib";

export type ChatContainerProps = ComponentProps<
  "div",
  {
    name: Chat["name"];
    emptyChildren?: ChatMessageListProps["emptyChildren"];
    listProps?: ChatMessageListProps["listProps"];
    fadeProps?: ChatMessageListProps["fadeProps"];
    inputProps?: Omit<ChatInputCardProps, "formProps" | "chatName">;
    formProps?: ChatInputCardProps["formProps"];
  }
>;

export function ChatContainer({
  className,
  name,
  emptyChildren,
  listProps,
  fadeProps,
  inputProps,
  formProps,
  ...props
}: ChatContainerProps) {
  return (
    <div
      {...props}
      className={cn("flex w-full max-w-full flex-1 flex-col items-center justify-center", className)}
    >
      <ChatMessageList
        chatName={name}
        className={cn("flex-1")}
        emptyChildren={emptyChildren}
        listProps={{
          ...listProps,
          className: cn("max-w-5xl px-4", listProps?.className),
        }}
        fadeProps={fadeProps}
      />
      <ChatInputCard
        chatName={name}
        formProps={formProps}
        className={cn("z-[3] max-w-5xl px-4", inputProps?.className)}
      />
    </div>
  );
}
