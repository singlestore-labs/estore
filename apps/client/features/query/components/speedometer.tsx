"use client";

import { useEffect, useRef, useState } from "react";

import { ComponentProps } from "@/types";
import { Loader } from "@/components/loader";
import { cn } from "@/ui/lib";

export type QuerySpeedometerProps = ComponentProps<"div", { isLoading?: boolean }>;

export function QuerySpeedometer({
  children = "0.0ms",
  className,
  isLoading,
  ...props
}: QuerySpeedometerProps) {
  const [isLoadingVisible, setIsLoadingVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    if (isLoading && !timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        setIsLoadingVisible(true);
      }, 400);
    } else if (!isLoading && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }

    return () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    };
  }, [isLoading]);

  return (
    <div
      {...props}
      className={cn("", className)}
    >
      {isLoadingVisible ? (
        <span className="flex items-center gap-2">
          <Loader className="flex h-6 w-6" />
          <span className="text-sm">Running...</span>
        </span>
      ) : (
        children
      )}
    </div>
  );
}
