import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/styles";

export type BadgeVariant = "default" | "secondary";

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  default: "border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/80",
  secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
};

export function Badge({
  variant = "default",
  className,
  ...rest
}: ComponentPropsWithoutRef<"div"> & { variant?: BadgeVariant }) {
  return (
    <div
      {...rest}
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        VARIANT_CLASSES[variant],
        className
      )}
    />
  );
}
