"use client";

import { DialogProps } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";

import { ComponentProps } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ROUTES } from "@/constants/routes";
import { Product } from "@/product/types";

export type ProductDialogProps = ComponentProps<DialogProps, { product?: Product }>;

export function ProductDialog({ ...props }: ProductDialogProps) {
  const router = useRouter();

  const handleToggle: DialogProps["onOpenChange"] = (isOpen) => {
    if (!isOpen) router.push(ROUTES.ROOT);
  };

  return (
    <Dialog
      defaultOpen
      {...props}
      onOpenChange={handleToggle}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Test</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
