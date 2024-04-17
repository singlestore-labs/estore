import { SelectProps as _SelectProps } from "@radix-ui/react-select";
import { ReactNode } from "react";

import { ComponentProps } from "@/types";
import {
  Select as _Select,
  SelectContent,
  SelectContentProps,
  SelectItem,
  SelectItemProps,
  SelectTrigger,
  SelectTriggerProps,
  SelectValue,
} from "@/components/ui/select";

export type SelectOption = { label: ReactNode; value: string };

export type SelectProps = ComponentProps<
  _SelectProps & {
    triggerProps?: SelectTriggerProps;
    contentProps?: SelectContentProps;
    itemProps?: SelectItemProps;
    value?: _SelectProps["defaultValue"];
    options?: SelectOption[];
    placeholder?: string;
    onChange?: _SelectProps["onValueChange"];
  }
>;

export function Select({
  triggerProps,
  contentProps,
  itemProps,
  options = [],
  value,
  placeholder = "Select",
  onChange,
  ...props
}: SelectProps) {
  return (
    <_Select
      {...props}
      value={value}
      onValueChange={onChange}
    >
      <SelectTrigger {...triggerProps}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent {...contentProps}>
        {options.map(({ label, value }) => (
          <SelectItem
            {...itemProps}
            key={value}
            value={value}
          >
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </_Select>
  );
}
