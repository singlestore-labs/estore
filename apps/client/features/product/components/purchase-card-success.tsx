import { CircleCheck } from "lucide-react";

import { ComponentProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Product } from "@/product/types";
import { cn } from "@/ui/lib";

export type ProductPurchaseCardSuccessProps = ComponentProps<
  "div",
  { productName: Product["description"]; onSubmit?: () => void }
>;

export function ProductPurchaseCardSuccess({
  className,
  productName,
  onSubmit,
  ...props
}: ProductPurchaseCardSuccessProps) {
  return (
    <div
      {...props}
      className={cn("flex flex-col items-center justify-center gap-4 py-4", className)}
    >
      <CircleCheck className="text-primary h-24 w-24" />
      <h2 className="text-center text-2xl font-semibold">
        You have successfully purchased
        <br />
        <span className="text-primary capitalize">{productName}</span>
      </h2>
      <Button
        className="mt-2"
        onClick={onSubmit}
      >
        Continue shopping
      </Button>
    </div>
  );
}
