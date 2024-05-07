import { ComponentProps } from "@/types";
import { Section, SectionProps } from "@/components/section";
import { Button } from "@/components/ui/button";
import { QuerySpeedometer } from "@/query/components/speedometer";
import { cn } from "@/ui/lib";

export type QueryContainerProps = ComponentProps<SectionProps>;

export function QueryContainer({ className, ...props }: QueryContainerProps) {
  return (
    <Section
      {...props}
      className={cn("flex flex-col", className)}
      title="Get the top product"
      description="Finds the top product, based on sales and likes"
      contentProps={{ className: "flex flex-col flex-1 gap-4" }}
    >
      <div className="flex flex-1 flex-wrap gap-4">
        <Section
          variant="tertiary"
          size="xs"
          className="flex flex-1 flex-col max-md:basis-full"
          title="Query"
          titleProps={{ as: "h3" }}
          contentProps={{ className: "flex-1 overflow-auto" }}
        >
          Test
        </Section>
        <Section
          variant="tertiary"
          size="xs"
          className="flex flex-1 flex-col max-md:basis-full"
          title="Result"
          titleProps={{ as: "h3" }}
          contentProps={{ className: "flex-1 overflow-auto bg-transparent" }}
        >
          Test
        </Section>
      </div>

      <div className="flex items-center justify-between gap-4">
        <QuerySpeedometer />
        <Button className="ml-auto">Run</Button>
      </div>
    </Section>
  );
}
