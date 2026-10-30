import { useState, type MouseEvent } from "react";

import { ChevronRightIcon } from "lucide-react";
import { motion } from "motion/react";

import { Avatar } from "@/components/avatar";
import { Badge } from "@/components/badge";
import { Card, CardHeader } from "@/components/card";
import { cn } from "@/utils/styles";

export function ResumeCard({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
}: {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (description) {
      event.preventDefault();
      setIsExpanded(expanded => !expanded);
    }
  };

  return (
    <a
      href={href || "#"}
      className="block cursor-pointer"
      onClick={handleClick}
      aria-expanded={description ? isExpanded : undefined}
    >
      <Card className="flex">
        <div className="flex-none">
          <Avatar
            src={logoUrl}
            alt={altText}
            fallback={altText[0]}
            className="m-auto size-12 border dark:bg-foreground"
            imageClassName="object-contain"
          />
        </div>
        <div className="group ml-4 grow flex-col items-center">
          <CardHeader>
            <div className="flex items-center justify-between gap-x-2 text-base">
              <h3 className="inline-flex items-center justify-center text-xs leading-none font-semibold sm:text-sm">
                {title}
                {badges && (
                  <span className="inline-flex gap-x-1">
                    {badges.map(badge => (
                      <Badge variant="secondary" className="align-middle text-xs" key={badge}>
                        {badge}
                      </Badge>
                    ))}
                  </span>
                )}
                <ChevronRightIcon
                  className={cn(
                    "size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100",
                    isExpanded ? "rotate-90" : "rotate-0"
                  )}
                />
              </h3>
              <div className="text-right text-xs text-muted-foreground tabular-nums sm:text-sm">
                {period}
              </div>
            </div>
            {subtitle && <div className="font-sans text-xs">{subtitle}</div>}
          </CardHeader>
          {description && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: isExpanded ? 1 : 0, height: isExpanded ? "auto" : 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2 text-xs sm:text-sm"
            >
              {description}
            </motion.div>
          )}
        </div>
      </Card>
    </a>
  );
}
