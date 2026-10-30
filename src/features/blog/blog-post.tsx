import type { MDXContent } from "mdx/types";
import type { BlogPost } from "virtual:blog-posts";

import { DATA } from "@/data/resume";
import { mdxComponents } from "@/features/blog/mdx-components";
import { formatDate } from "@/utils/date";

export function BlogPostView({ post, Content }: { post: BlogPost; Content: MDXContent }) {
  return (
    <section id="blog">
      <title>{`${post.title} | ${DATA.name}`}</title>
      <h1 className="title max-w-[650px] text-2xl font-medium tracking-tighter">{post.title}</h1>
      <div className="mt-2 mb-8 flex max-w-[650px] items-center justify-between text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{formatDate(post.date)}</p>
      </div>
      <article className="prose mt-8 max-w-none prose-neutral dark:prose-invert">
        <Content components={mdxComponents} />
      </article>
    </section>
  );
}
