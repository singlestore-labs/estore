import { Heart } from "lucide-react";
import { useState } from "react";

import { ComponentProps } from "@/types";
import { Button, ButtonProps } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/ui/lib";

export type ProductActionLikeProps = ComponentProps<ButtonProps>;

export function ProductActionLike({ className, ...props }: ProductActionLikeProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleClick: ButtonProps["onClick"] = async () => {
    console.log("ProductActionLike.handleClick");
    setIsLiked((i) => !i);
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
          >
            <Heart className={cn("w-5", isLiked && "fill-primary text-primary")} />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="text-xs">{isLiked ? "Liked" : "Like"}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
