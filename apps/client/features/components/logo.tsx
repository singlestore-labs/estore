import { ElementType } from "react";

import { Defined, ComponentProps } from "@/types";
import SingleStoreLogo from "@/public/SingleStoreLogo.svg";
import { cn } from "@/ui/lib";

export type LogoProps = ComponentProps<"span", { variant?: "1"; sourceProps?: ComponentProps<"svg"> }>;

const logoByVariant: Record<Defined<LogoProps["variant"]>, ElementType> = {
  "1": SingleStoreLogo,
};

export function Logo({ variant = "1", sourceProps, ...props }: LogoProps) {
  const _Logo = logoByVariant[variant];

  return (
    <span {...props}>
      <_Logo className={cn("h-full w-full [&_[fill]]:fill-current [&_[stroke]]:stroke-current", sourceProps)} />
    </span>
  );
}
