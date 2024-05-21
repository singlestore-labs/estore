"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Trash2 } from "lucide-react";

import { ComponentProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverProps, PopoverTrigger } from "@/components/ui/popover";
import { ActionError } from "@/action/error/types";
import { useAction } from "@/action/hooks/use-action";
import { chatNameAtom } from "@/chat/atoms/name";
import { clearChatMessages } from "@/chat/message/actions/clear";
import { isChatMessageSubmittingAtom } from "@/chat/message/atoms/is-submitting";
import { chatMessagesAtom } from "@/chat/message/atoms/messages";
import { deleteUserLikes } from "@/user/action/delete-likes";
import { deleteUserOrders } from "@/user/action/delete-orders";

export type ChatActionClearProps = ComponentProps<PopoverProps>;

const ACTIONS_BY_CHAT_NAME: Record<string, (() => Promise<void | ActionError>)[]> = {
  main: [deleteUserLikes, deleteUserOrders],
};

export function ChatActionClear({ className, ...props }: ChatActionClearProps) {
  const chatName = useAtomValue(chatNameAtom);
  const setMessages = useSetAtom(chatMessagesAtom);
  const { execute, isPending } = useAction();
  const [isChatMessageSubmitting, setIsChatMessageSubmitting] = useAtom(isChatMessageSubmittingAtom);

  const handleClearClick = async () => {
    try {
      setIsChatMessageSubmitting(true);
      const actions = ACTIONS_BY_CHAT_NAME[chatName] || [];
      await execute(() => Promise.all([() => clearChatMessages(chatName), ...actions].map((fn) => fn())));
      setMessages([]);
    } finally {
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
          {chatName === "main" ? "messages, shopping history, likes." : "messages."}
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
