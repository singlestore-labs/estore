import { ReactNode } from "react";

import { ComponentProps } from "@/types";
import { Card, CardProps } from "@/components/ui/card";
import { cn } from "@/ui/lib";

export type InfoCardProps = ComponentProps<
  CardProps,
  {
    title?: ReactNode;
    value?: ReactNode;
    headerProps?: ComponentProps<"div">;
  }
>;

export function InfoCard({ children, title, value, headerProps, className, ...props }: InfoCardProps) {
  return (
    <Card
      {...props}
      className={cn("flex flex-col gap-4 overflow-hidden", className)}
    >
      {(headerProps?.children || title || value) && (
        <div
          {...headerProps}
          className={cn("px-4 pt-3", headerProps?.className)}
        >
          {(title || value) && (
            <div>
              {title && <h2 className="font-medium">{title}</h2>}
              {value && <p className="text-xl font-medium">{value}</p>}
            </div>
          )}
          {headerProps?.children}
        </div>
      )}

      {children}
    </Card>
  );
}
