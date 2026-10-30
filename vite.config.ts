import mdx from "@mdx-js/rollup";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import remarkFrontmatter from "remark-frontmatter";
import { defineConfig, loadEnv } from "vite";

import { blogPosts, readBlogPosts } from "./scripts/vite-plugin-blog-posts.mjs";
import { staticRoutesPrerender } from "./scripts/vite-plugin-static-routes.mjs";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const baseUrl = mode === "development" ? "/" : env.VITE_BASE_URL || "/";
  const contentDir = path.resolve(import.meta.dirname, "./content");

  return {
    base: baseUrl,
    plugins: [
      tailwindcss(),
      tanstackRouter({
        target: "react",
        autoCodeSplitting: true,
      }),
      { enforce: "pre", ...mdx({ remarkPlugins: [remarkFrontmatter] }) },
      blogPosts({ contentDir }),
      react(),
      staticRoutesPrerender({
        routeTreePath: path.resolve(import.meta.dirname, "./src/routeTree.gen.ts"),
        extraRoutes: readBlogPosts(contentDir).map(post => `/blog/${post.slug}`),
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
      },
    },
  };
});
