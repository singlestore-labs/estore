import { ComponentProps } from "@/types";
import { cn } from "@/ui/lib";

export type QueriesNavigationProps = ComponentProps<"div">;

export function QueriesNavigation({ className, ...props }: QueriesNavigationProps) {
  return (
    <div
      {...props}
      className={cn("", className)}
    >
      QueryNavigation
    </div>
  );
}
