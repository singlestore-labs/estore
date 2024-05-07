import { ComponentProps } from "@/types";
import { QueryContainer } from "@/query/components/container";

export type QueriesContainerProps = ComponentProps<"div">;

export function QueriesContainer({ className }: QueriesContainerProps) {
  return <QueryContainer className={className} />;
}
