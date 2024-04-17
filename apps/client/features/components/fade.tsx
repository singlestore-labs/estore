import { ComponentProps, Defined } from "@/types";
import { cn } from "@/ui/lib";

export type FadeProps = ComponentProps<"span", { direction?: "t" | "b" | "l" | "r" }>;

const directionClasses: Record<Defined<FadeProps["direction"]>, string> = {
  t: "gradient-mask-t-0",
  b: "gradient-mask-b-0",
  l: "gradient-mask-l-0",
  r: "gradient-mask-r-0",
};

export function Fade({ className, direction = "t", ...props }: FadeProps) {
  return (
    <span
      {...props}
      className={cn(
        "bg-background pointer-events-none absolute z-[1] transition-all",
        directionClasses[direction],
        className,
      )}
    />
  );
}
