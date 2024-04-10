import { Ruler } from "lucide-react";

import { ComponentProps } from "@/types";
import { ProductInfoItem, ProductInfoItemProps } from "@/product/components/info/item";
import { cn } from "@/ui/lib";

export type ProductInfoSizesProps = ComponentProps<ProductInfoItemProps>;

export function ProductInfoSizes({ className, ...props }: ProductInfoSizesProps) {
  const sizes = { x: 12, s: 3, m: 5 };
  const keys = Object.keys(sizes);

  const label = (
    <div>
      <p>Sizes in stock</p>
      <ul className="mt-1">
        {Object.entries(sizes).map(([size, amount]) => (
          <li
            key={size}
            className="uppercase"
          >{`${size}: ${amount}`}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <ProductInfoItem
      {...props}
      className={cn("uppercase", className)}
      icon={Ruler}
      label={label}
    >
      {keys.join(", ")}
    </ProductInfoItem>
  );
}
