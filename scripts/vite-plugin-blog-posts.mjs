import fs from "node:fs";
import path from "node:path";

import { parse } from "yaml";

const VIRTUAL_ID = "virtual:blog-posts";
const RESOLVED_ID = `\0${VIRTUAL_ID}`;
const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---/;

/**
 * Reads every `.mdx` file under `contentDir` and returns its frontmatter
 * metadata, newest first. The file name (without extension) is the slug.
 *
 * Throws when a post lacks a string `title` or a parseable `date`, or when two
 * files share the same slug, so broken content fails the build instead of
 * rendering an empty page.
 *
 * @param {string} contentDir - absolute path to the content folder
 * @returns {{ slug: string, title: string, date: string, filePath: string }[]}
 */
export function readBlogPosts(contentDir) {
  const posts = fs
    .readdirSync(contentDir, { recursive: true })
    .filter(file => file.endsWith(".mdx"))
    .map(file => {
      const filePath = path.join(contentDir, file);
      const match = fs.readFileSync(filePath, "utf8").match(FRONTMATTER);
      const data = match ? parse(match[1], { schema: "yaml-1.1" }) : null;
      const date = new Date(data?.date);
      if (typeof data?.title !== "string" || Number.isNaN(date.getTime())) {
        throw new Error(
          `Blog post '${filePath}' needs a string 'title' and a valid 'date' in its frontmatter`
        );
      }
      return {
        slug: path.basename(file, ".mdx"),
        title: data.title,
        date: date.toISOString(),
        filePath,
      };
    });

  const seen = new Set();
  for (const { slug, filePath } of posts) {
    if (seen.has(slug)) {
      throw new Error(`Duplicate blog slug '${slug}' (${filePath})`);
    }
    seen.add(slug);
  }

  return posts.toSorted((a, b) => b.date.localeCompare(a.date));
}

/**
 * Vite plugin exposing `virtual:blog-posts`: the post metadata list plus a
 * lazy `load()` per post, so the blog index never pulls MDX bodies into its
 * chunk.
 *
 * ponytail: the post list is read when the virtual module first loads; adding
 * or renaming an `.mdx` file needs a dev-server restart.
 *
 * @param {{ contentDir: string }} options
 */
export function blogPosts({ contentDir }) {
  return {
    name: "nab-profile:blog-posts",
    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : null;
    },
    load(id) {
      if (id !== RESOLVED_ID) {
        return null;
      }
      const entries = readBlogPosts(contentDir).map(({ slug, title, date, filePath }) => {
        this.addWatchFile(filePath);
        const [slugJson, titleJson, dateJson, fileJson] = [slug, title, date, filePath].map(
          value => JSON.stringify(value)
        );
        return `{ slug: ${slugJson}, title: ${titleJson}, date: ${dateJson}, load: () => import(${fileJson}) }`;
      });
      return `export const posts = [\n${entries.join(",\n")}\n];\n`;
    },
  };
}
