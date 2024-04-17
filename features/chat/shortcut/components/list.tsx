"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";

import { ComponentProps } from "@/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChatToolbar } from "@/chat/components/toolbar";
import { chatMessagesAtom, hasMessagesAtom } from "@/chat/message/atoms/messages";
import { createChatMessage } from "@/chat/message/lib/create";
import { ChatShortcutButton } from "@/chat/shortcut/components/button";
import { ChatShortcut } from "@/chat/shortcut/types";
import { cn } from "@/ui/lib";

import { chatShortcuts } from "../../../../data/chat-shortcuts";

export type ChatShortcutListProps = ComponentProps<"ul">;

export function ChatShortcutList({ className, ...props }: ChatShortcutListProps) {
  const hasMessages = useAtomValue(hasMessagesAtom);
  const setMessages = useSetAtom(chatMessagesAtom);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleShortcut = (shortcut: ChatShortcut) => {
    const message = createChatMessage({ role: "user", content: shortcut.title });
    setMessages((i) => [message, ...i]);
    setIsCollapsed(true);
  };

  return (
    <Accordion
      type="single"
      collapsible
      value={!isCollapsed ? "1" : "2"}
      onValueChange={(v) => setIsCollapsed(v !== "1")}
    >
      <AccordionItem
        value="1"
        className="border-b-0"
      >
        <AccordionTrigger
          className="justify-start gap-1 p-0 text-sm"
          headerChildren={<ChatToolbar className="ml-auto" />}
        >
          Shortcuts
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          <ul
            {...props}
            className={cn(
              "grid max-h-36 w-full max-w-full flex-wrap gap-2 overflow-y-auto overflow-x-hidden grid-auto-fill-[24rem,1fr]",
              className,
            )}
          >
            {chatShortcuts.map((shortcut) => (
              <li key={shortcut.title}>
                <ChatShortcutButton
                  {...shortcut}
                  className="w-full max-w-full"
                  onClick={() => handleShortcut(shortcut)}
                />
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
