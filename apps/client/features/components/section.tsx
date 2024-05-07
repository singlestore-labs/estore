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
      secondary: "border-none shadow-none",
    },
    size: {
      default: "",
      sm: "",
      xs: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export const sectionHeaderVariants = cva("", {
  variants: {
    variant: {
      default: "border-b",
      secondary: "",
    },
    size: {
      default: "py-4 px-6",
      sm: "py-3 px-5",
      xs: "p-0",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export const sectionTitleVariants = cva("font-medium", {
  variants: {
    variant: {
      default: "",
      secondary: "",
    },
    size: {
      default: "text-lg",
      sm: "text-base",
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
    },
    size: {
      default: "pt-4 pb-5 px-6",
      sm: "pt-4 px-5 pb-5",
      xs: "p-0 pt-2 text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
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
