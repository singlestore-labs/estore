"use client";

import { cloneElement, useEffect, useRef, useState } from "react";

import type { ReactElement } from "react";
import type { ResponsiveContainerProps } from "recharts";

import { cn } from "@/ui/lib";

export type ChartResponsiveContainerProps = Omit<ResponsiveContainerProps, "children"> & {
  children: ReactElement;
};

export function ChartResponsiveContainer({
  aspect,
  width = "100%",
  height = "100%",
  minWidth = 0,
  minHeight,
  initialDimension = { width: -1, height: -1 },
  maxHeight,
  children,
  id,
  className,
  style,
  onResize,
}: ChartResponsiveContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState(initialDimension);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const updateDimension = () => {
      const { width, height } = element.getBoundingClientRect();
      const nextDimension = { width: Math.round(width), height: Math.round(height) };

      setDimension((dimension) =>
        dimension.width === nextDimension.width && dimension.height === nextDimension.height
          ? dimension
          : nextDimension,
      );
      onResize?.(nextDimension.width, nextDimension.height);
    };

    updateDimension();

    const observer = new ResizeObserver(updateDimension);
    observer.observe(element);

    return () => observer.disconnect();
  }, [onResize]);

  let chartWidth = typeof width === "number" ? width : dimension.width;
  let chartHeight = typeof height === "number" ? height : dimension.height;

  if (aspect && aspect > 0) {
    if (chartWidth > 0) {
      chartHeight = chartWidth / aspect;
    } else if (chartHeight > 0) {
      chartWidth = chartHeight * aspect;
    }

    if (maxHeight && chartHeight > maxHeight) {
      chartHeight = maxHeight;
    }
  }

  return (
    <div
      id={id ? `${id}` : undefined}
      className={cn("recharts-responsive-container", className?.toString())}
      style={{ ...style, width, height, minWidth, minHeight, maxHeight }}
      ref={containerRef}
    >
      {chartWidth > 0 &&
        chartHeight > 0 &&
        cloneElement(children, {
          width: chartWidth,
          height: chartHeight,
          style: {
            height: "100%",
            width: "100%",
            maxHeight: chartHeight,
            maxWidth: chartWidth,
            ...children.props.style,
          },
        })}
    </div>
  );
}
