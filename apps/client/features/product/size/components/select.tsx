"use client";

import { VariantProps, cva } from "class-variance-authority";
import { useId } from "react";

import { ComponentProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem, RadioGroupProps } from "@/components/ui/radio-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Product } from "@/product/types";
import { cn } from "@/ui/lib";

export const productSizeSelectVariants = cva("flex items-center", {
  variants: {
    variant: {
      default: "",
      read: "border",
    },
    size: {
      default: "gap-1",
      xs: "gap-0.5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
  compoundVariants: [
    {
      variant: "read",
      size: "xs",
      class: "rounded-sm px-2 gap-1",
    },
  ],
});

export const productSizeSelectButtonVariants = cva("border p-0 uppercase text-xs", {
  variants: {
    variant: {
      default: "peer-disabled:hover:cursor-not-allowed",
      read: "hover:bg-transparent hover:text-foreground opacity-100 peer-disabled:cursor-auto border-none",
    },
    size: {
      default: "h-9 w-10",
      xs: "h-6 w-6 rounded-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
  compoundVariants: [
    {
      variant: "read",
      size: "xs",
      class: "w-auto",
    },
  ],
});

export type ProductSizeSelectProps = ComponentProps<
  RadioGroupProps,
  {
    sizes: Product["sizes"];
    value?: Product["sizes"][number][1];
    onChange?: (value: Product["sizes"][number][1]) => Promise<void> | void;
  } & VariantProps<typeof productSizeSelectVariants>
>;

export function ProductSizeSelect({
  className,
  variant,
  size: rootSize,
  sizes = [],
  value,
  disabled,
  onChange,
  ...props
}: ProductSizeSelectProps) {
  const id = useId();
  const isDisabled = disabled || variant === "read";

  return (
    <RadioGroup
      {...props}
      className={cn(productSizeSelectVariants({ variant, size: rootSize }), className)}
      defaultValue={value}
      disabled={isDisabled}
      onValueChange={onChange}
    >
      {sizes.map(([, size, amount]) => {
        const _id = id + ` ${size}`;

        return (
          <div key={size}>
            <TooltipProvider delayDuration={400}>
              <Tooltip>
                <TooltipTrigger
                  asChild
                  onFocus={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div>
                    <RadioGroupItem
                      id={_id}
                      value={size}
                      className="peer sr-only"
                    />
                    <Button
                      asChild
                      variant={size !== value || variant === "read" ? "outline" : "default"}
                      className={cn(
                        productSizeSelectButtonVariants({ variant, size: rootSize }),
                        size !== value && "hover:cursor-pointer",
                        size === "oneSize" && "w-auto",
                        size === "oneSize" && variant !== "read" && "px-2",
                      )}
                    >
                      <Label htmlFor={_id}>{size !== "oneSize" ? size : "one size"}</Label>
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="text-xs">{amount} in stock</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      })}
    </RadioGroup>
  );
}
