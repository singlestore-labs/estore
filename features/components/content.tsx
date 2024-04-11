import Markdown, { Options } from "react-markdown";

import { ComponentProps } from "@/types";
import { cn } from "@/ui/lib";

export type ContentProps = ComponentProps<"div", { children?: Options["children"] }>;

export function Content({ children, className, ...props }: ContentProps) {
  return (
    <div
      {...props}
      className={cn("w-full max-w-full [&_pre]:overflow-auto", className)}
    >
      <Markdown>{children}</Markdown>
    </div>
  );
}
