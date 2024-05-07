import { VariantProps, cva } from "class-variance-authority";
import { ReactNode } from "react";

import { ComponentProps } from "@/types";
import {
  Card,
  CardContent,
  CardContentProps,
  CardDescription,
  CardHeader,
  CardProps,
  CardTitle,
  CardTitleProps,
} from "@/components/ui/card";
import { cn } from "@/ui/lib";

export const sectionVariants = cva("", {
  variants: {
    variant: {
      default: "",
      secondary: "border-none shadow-none bg-transparent dark:bg-transparent",
      tertiary: "border-none shadow-none bg-transparent dark:bg-transparent",
    },
    size: {
      default: "",
      xs: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export const sectionHeaderVariants = cva("space-y-1", {
  variants: {
    variant: {
      default: "border-b",
      secondary: "",
      tertiary: "",
    },
    size: {
      default: "py-3 px-5",
      xs: "p-0",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
  compoundVariants: [{ variant: "tertiary", size: "xs", class: "[&+*]:mt-2" }],
});

export const sectionTitleVariants = cva("font-medium", {
  variants: {
    variant: {
      default: "",
      secondary: "",
      tertiary: "",
    },
    size: {
      default: "text-base",
      xs: "text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export const sectionContentVariants = cva("", {
  variants: {
    variant: {
      default: "",
      secondary: "",
      tertiary: "bg-zinc-50 dark:bg-zinc-800 rounded-lg border",
    },
    size: {
      default: "px-5 pb-5 pt-4",
      xs: "p-0 text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },

  compoundVariants: [{ variant: "tertiary", size: "xs", class: "py-2 px-4" }],
});

export type SectionProps = ComponentProps<
  CardProps,
  {
    title?: ReactNode;
    titleProps?: CardTitleProps;
    description?: ReactNode;
    contentProps?: CardContentProps;
  } & VariantProps<typeof sectionVariants>
>;

export function Section({
  variant,
  size,
  children,
  className,
  title,
  titleProps,
  description,
  contentProps,
  ...props
}: SectionProps) {
  return (
    <Card
      {...props}
      as="section"
      className={cn(sectionVariants({ variant, size }), className)}
    >
      {(title || description) && (
        <CardHeader className={sectionHeaderVariants({ variant, size })}>
          <CardTitle
            as="h2"
            {...titleProps}
            className={cn(sectionTitleVariants({ variant, size }), titleProps?.className)}
          >
            {title}
          </CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}

      <CardContent
        {...contentProps}
        className={cn(sectionContentVariants({ variant, size }), contentProps?.className)}
      >
        {children}
      </CardContent>
    </Card>
  );
}
