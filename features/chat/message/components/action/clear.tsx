import { useSetAtom } from "jotai";
import { Trash2 } from "lucide-react";

import { ComponentProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverProps, PopoverTrigger } from "@/components/ui/popover";
import { useAction } from "@/action/hooks/use-action";
import { clearChatMessages } from "@/chat/message/actions/clear";
import { chatMessagesAtom } from "@/chat/message/atoms/messages";

export type ChatMessageActionClearProps = ComponentProps<PopoverProps>;

export function ChatMessageActionClear({ className, ...props }: ChatMessageActionClearProps) {
  const setMessages = useSetAtom(chatMessagesAtom);
  const { execute, isPending } = useAction();

  const handleClearClick = async () => {
    await execute(clearChatMessages);
    setMessages([]);
  };

  return (
    <Popover {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={"flex items-center gap-1"}
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
          messages, shopping history, likes.
        </p>
        <Button
          variant="destructive"
          size="sm"
          className="mt-4 w-full"
          disabled={isPending}
          isLoading={isPending}
          onClick={handleClearClick}
        >
          Clear
        </Button>
      </PopoverContent>
    </Popover>
  );
}
