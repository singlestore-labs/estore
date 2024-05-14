import { ReactNode } from "react";

import { ComponentProps } from "@/types";
import { Card, CardProps } from "@/components/ui/card";
import { cn } from "@/ui/lib";

export type InfoCardProps = ComponentProps<CardProps, { title?: ReactNode; value?: ReactNode }>;

export function InfoCard({ children, className, title, value, ...props }: InfoCardProps) {
  return (
    <Card
      {...props}
      className={cn("flex flex-col gap-4 overflow-hidden", className)}
    >
      {(title || value) && (
        <div className="px-4 pt-3">
          {title && <h2 className="font-medium">{title}</h2>}
          {value && <p className="text-xl font-medium">{value}</p>}
        </div>
      )}

      {children}
    </Card>
  );
}
