import type { ReactNode } from "react";

import { Badge } from "@/components/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/card";

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  image,
  video,
  links,
}: {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  image?: string;
  video?: string;
  links?: readonly { icon: ReactNode; type: string; href: string }[];
}) {
  return (
    <Card className="flex h-full flex-col overflow-hidden border transition-all duration-300 ease-out hover:shadow-lg">
      <a href={href || "#"} className="block cursor-pointer">
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none mx-auto h-40 w-full object-cover object-top"
          />
        )}
        {image && (
          <img
            src={image}
            alt={title}
            className="h-40 w-full overflow-hidden object-cover object-top"
          />
        )}
      </a>
      <CardHeader className="px-2">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base">{title}</CardTitle>
          <time className="font-sans text-xs">{dates}</time>
          <div className="prose max-w-full font-sans text-xs text-pretty text-muted-foreground dark:prose-invert">
            {description}
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-2">
        {tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.map(tag => (
              <Badge className="px-1 py-0 text-[10px]" variant="secondary" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-2 pb-2">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links.map(link => (
              <a href={link.href} key={link.href} target="_blank" rel="noopener noreferrer">
                <Badge className="flex gap-2 px-2 py-1 text-[10px]">
                  {link.icon}
                  {link.type}
                </Badge>
              </a>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
