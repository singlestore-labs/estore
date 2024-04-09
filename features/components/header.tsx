import Link from "next/link";

import { ComponentProps } from "@/types";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardProps } from "@/components/ui/card";
import { ThemeToggle } from "@/theme/components/toggle";
import { cn } from "@/ui/lib";

export type HeaderProps = ComponentProps<CardProps>;

export function Header({ className, ...props }: HeaderProps) {
  return (
    <Card
      {...props}
      as="header"
      className={cn("flex flex-wrap items-center justify-between gap-4 p-4 pl-5", className)}
    >
      <div className="flex items-center gap-2">
        <Logo className="w-40 flex-shrink-0" />
        <h1 className="inline-flex flex-wrap items-center gap-1 pt-0.5 text-xl">
          <span className="text-sm">|</span>
          <span>GenUI RAG</span>
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        <Button asChild>
          <Link
            href="https://www.singlestore.com/cloud-trial/"
            target="_blank"
          >
            Try SingleStore for Free
          </Link>
        </Button>
      </div>
    </Card>
  );
}
