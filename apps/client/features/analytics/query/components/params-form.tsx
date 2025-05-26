"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { sentenceCase } from "change-case";
import { ReactNode, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z, ZodEnum, ZodNumber, ZodString } from "zod";

import { ComponentProps, Defined } from "@/types";
import { Select } from "@/components/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AnalyticsQuery } from "@/analytics/query/type";
import { cn } from "@/ui/lib";

export type AnalyticsQueryParamsFormProps<T extends z.AnyZodObject = z.AnyZodObject> = ComponentProps<
  "form",
  {
    schema: T;
    defaultValues?: z.infer<T>;
    fields?: Defined<AnalyticsQuery["params"]>["fields"];
    onChange?: (values: z.infer<T>) => void;
  }
>;

export function AnalyticsQueryParamsForm<T extends z.AnyZodObject = z.AnyZodObject>({
  className,
  schema,
  defaultValues,
  fields = {},
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
        className={cn("grid-auto-fill-[20rem] grid gap-4", className)}
      >
        {Object.entries(schema.shape).map(([name, zodType]) => {
          const { label, placeholder, optionCase } = fields[name];

          return (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => {
                let control = null;

                if (zodType instanceof ZodString) {
                  control = (
                    <Input
                      {...field}
                      type="text"
                      placeholder={placeholder}
                    />
                  );
                }

                if (zodType instanceof ZodNumber) {
                  control = (
                    <Input
                      {...field}
                      type="number"
                      placeholder={placeholder}
                      min={zodType.minValue ?? undefined}
                      max={zodType.maxValue ?? undefined}
                      value={field.value.toString()}
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  );
                }

                if (zodType instanceof ZodEnum) {
                  control = (
                    <Select
                      value={field.value}
                      options={Object.values(zodType.Values).map((value) => ({
                        label: optionCase === "upper" ? value.toUpperCase() : sentenceCase(value),
                        value,
                      }))}
                      onChange={field.onChange}
                    />
                  );
                }

                return (
                  <FormItem>
                    <FormLabel>{label ?? name}</FormLabel>
                    <FormControl>{control}</FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          );
        })}
      </form>
    </Form>
  );
}
