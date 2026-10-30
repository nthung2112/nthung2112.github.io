/// <reference types="vite/client" />

declare module "virtual:blog-posts" {
  import type { MDXContent } from "mdx/types";

  export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    load: () => Promise<{ default: MDXContent }>;
  }

  export const posts: readonly BlogPost[];
}
