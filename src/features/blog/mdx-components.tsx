import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { MDXComponents } from "mdx/types";
import { highlight } from "sugar-high";

import { Gist } from "@/features/blog/gist";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

function createHeading(Tag: HeadingTag) {
  return function Heading({ children }: { children?: ReactNode }) {
    const slug = slugify(String(children ?? ""));
    return (
      <Tag id={slug}>
        <a href={`#${slug}`} className="anchor" aria-label="Permalink" />
        {children}
      </Tag>
    );
  };
}

function CustomLink({ href = "", ...rest }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return <a href={href} {...rest} />;
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" {...rest} />;
}

function Code({ children, ...rest }: ComponentPropsWithoutRef<"code">) {
  if (typeof children !== "string") {
    return <code {...rest}>{children}</code>;
  }
  return <code {...rest} dangerouslySetInnerHTML={{ __html: highlight(children) }} />;
}

function EmbedFrame({ title, src, height }: { title: string; src: string; height: number }) {
  return (
    <div className="relative w-full" style={{ height }}>
      <iframe
        title={title}
        src={src}
        allowFullScreen
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        className="absolute inset-0 size-full border-0"
      />
    </div>
  );
}

function YouTube({ id }: { id: string }) {
  return (
    <EmbedFrame
      title={`youTube-${id}`}
      src={`https://www.youtube.com/embed/${id}?&autoplay=false&start=0`}
      height={400}
    />
  );
}

function Jsfiddle({ id }: { id: string }) {
  return (
    <EmbedFrame
      title={`jsfiddle-${id}`}
      src={`https://jsfiddle.net/${id}/embedded/result`}
      height={500}
    />
  );
}

function Codepen({
  url,
  height = "300px",
  width = "100%",
}: {
  url: string;
  height?: string;
  width?: string;
}) {
  return (
    <div className="relative" style={{ width, height }}>
      <iframe
        title={url}
        src={`${url}?default-tab=result`}
        loading="lazy"
        allowFullScreen
        className="absolute inset-0 size-full border-0"
      />
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  h1: createHeading("h1"),
  h2: createHeading("h2"),
  h3: createHeading("h3"),
  h4: createHeading("h4"),
  h5: createHeading("h5"),
  h6: createHeading("h6"),
  a: CustomLink,
  code: Code,
  YouTube,
  Gist,
  Jsfiddle,
  Codepen,
};
