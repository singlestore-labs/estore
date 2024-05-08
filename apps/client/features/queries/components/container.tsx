import { ComponentProps } from "@/types";
import { Section } from "@/components/section";
import { queries } from "@/data/queries";
import { QueryContainer } from "@/query/components/container";
import { cn } from "@/ui/lib";

export type QueriesContainerProps = ComponentProps<"div">;

export function QueriesContainer({ className }: QueriesContainerProps) {
  return (
    <Section
      className={cn("", className)}
      variant="secondary"
      spacing="none"
      title="Queries"
      description="Here are example queries showcasing the transactional, analytical, and contextual capabilities of SingleStore."
      contentProps={{ className: "flex flex-col gap-8" }}
    >
      {queries.map((query) => (
        <QueryContainer
          key={query.title}
          title={query.title}
          description={query.description}
        />
      ))}
    </Section>
  );
}
