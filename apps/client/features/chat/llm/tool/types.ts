export type ToolResult<T extends string = string, P extends Record<string, any> = Record<string, any>> = {
  name: T;
  props: P;
};
