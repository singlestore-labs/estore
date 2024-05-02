import { useAtom, useSetAtom } from "jotai";
import { useCallback } from "react";

import { useAction } from "@/action/hooks/use-action";
import { submitChatMessage } from "@/chat/message/actions/submit";
import { isChatMessageSubmittingAtom } from "@/chat/message/atoms/is-submitting";
import { chatMessagesAtom } from "@/chat/message/atoms/messages";
import { createChatMessage } from "@/chat/message/lib/create";

export function useSubmitMessage() {
  const setMessages = useSetAtom(chatMessagesAtom);
  const [isChatMessageSubmitting, setIsChatMessageSubmitting] = useAtom(isChatMessageSubmittingAtom);
  const { execute } = useAction();

  const submit = useCallback(
    async (content: string) => {
      try {
        const _content = content.trim();
        setIsChatMessageSubmitting(true);
        setMessages((i) => [createChatMessage({ role: "user", content: _content }), ...i]);
        const message = await execute(() => submitChatMessage(_content));
        setMessages((i) => [message, ...i]);
      } finally {
        setIsChatMessageSubmitting(false);
      }
    },
    [execute, setMessages, setIsChatMessageSubmitting],
  );

  return { submit, isLoading: isChatMessageSubmitting } as const;
}
