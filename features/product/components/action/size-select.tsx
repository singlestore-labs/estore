"use client";

import { VariantProps, cva } from "class-variance-authority";
import { useId, useState } from "react";

import { ComponentProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem, RadioGroupProps } from "@/components/ui/radio-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Product } from "@/product/types";
import { cn } from "@/ui/lib";

export const productActionSizeSelectVariants = cva("flex items-center", {
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
      class: "rounded-sm gap-0 px-1.5",
    },
  ],
});

export const productActionSizeSelectButtonVariants = cva("border p-0 uppercase text-xs", {
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
      class: "w-4",
    },
  ],
});

export type ProductActionSizeSelectProps = ComponentProps<
  RadioGroupProps,
  {
    sizes: Product["sizes"];
    value?: keyof Product["sizes"];
    onChange?: (value: keyof Product["sizes"]) => Promise<void> | void;
  } & VariantProps<typeof productActionSizeSelectVariants>
>;

export function ProductActionSizeSelect({
  className,
  variant,
  size: rootSize,
  sizes,
  value,
  disabled,
  onChange,
  ...props
}: ProductActionSizeSelectProps) {
  const id = useId();
  const isDisabled = disabled || variant === "read";
  const entries = Object.entries(sizes);

  return (
    <RadioGroup
      {...props}
      className={cn(productActionSizeSelectVariants({ variant, size: rootSize }), className)}
      defaultValue={value}
      disabled={isDisabled}
      onValueChange={onChange}
    >
      {entries.map(([size, amount]) => {
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
                        productActionSizeSelectButtonVariants({ variant, size: rootSize }),
                        size !== value && "hover:cursor-pointer",
                      )}
                    >
                      <Label htmlFor={_id}>{size}</Label>
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
