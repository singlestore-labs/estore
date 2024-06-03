"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { VariantProps, cva } from "class-variance-authority";
import { SendHorizonal } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { ComponentProps, Defined } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardProps } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea, TextareaProps } from "@/components/ui/textarea";
import { cn } from "@/ui/lib";

const chatInputFormSchema = z.object({
  content: z.string().min(1).max(1024),
});

export const chatInputFormVariants = cva("relative w-full max-w-full", {
  variants: {
    size: {
      default: "",
      sm: "",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export const chatInputFormTextareaVariants = cva(
  "w-full rounded-none border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0",
  {
    variants: {
      size: {
        default: "h-14 min-h-14 px-5 py-3.5 pr-16 text-xl max-md:text-lg",
        sm: "h-12 min-h-12 px-5 py-3 pr-16 text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export const chatInputFormButtonVariants = cva("absolute px-3 z-[1]", {
  variants: {
    size: {
      default: "text-2xl bottom-2 right-2",
      sm: "text-lg bottom-1 right-1",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export type ChatInputFormSchema = z.infer<typeof chatInputFormSchema>;

export type ChatInputFormProps = ComponentProps<
  CardProps,
  {
    placeholder?: string;
    isLoading?: boolean;
    isDisabled?: boolean;
    onSubmit?: SubmitHandler<ChatInputFormSchema>;
  } & VariantProps<typeof chatInputFormVariants>
>;

export function ChatInputForm({
  className,
  size,
  placeholder,
  isLoading = false,
  isDisabled = false,
  onSubmit,
  ...props
}: ChatInputFormProps) {
  const form = useForm<ChatInputFormSchema>({
    resolver: zodResolver(chatInputFormSchema),
    defaultValues: { content: "" },
  });

  const { reset, setFocus } = form;
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const _isLoading = isLoading || form.formState.isSubmitting || form.formState.isLoading;
  const _isDisabled = _isLoading || isDisabled || form.formState.disabled;
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = useCallback<SubmitHandler<ChatInputFormSchema>>(
    async (...args) => {
      await onSubmit?.(...args);
      reset();
    },
    [reset, onSubmit],
  );

  const handleTextareaKeyDown = useCallback<Defined<TextareaProps["onKeyDown"]>>((event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      buttonRef.current?.click();
    }
  }, []);

  useEffect(() => setFocus("content"), [setFocus, isDisabled]);

  return (
    <Card
      {...props}
      className={cn(
        chatInputFormVariants({ size }),
        isFocused && "ring-ring ring-offset-background outline-none ring-2 ring-offset-2",
        className,
      )}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className={chatInputFormTextareaVariants({ size })}
                    placeholder={placeholder}
                    {...field}
                    disabled={_isDisabled || field.disabled}
                    onKeyDown={handleTextareaKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                      field.onBlur();
                      setIsFocused(false);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className={chatInputFormButtonVariants({ size })}
            ref={buttonRef}
            type="submit"
            disabled={_isDisabled}
            isLoading={_isLoading}
          >
            <SendHorizonal className="w-[1em]" />
          </Button>
        </form>
      </Form>
    </Card>
  );
}
