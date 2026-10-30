import type { ReactNode } from "react";

import { Avatar } from "@/components/avatar";
import { Badge } from "@/components/badge";

export function HackathonCard({
  title,
  description,
  dates,
  location,
  image,
  links,
}: {
  title: string;
  description: string;
  dates: string;
  location: string;
  image?: string;
  links?: readonly { icon: ReactNode; title: string; href: string }[];
}) {
  return (
    <li className="relative ml-10 py-4">
      <div className="absolute top-2 -left-16 flex items-center justify-center rounded-full bg-white">
        <Avatar
          src={image}
          alt={title}
          fallback={title[0]}
          className="m-auto size-12 border"
          imageClassName="object-contain"
        />
      </div>
      <div className="flex flex-1 flex-col justify-start gap-1">
        {dates && <time className="text-xs text-muted-foreground">{dates}</time>}
        <h2 className="leading-none font-semibold">{title}</h2>
        {location && <p className="text-sm text-muted-foreground">{location}</p>}
        {description && (
          <span className="prose text-sm text-muted-foreground dark:prose-invert">
            {description}
          </span>
        )}
      </div>
      {links && links.length > 0 && (
        <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
          {links.map(link => (
            <a href={link.href} key={link.href}>
              <Badge title={link.title} className="flex gap-2">
                {link.icon}
                {link.title}
              </Badge>
            </a>
          ))}
        </div>
      )}
    </li>
  );
}
