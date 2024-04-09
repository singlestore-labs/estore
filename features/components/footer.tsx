import Link from "next/link";

import { ComponentProps } from "@/types";
import { cn } from "@/ui/lib";

export type FooterProps = ComponentProps<"footer">;

export function Footer({ className, ...props }: FooterProps) {
  return (
    <footer
      {...props}
      className={cn("flex items-center justify-center p-4", className)}
    >
      <p className={cn("text-sm text-muted-foreground", className)}>
        Built with ❤️ on{" "}
        <Link
          href="https://www.singlestore.com/cloud-trial"
          target="_blank"
          className="underline hover:text-primary"
        >
          SingleStoreDB
        </Link>
      </p>
    </footer>
  );
}
