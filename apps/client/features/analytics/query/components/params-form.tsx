"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z, ZodString } from "zod";

import { ComponentProps } from "@/types";
import { Form } from "@/components/ui/form";
import { cn } from "@/ui/lib";

export type AnalyticsQueryParamsFormProps<T extends z.AnyZodObject = z.AnyZodObject> = ComponentProps<
  "form",
  {
    schema: T;
    defaultValues?: z.infer<T>;
    onChange?: (values: z.infer<T>) => void;
  }
>;

export function AnalyticsQueryParamsForm<T extends z.AnyZodObject = z.AnyZodObject>({
  className,
  schema,
  defaultValues,
  onChange,
  ...props
}: AnalyticsQueryParamsFormProps<T>) {
  const form = useForm({
    mode: "onChange",
    defaultValues: {
      ...defaultValues,
    },
    resolver: zodResolver(schema),
  });

  const watched = useWatch({ control: form.control });

  useEffect(() => onChange?.(watched), [watched, onChange]);

  return (
    <Form {...form}>
      <form
        {...props}
        className={cn("", className)}
      >
        {Object.entries(schema.shape).map(([name, zodType]) => {
          if (zodType instanceof ZodString) {
            return name;
          }
        })}
      </form>
    </Form>
  );
}
