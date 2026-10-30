export function Separator({
  orientation,
  className,
}: {
  orientation: "horizontal" | "vertical";
  className?: string;
}) {
  return (
    <div
      role="separator"
      className={`${orientation === "horizontal" ? "h-px w-full" : "h-full w-px"} shrink-0 bg-border ${className ?? ""}`}
    />
  );
}
