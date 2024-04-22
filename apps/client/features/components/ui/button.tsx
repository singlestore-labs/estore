import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { Loader } from "@/components/loader";
import { cn } from "@/ui/lib";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        "default": "bg-primary text-primary-foreground hover:bg-primary/90",
        "destructive": "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        "outline": "border border-input bg-background hover:bg-accent hover:text-primary",
        "secondary": "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        "ghost": "hover:bg-accent hover:text-accent-foreground",
        "ghost-secondary": "hover:text-primary",
        "link": "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        link: "p-0 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const loaderVariants = cva("max-w-[75%]", {
  variants: {
    variant: {
      "default": "",
      "destructive": "fill-white text-red-400",
      "outline": "",
      "secondary": "",
      "ghost": "",
      "ghost-secondary": "",
      "link": "",
    },
    size: {
      default: "",
      sm: "w-5",
      lg: "",
      icon: "",
      link: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant, size, asChild = false, isLoading = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          isLoading && (!variant || variant === "default") && "fill-white text-white/25",
          isLoading && variant === "outline" && "fill-primary text-gray-400 disabled:opacity-100",
        )}
        ref={ref}
        {...props}
      >
        {isLoading ? <Loader className={cn(loaderVariants({ variant, size }))} /> : children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
