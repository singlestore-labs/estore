import { ComponentProps } from "@/types";
import { Section, SectionProps } from "@/components/section";
import { QueryContainer } from "@/query/components/container";
import { QUERY_LIST } from "@/query/constants/list";
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
      {QUERY_LIST.map(({ getQuery, ...query }) => (
        <QueryContainer
          key={query.title}
          {...query}
          query={getQuery()}
        />
      ))}
    </Section>
  );
}
