import { useAtom, useSetAtom } from "jotai";
import { useCallback } from "react";

import { useAction } from "@/action/hooks/use-action";
import { submitChatMessage } from "@/chat/message/actions/submit";
import { isChatMessageSubmittingAtom } from "@/chat/message/atoms/is-submitting";
import { useSetChatMessagesAtom } from "@/chat/message/atoms/messages";
import { createChatMessage } from "@/chat/message/lib/create";
import { Chat } from "@/chat/types";

export function useSubmitMessage(chatName: Chat["name"]) {
  const setMessages = useSetAtom(useSetChatMessagesAtom(chatName));
  const [isChatMessageSubmitting, setIsChatMessageSubmitting] = useAtom(isChatMessageSubmittingAtom);
  const { execute } = useAction();

  const submit = useCallback(
    async (content: string) => {
      try {
        const _content = content.trim();
        setIsChatMessageSubmitting(true);
        setMessages((i) => [createChatMessage({ role: "user", content: _content }), ...i]);
        const message = await execute(() => submitChatMessage(chatName, _content));
        setMessages((i) => [message, ...i]);
      } finally {
        setIsChatMessageSubmitting(false);
      }
    },
    [execute, chatName, setMessages, setIsChatMessageSubmitting],
  );

  return { submit, isLoading: isChatMessageSubmitting } as const;
}
