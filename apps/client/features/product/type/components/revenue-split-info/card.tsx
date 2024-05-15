import { ComponentProps } from "@/types";
import { InfoCard, InfoCardProps } from "@/components/info-card";
import { ProductTypeRevenueSplitInfoChart } from "@/product/type/components/revenue-split-info/chart";
import { getProductTypeRevenueSplit } from "@/product/type/lib/get-revenue-split";
import { getColors, getTheme } from "@/ui/get-theme";

export type ProductTypesRevenueSplitInfoCardProps = ComponentProps<InfoCardProps>;

const theme = getTheme();
const colors = [...getColors(theme, "purple")];

export async function ProductTypesRevenueSplitInfoCard({ ...props }: ProductTypesRevenueSplitInfoCardProps) {
  const data = await getProductTypeRevenueSplit();

  return (
    <InfoCard
      {...props}
      title="Revenue split"
    >
      <ProductTypeRevenueSplitInfoChart
        data={data}
        colors={colors}
      />
    </InfoCard>
  );
}
