import { Link } from "@tanstack/react-router";
import { posts } from "virtual:blog-posts";

import { BlurFade } from "@/components/blur-fade";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export function BlogListView() {
  return (
    <section>
      <title>{`Blog | ${DATA.name}`}</title>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="mb-8 text-2xl font-medium tracking-tighter">blog</h1>
      </BlurFade>
      {posts.map((post, id) => (
        <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
          <Link
            className="mb-4 flex flex-col space-y-1"
            to="/blog/$slug"
            params={{ slug: post.slug }}
          >
            <div className="flex w-full flex-col">
              <p className="tracking-tight">{post.title}</p>
              <p className="h-6 text-xs text-muted-foreground">
                {new Date(post.date).toLocaleString()}
              </p>
            </div>
          </Link>
        </BlurFade>
      ))}
    </section>
  );
}
