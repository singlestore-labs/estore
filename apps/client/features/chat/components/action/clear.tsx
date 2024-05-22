"use client";

import { useAtom, useSetAtom } from "jotai";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { ComponentProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverProps, PopoverTrigger } from "@/components/ui/popover";
import { useAction } from "@/action/hooks/use-action";
import { CHAT_CONFIGS } from "@/chat/constants/configs";
import { clearChatMessages } from "@/chat/message/actions/clear";
import { isChatMessageSubmittingAtom } from "@/chat/message/atoms/is-submitting";
import { useSetChatMessagesAtom } from "@/chat/message/atoms/messages";
import { Chat } from "@/chat/types";
import { deleteUserLikes } from "@/user/action/delete-likes";
import { deleteUserOrders } from "@/user/action/delete-orders";

export type ChatActionClearProps = ComponentProps<PopoverProps, { chatName: Chat["name"] }>;

export function ChatActionClear({ className, chatName, ...props }: ChatActionClearProps) {
  const chatConfig = CHAT_CONFIGS[chatName];
  const setMessages = useSetAtom(useSetChatMessagesAtom(chatName));
  const { execute, isPending } = useAction();
  const [isChatMessageSubmitting, setIsChatMessageSubmitting] = useAtom(isChatMessageSubmittingAtom);
  const { refresh } = useRouter();

  const handleClearClick = async () => {
    try {
      setIsChatMessageSubmitting(true);
      await execute(() =>
        Promise.all(
          [
            () => clearChatMessages(chatName),
            chatConfig.deleteUserLikesOnClear && deleteUserLikes,
            chatConfig.deleteUserOrdersOnClear && deleteUserOrders,
          ].map((fn) => (typeof fn === "function" ? fn() : fn)),
        ),
      );
      setMessages(() => []);
    } finally {
      refresh();
      setIsChatMessageSubmitting(false);
    }
  };

  return (
    <Popover {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={"flex items-center gap-1"}
          disabled={isChatMessageSubmitting || isPending}
        >
          <Trash2 className="w-4" />
          Clear history
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-full max-w-80 flex-col items-center justify-center py-4 text-center">
        <h6 className="text-sm">
          <strong>Clear the chat history?</strong>
        </h6>
        <p className="mt-1 text-sm">
          The following data will be deleted:
          <br />
          {chatConfig.affectedDataOnClear?.join(", ")}
        </p>
        <Button
          variant="destructive"
          size="sm"
          className="mt-4 w-full"
          disabled={isChatMessageSubmitting || isPending}
          isLoading={isChatMessageSubmitting || isPending}
          onClick={handleClearClick}
        >
          Clear
        </Button>
      </PopoverContent>
    </Popover>
  );
}
