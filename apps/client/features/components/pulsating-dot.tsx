import { ComponentProps } from "@/types";
import { cn } from "@/ui/lib";

export type PulsatingDotProps = ComponentProps<"span">;

export function PulsatingDot({ className, ...props }: PulsatingDotProps) {
  return (
    <span
      {...props}
      className={cn("text-primary relative h-[1em] w-[1em]", className)}
    >
      <span className="absolute left-1/2 top-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 animate-[puslating-dot_1s_ease-out_infinite] rounded-full border-[0.25em] border-current" />
      <span className="absolute left-1/2 top-1/2 h-[75%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
    </span>
  );
}
