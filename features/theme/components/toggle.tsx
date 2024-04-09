"use client";

import {
  DropdownMenuContentProps,
  DropdownMenuProps,
  DropdownMenuTriggerProps,
} from "@radix-ui/react-dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { ComponentProps } from "@/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type ThemeToggleProps = ComponentProps<
  DropdownMenuProps,
  { triggerProps?: DropdownMenuTriggerProps; contentProps?: DropdownMenuContentProps }
>;

export function ThemeToggle({ triggerProps, contentProps, ...props }: ThemeToggleProps) {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger
        {...triggerProps}
        asChild
      >
        <Button
          variant="outline"
          size="icon"
        >
          <Sun className="h-5 w-5 dark:hidden" />
          <Moon className="hidden h-5 w-5 dark:block" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        {...contentProps}
        align="end"
      >
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
