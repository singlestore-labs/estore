"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ComponentProps } from "@/types";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/ui/lib";

export type NavigationProps = ComponentProps<"div">;

export function Navigation({ className, ...props }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav
      {...props}
      className={cn("flex items-center gap-1", className)}
    >
      {[
        ["Chat", ROUTES.ROOT],
        ["Dashboard", ROUTES.DASHBOARD],
        ["Analytics", ROUTES.ANALYTICS],
      ].map(([label, href]) => (
        <Button
          key={label}
          variant={pathname === href ? "default" : "ghost"}
          className="text-base"
          asChild
        >
          <Link href={href}>{label}</Link>
        </Button>
      ))}
    </nav>
  );
}
