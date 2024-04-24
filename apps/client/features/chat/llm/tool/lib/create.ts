import { ReactNode } from "react";
import { z } from "zod";

export function createChatLLMTool<
  T extends {
    name: string;
    description: string;
    schema: z.ZodSchema;
  },
  C extends (props: z.infer<T["schema"]>) => Promise<{ name: T["name"]; props: any; error?: Error }>,
  R extends (props: Awaited<ReturnType<C>>["props"]) => ReactNode,
>({ name, description, schema }: T, call: C, getNode?: R) {
  const parseArgs = (args: string) => JSON.parse(args) as z.infer<T["schema"]>;
  return { name, description, schema, parseArgs, call, getNode };
}
