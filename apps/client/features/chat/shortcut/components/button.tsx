import { ComponentProps } from "@/types";
import { Button, ButtonProps } from "@/components/ui/button";
import { ChatShortcut } from "@/chat/shortcut/types";
import { cn } from "@/ui/lib";

export type ChatShortcutButtonProps = ComponentProps<ButtonProps, ChatShortcut>;

export function ChatShortcutButton({
  className,
  title,
  description,
  prompt,
  ...props
}: ChatShortcutButtonProps) {
  return (
    <Button
      variant="outline"
      {...props}
      className={cn("h-auto flex-col items-start text-wrap px-4 py-3 text-left", className)}
    >
      <span>{title}</span>
      <span className="text-muted-foreground line-clamp-1 text-sm font-normal">{description}</span>
    </Button>
  );
}
