"use client";

import { DialogProps } from "@radix-ui/react-dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ComponentProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ProductInfoContainer } from "@/product/components/info/container";
import { Product } from "@/product/types";

export type ProductDialogProps = ComponentProps<DialogProps, Product>;

export function ProductDialog({ description, price, image, ...props }: ProductDialogProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const unmountTimeoutRef = useRef<NodeJS.Timeout>();

  const handleToggle: DialogProps["onOpenChange"] = (isOpen) => {
    if (!isOpen) {
      setIsOpen(false);
      unmountTimeoutRef.current = setTimeout(() => {
        router.back();
      }, 200);
    }
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

          <div className="flex flex-col">
            <div className="flex items-start justify-between gap-4">
              <h4 className="text-2xl font-semibold capitalize">{description}</h4>
              <p className="text-2xl font-semibold">${price}</p>
            </div>

            <ProductInfoContainer className="mt-2 gap-4" />

            <Button className="mt-4">Buy</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
