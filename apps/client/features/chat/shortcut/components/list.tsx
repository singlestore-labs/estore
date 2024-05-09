"use client";

import { useState } from "react";

import { ComponentProps } from "@/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChatToolbar } from "@/chat/components/toolbar";
import { ChatShortcutButton } from "@/chat/shortcut/components/button";
import { CHAT_SHORTCUTS } from "@/chat/shortcut/constants";
import { ChatShortcut } from "@/chat/shortcut/types";
import { cn } from "@/ui/lib";

export type ChatShortcutListProps = ComponentProps<
  "ul",
  { isDisabled?: boolean; onShortcut?: (shortcut: ChatShortcut) => Promise<void> | void }
>;

export function ChatShortcutList({ className, isDisabled, onShortcut, ...props }: ChatShortcutListProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleShortcut = async (shortcut: ChatShortcut) => {
    await onShortcut?.(shortcut);
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
              "grid-auto-fill-[24rem,1fr] grid max-h-36 w-full max-w-full flex-wrap gap-2 overflow-y-auto overflow-x-hidden",
              className,
            )}
          >
            {CHAT_SHORTCUTS.map((shortcut) => (
              <li key={shortcut.title}>
                <ChatShortcutButton
                  {...shortcut}
                  className="w-full max-w-full"
                  disabled={isDisabled}
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
