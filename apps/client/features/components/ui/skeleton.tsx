import { cn } from "@/ui/lib";

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("bg-muted animate-pulse rounded-lg", className)}
      {...props}
    />
  );
}

export { Skeleton };
