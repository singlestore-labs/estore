import { VariantProps, cva } from "class-variance-authority";

import { ComponentProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem, RadioGroupProps } from "@/components/ui/radio-group";
import { ProductSizes } from "@/product/types";
import { cn } from "@/ui/lib";

export const productSizeSelectVariants = cva("flex items-center", {
  variants: {
    variant: {
      default: "",
      read: "",
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
});

export const productSizeSelectButtonVariants = cva("border p-0 uppercase text-xs", {
  variants: {
    variant: {
      default: "peer-disabled:hover:cursor-not-allowed",
      read: "hover:bg-transparent hover:text-foreground opacity-100 peer-disabled:cursor-auto",
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
});

export type ProductSizeSelectProps = ComponentProps<
  RadioGroupProps,
  {
    sizes: ProductSizes;
    value?: keyof ProductSizes;
    onChange?: (value: keyof ProductSizes) => Promise<void> | void;
  } & VariantProps<typeof productSizeSelectVariants>
>;

export function ProductSizeSelect({
  className,
  variant,
  size,
  sizes,
  value: _value,
  disabled,
  onChange,
  ...props
}: ProductSizeSelectProps) {
  const isDisabled = disabled || variant === "read";

  return (
    <RadioGroup
      {...props}
      className={cn(productSizeSelectVariants({ variant, size }), className)}
      defaultValue={_value}
      disabled={isDisabled}
      onValueChange={onChange}
    >
      {Object.keys(sizes).map((value) => (
        <div key={value}>
          <RadioGroupItem
            id={value}
            value={value}
            className="peer sr-only"
          />

          <Button
            asChild
            variant={value !== _value || variant === "read" ? "outline" : "default"}
            className={cn(productSizeSelectButtonVariants({ variant, size }))}
          >
            <Label htmlFor={value}>{value}</Label>
          </Button>
        </div>
      ))}
    </RadioGroup>
  );
}
