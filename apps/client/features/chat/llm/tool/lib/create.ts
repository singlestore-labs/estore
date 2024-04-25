import { ComponentProps, ElementType, createElement } from "react";
import { z } from "zod";

import { ToolResult } from "@/chat/llm/tool/types";

export function createChatLLMTool<
  Name extends string = string,
  Description extends string = string,
  Schema extends z.AnyZodObject = z.AnyZodObject,
  Node extends ElementType | undefined = undefined,
  Call extends (
    props: z.infer<Schema>,
  ) => Promise<ToolResult<Name, Node extends ElementType ? ComponentProps<Node> : any>> = (
    props: z.infer<Schema>,
  ) => Promise<ToolResult<Name, Node extends ElementType ? ComponentProps<Node> : any>>,
>({
  name,
  description,
  schema,
  node,
  call,
}: {
  name: Name;
  description: Description;
  schema: Schema;
  node?: Node;
  call: Call;
}) {
  let _args: Parameters<Call>[0] | undefined = undefined;
  let _result: ToolResult<Name, Node extends ElementType ? ComponentProps<Node> : any> | undefined = undefined;

  const _call = async () => {
    _result = _args ? await call(_args) : undefined;
    return _result;
  };

  const setArgs = (args: string) => (_args = JSON.parse(args));

  const getResult = () => _result;

  const getNode = () => {
    if (!node) return undefined;
    return _result ? createElement(node, _result.props) : undefined;
  };

  return { name, description, schema, node, setArgs, call: _call, getResult, getNode };
}
