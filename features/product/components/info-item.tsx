import { ElementType, ReactNode } from "react";

import { ComponentProps } from "@/types";
import { Button, ButtonProps } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/ui/lib";

export type ProductInfoItemProps = ComponentProps<
  ButtonProps,
  {
    children?: string | number;
    label?: ReactNode;
    icon?: ElementType;
  }
>;

export function ProductInfoItem({
  children,
  className,
  label,
  icon: Icon,
  onClick,
  ...props
}: ProductInfoItemProps) {
  const _Icon = Icon ? <Icon className="w-5" /> : undefined;

  const content = (
    <>
      {_Icon}
      <span>{children}</span>
    </>
  );

  return (
    <TooltipProvider delayDuration={400}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost-secondary"
            size="sm"
            {...props}
            className={cn("gap-1 p-0", !onClick && "p-0 hover:text-inherit", className)}
            asChild={!onClick}
            onClick={onClick}
          >
            {onClick ? content : <span>{content}</span>}
          </Button>
        </TooltipTrigger>
        {label && <TooltipContent className="text-xs">{label}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
}
