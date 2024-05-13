import { VariantProps, cva } from "class-variance-authority";
import { ReactNode } from "react";

import { ComponentProps } from "@/types";
import {
  Card,
  CardContent,
  CardContentProps,
  CardDescription,
  CardHeader,
  CardHeaderProps,
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
      sm: "",
      xs: "",
    },
    spacing: {
      default: "",
      none: "",
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
      tertiary: "",
    },
    size: {
      default: "py-3 px-5 space-y-1",
      sm: "py-3 px-5 space-y-1",
      xs: "py-2 px-4 space-y-0.5",
    },
    spacing: {
      default: "",
      none: "p-0",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
  compoundVariants: [
    { variant: "tertiary", size: "default", class: "[&+*]:mt-3" },
    { variant: "tertiary", size: "sm", class: "[&+*]:mt-3" },
    { variant: "tertiary", size: "xs", class: "[&+*]:mt-2" },
  ],
});

export const sectionTitleVariants = cva("font-medium", {
  variants: {
    variant: {
      default: "",
      secondary: "",
      tertiary: "",
    },
    size: {
      default: "text-xl",
      sm: "text-base",
      xs: "text-sm",
    },
    spacing: {
      default: "",
      none: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export const sectionContentVariants = cva("h-full", {
  variants: {
    variant: {
      default: "",
      secondary: "",
      tertiary: "rounded-lg border",
    },
    size: {
      default: "p-5",
      sm: "px-5 pb-5 pt-4",
      xs: "px-4 pb-4 pt-3",
    },
    spacing: {
      default: "",
      none: "px-0 pb-0",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },

  compoundVariants: [
    { variant: "tertiary", size: "default", class: "py-4 px-5" },
    { variant: "tertiary", size: "sm", class: "py-4 px-5" },
    { variant: "tertiary", size: "xs", class: "py-3 px-4" },
  ],
});

export type SectionProps = ComponentProps<
  CardProps,
  {
    title?: ReactNode;
    titleProps?: CardTitleProps;
    description?: ReactNode;
    headerProps?: CardHeaderProps;
    contentProps?: CardContentProps;
  } & VariantProps<typeof sectionVariants>
>;

export function Section({
  variant,
  size,
  spacing,
  children,
  className,
  title,
  titleProps,
  description,
  headerProps,
  contentProps,
  ...props
}: SectionProps) {
  return (
    <Card
      {...props}
      as="section"
      className={cn(sectionVariants({ variant, size, spacing }), className)}
    >
      {(title || description) && (
        <CardHeader
          {...headerProps}
          className={cn(sectionHeaderVariants({ variant, size, spacing }), headerProps?.className)}
        >
          <CardTitle
            as="h2"
            {...titleProps}
            className={cn(sectionTitleVariants({ variant, size, spacing }), titleProps?.className)}
          >
            {title}
          </CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}

      <CardContent
        {...contentProps}
        className={cn(sectionContentVariants({ variant, size, spacing }), contentProps?.className)}
      >
        {children}
      </CardContent>
    </Card>
  );
}
