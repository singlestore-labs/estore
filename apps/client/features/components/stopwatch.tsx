"use client";

import { formatMs } from "@repo/helpers";
import { ReactNode, useEffect, useRef } from "react";

import { ComponentProps } from "@/types";
import { Loader } from "@/components/loader";
import { cn } from "@/ui/lib";

export type StopwatchProps = ComponentProps<
  "div",
  { ms?: number; resultLabel?: ReactNode; isRunning?: boolean }
>;

const msAttributeName = "data-ms";

export function Stopwatch({ className, ms = 0, resultLabel, isRunning, ...props }: StopwatchProps) {
  const msRef = useRef<HTMLParagraphElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    if (!isRunning) return;

    clearInterval(intervalRef.current);

    if (msRef.current) {
      msRef.current.setAttribute(msAttributeName, "0");
      msRef.current.textContent = "0ms";
    }

    intervalRef.current = setInterval(() => {
      if (msRef.current) {
        const ms = +(msRef.current.getAttribute(msAttributeName) || 0) + 10;
        msRef.current.setAttribute(msAttributeName, ms.toString());
        msRef.current.textContent = formatMs(ms).join("");
      }
    }, 10);

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    };
  }, [isRunning]);

  return (
    <div
      {...props}
      className={cn("flex items-center gap-2", className)}
    >
      {isRunning && <Loader className="flex h-6 w-6" />}
      <p>
        {!isRunning && resultLabel}
        <span
          ref={msRef}
          data-ms={ms}
        >
          {formatMs(ms).join("")}
        </span>
      </p>
    </div>
  );
}
