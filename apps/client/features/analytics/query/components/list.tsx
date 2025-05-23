import { ComponentProps } from "@/types";
import { Section, SectionProps } from "@/components/section";
import { AnalyticsQueryContainer, AnalyticsQueryContainerProps } from "@/analytics/query/components/container";
import { AnalyticsQuery } from "@/analytics/query/type";
import { cn } from "@/ui/lib";

export type AnalyticsQueriesListProps = ComponentProps<
  SectionProps,
  {
    queries: AnalyticsQuery[];
    onRunQueryClick?: AnalyticsQueryContainerProps["onRunClick"];
  }
>;

export function AnalyticsQueriesList({
  className,
  contentProps,
  headerProps,
  queries = [],
  onRunQueryClick,
  ...props
}: AnalyticsQueriesListProps) {
  return (
    <Section
      variant="secondary"
      spacing="none"
      title="Queries"
      description="Here are example queries showcasing the transactional, analytical, and contextual capabilities of SingleStore."
      {...props}
      className={cn("", className)}
      contentProps={{ ...contentProps, className: cn("flex flex-col gap-8", contentProps?.className) }}
      headerProps={{ ...headerProps, className: cn("px-5", headerProps?.className) }}
    >
      {queries.map((query) => (
        <AnalyticsQueryContainer
          key={query.title}
          {...query}
          onRunClick={onRunQueryClick}
        />
      ))}
    </Section>
  );
}
