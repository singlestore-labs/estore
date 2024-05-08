import { ComponentProps } from "@/types";
import { Section, SectionProps } from "@/components/section";
import { queries } from "@/data/queries";
import { QueryContainer } from "@/query/components/container";
import { cn } from "@/ui/lib";

export type QueriesListProps = ComponentProps<SectionProps>;

export function QueriesList({ className, contentProps, ...props }: QueriesListProps) {
  return (
    <Section
      variant="secondary"
      spacing="none"
      title="Queries"
      description="Here are example queries showcasing the transactional, analytical, and contextual capabilities of SingleStore."
      {...props}
      className={cn("", className)}
      contentProps={{ ...contentProps, className: cn("flex flex-col gap-8", contentProps?.className) }}
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
