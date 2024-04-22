import { Heart } from "lucide-react";
import { useState } from "react";

import { ComponentProps } from "@/types";
import { Button, ButtonProps } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAction } from "@/action/hooks/use-action";
import { createProductLike } from "@/product/likes/actions/create";
import { deleteProductLike } from "@/product/likes/actions/delete";
import { Product } from "@/product/types";
import { cn } from "@/ui/lib";

export type ProductLikesActionProps = ComponentProps<ButtonProps, { productId: Product["id"] }>;

export function ProductLikesAction({ className, productId, ...props }: ProductLikesActionProps) {
  const [isLiked, setIsLiked] = useState(false);
  const { execute, isPending } = useAction();

  const handleClick: ButtonProps["onClick"] = async () => {
    try {
      await execute(() => (isLiked ? deleteProductLike(productId) : createProductLike(productId)));
      setIsLiked(!isLiked);
    } catch (error) {}
  };

  return (
    <TooltipProvider delayDuration={400}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            {...props}
            className={cn("", className)}
            variant="outline"
            size="icon"
            onClick={handleClick}
            isLoading={isPending}
            disabled={isPending}
          >
            <Heart className={cn("w-5", isLiked && "fill-primary text-primary")} />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="text-xs">{isLiked ? "Liked" : "Like"}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
