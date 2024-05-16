import humanNumber from "human-number";

import { ComponentProps } from "@/types";
import { Fade } from "@/components/fade";
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
      <div className="flex items-center gap-4 pb-4 pl-4">
        <ProductTypeRevenueSplitInfoChart
          data={data}
          colors={colors}
        />
        <div className="relative flex-1">
          <ul className="grid-auto-fit-[3.5rem] grid max-h-24 gap-x-4 gap-y-2 overflow-auto py-1 pr-4">
            {data.map((data, i) => (
              <li
                className=""
                key={data.id}
              >
                <div className="flex items-center gap-1">
                  <span
                    className="block size-1.5 rounded-full"
                    style={{ background: colors[i] }}
                  />
                  <h3 className="text-xs font-medium first-letter:uppercase">{data.label}</h3>
                </div>

                <div>
                  <p className="text-sm font-medium">${humanNumber(data.revenue, (v) => v.toFixed(0))}</p>
                </div>
              </li>
            ))}
          </ul>
          <Fade
            className="left-0 top-0 z-[2] h-2 w-full"
            direction="b"
          />
          <Fade
            className="bottom-0 left-0 z-[2] h-2 w-full"
            direction="t"
          />
        </div>
      </div>
    </InfoCard>
  );
}
