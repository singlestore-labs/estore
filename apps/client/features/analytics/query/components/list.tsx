import { ComponentProps } from "@/types";
import { Section, SectionProps } from "@/components/section";
import { AnalyticsQueryContainer } from "@/analytics/query/components/container";
import { ANALYTICS_QUERY_LIST } from "@/analytics/query/constants/list";
import { cn } from "@/ui/lib";

export type AnalyticsQueriesListProps = ComponentProps<SectionProps>;

export function AnalyticsQueriesList({
  className,
  contentProps,
  headerProps,
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
      {ANALYTICS_QUERY_LIST.map(({ getQuery, ...query }) => (
        <AnalyticsQueryContainer
          key={query.title}
          {...query}
          query={getQuery()}
        />
      ))}
    </Section>
  );
}
