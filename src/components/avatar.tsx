import { useState } from "react";

import { cn } from "@/utils/styles";

export function Avatar({
  src,
  alt,
  fallback,
  className,
  imageClassName,
}: {
  src?: string;
  alt: string;
  fallback: string;
  className?: string;
  imageClassName?: string;
}) {
  const [failed, setFailed] = useState(!src);

  return (
    <span className={cn("relative flex size-10 shrink-0 overflow-hidden rounded-full", className)}>
      {failed ? (
        <span className="flex size-full items-center justify-center rounded-full bg-muted">
          {fallback}
        </span>
      ) : (
        <img
          src={src}
          alt={alt}
          className={cn("aspect-square size-full", imageClassName)}
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}
