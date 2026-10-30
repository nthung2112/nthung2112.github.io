import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/styles";

export function Card({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
  return <div {...rest} className={cn("rounded-lg bg-card text-card-foreground", className)} />;
}

export function CardHeader({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
  return <div {...rest} className={cn("flex flex-col", className)} />;
}

export function CardTitle({ className, ...rest }: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3 {...rest} className={cn("text-2xl leading-none font-semibold tracking-tight", className)} />
  );
}

export function CardContent({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...rest}
      className={cn("font-sans text-sm text-pretty text-muted-foreground", className)}
    />
  );
}

export function CardFooter({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
  return <div {...rest} className={cn("flex items-center pt-2", className)} />;
}
