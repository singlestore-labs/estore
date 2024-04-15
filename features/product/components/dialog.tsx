"use client";

import { DialogProps } from "@radix-ui/react-dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ComponentProps } from "@/types";
import { Button, ButtonProps } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ProductLikesAction } from "@/product/likes/components/action";
import { ProductSizeSelect } from "@/product/size/components/select";
import { Product } from "@/product/types";

export type ProductDialogProps = ComponentProps<DialogProps, Product>;

export function ProductDialog({ id, description, price, image, sizes, ...props }: ProductDialogProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const unmountTimeoutRef = useRef<NodeJS.Timeout>();
  const [sizeValue, setSizeValue] = useState<keyof typeof sizes>(Object.keys(sizes)[0]);

  const handleToggle: DialogProps["onOpenChange"] = (isOpen) => {
    if (!isOpen) {
      setIsOpen(false);
      unmountTimeoutRef.current = setTimeout(() => {
        router.back();
      }, 200);
    }
  };

  const handleBuyClick: ButtonProps["onClick"] = async () => {
    console.log({ id, sizeValue });
  };

  useEffect(
    () => () => {
      clearTimeout(unmountTimeoutRef.current);
      unmountTimeoutRef.current = undefined;
    },
    [],
  );

  return (
    <Dialog
      defaultOpen
      open={isOpen}
      {...props}
      onOpenChange={handleToggle}
    >
      <DialogContent>
        <div className="flex w-full flex-col items-center gap-4">
          <Card className="relative size-64 overflow-hidden">
            <Image
              className="object-cover"
              src={image}
              alt="Glasses"
              fill
            />
          </Card>

          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <h4 className="text-2xl font-semibold capitalize">{description}</h4>
              <p className="text-2xl font-semibold">${price}</p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <ProductSizeSelect
                sizes={sizes}
                value={sizeValue}
                onChange={setSizeValue}
              />
              <ProductLikesAction className="ml-auto" />
            </div>

            <Button
              className="mt-2"
              onClick={handleBuyClick}
            >
              Buy
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
