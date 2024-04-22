export type ChatAgentToolOutput = {
  role: "function";
  name: string;
  props: Record<string, any>;
  error?: unknown;
};
