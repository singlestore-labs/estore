"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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

export type ChatInputFormSchema = z.infer<typeof chatInputFormSchema>;

export type ChatInputFormProps = ComponentProps<
  CardProps,
  {
    placeholder?: string;
    isLoading?: boolean;
    isDisabled?: boolean;
    onSubmit?: SubmitHandler<ChatInputFormSchema>;
  }
>;

export function ChatInputForm({
  className,
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

  useEffect(() => setFocus("content"), [setFocus, form.formState.isSubmitted]);

  return (
    <Card
      {...props}
      className={cn(
        "relative w-full max-w-full overflow-hidden",
        isFocused && "outline-none ring-2 ring-ring ring-offset-2 ring-offset-background",
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
                    className="h-14 min-h-14 w-full rounded-none border-none bg-transparent px-5 py-3.5 pr-16 text-xl focus-visible:ring-0 focus-visible:ring-offset-0"
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
            className="absolute bottom-2 right-2 z-[1] px-3"
            ref={buttonRef}
            type="submit"
            disabled={_isDisabled}
            isLoading={_isLoading}
          >
            <SendHorizonal className="w-6" />
          </Button>
        </form>
      </Form>
    </Card>
  );
}
