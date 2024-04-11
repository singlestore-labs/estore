import { ComponentProps } from "@/types";
import { cn } from "@/ui/lib";

export type FadeProps = ComponentProps<"span", { direction?: "t" | "b" | "l" | "r" }>;

export function Fade({ className, direction = "t", ...props }: FadeProps) {
  return (
    <span
      {...props}
      className={cn(
        `gradient-mask-${direction}-0 pointer-events-none absolute z-[1] bg-background transition-all`,
        className,
      )}
    ></span>
  );
}
