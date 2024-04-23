"use client";

import { DialogProps } from "@radix-ui/react-dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";

import { ComponentProps } from "@/types";
import { Button, ButtonProps } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAction } from "@/action/hooks/use-action";
import { createOrder } from "@/order/actions/create";
import { ProductPurchaseCardSuccess } from "@/product/components/purchase-card-success";
import { ProductLikesAction } from "@/product/likes/components/action";
import { ProductSalesChart } from "@/product/sales/components/chart";
import { getProductSalesMessage } from "@/product/sales/lib/get-message";
import { ProductSizeSelect } from "@/product/size/components/select";
import { Product } from "@/product/types";

export type ProductDialogProps = ComponentProps<DialogProps, Product>;

export function ProductDialog({ id, description, price, image, sizes, sales, ...props }: ProductDialogProps) {
  const unmountTimeoutRef = useRef<NodeJS.Timeout>();

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [sizeValue, setSizeValue] = useState<keyof typeof sizes>(Object.keys(sizes)[0]);
  const [isPurchased, setIsPurchased] = useState(false);
  const { execute, isPending } = useAction();

  const handleToggle: DialogProps["onOpenChange"] = (isOpen) => {
    if (!isOpen) {
      setIsOpen(false);
      unmountTimeoutRef.current = setTimeout(() => {
        router.back();
      }, 200);
    }
  };

  const handleBuyClick: ButtonProps["onClick"] = async () => {
    await execute(() => createOrder(id, sizeValue));
    setIsPurchased(true);
  };

  useEffect(
    () => () => {
      clearTimeout(unmountTimeoutRef.current);
      unmountTimeoutRef.current = undefined;
    },
    [],
  );

  let content: ReactNode;
  if (isPurchased) {
    content = (
      <ProductPurchaseCardSuccess
        productName={description}
        onSubmit={() => handleToggle(false)}
      />
    );
  } else {
    content = (
      <div className="flex w-full flex-col items-center gap-4">
        <Card className="relative size-64 overflow-hidden">
          <Image
            className="object-cover"
            src={image}
            alt="Glasses"
            fill
          />
        </Card>

        <div className="flex w-full max-w-full flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-2xl font-semibold capitalize">{description}</h2>
            <p className="text-2xl font-semibold">${price}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <ProductSizeSelect
              sizes={sizes}
              value={sizeValue}
              disabled={isPending}
              onChange={setSizeValue}
            />
            <ProductLikesAction
              className="ml-auto"
              productId={id}
            />
          </div>

          {!!sales.length && (
            <div>
              <h3 className="font-medium">{getProductSalesMessage(sales.length)}</h3>
              <ProductSalesChart
                className="mt-2"
                sales={sales}
              />
            </div>
          )}

          <Button
            className="mt-2"
            disabled={isPending}
            isLoading={isPending}
            onClick={handleBuyClick}
          >
            Buy
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Dialog
      defaultOpen
      open={isOpen}
      {...props}
      onOpenChange={handleToggle}
    >
      <DialogContent className="bg-card max-w-xl">{content}</DialogContent>
    </Dialog>
  );
}
