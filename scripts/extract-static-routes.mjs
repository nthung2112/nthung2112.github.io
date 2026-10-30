import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Parses TanStack Router's generated route tree and returns the flat list of
 * routes that can be safely prerendered as static HTML.
 *
 * Routes containing dynamic params (`$param`) or splats (`$$`) are excluded
 * because they cannot be enumerated at build time without an explicit list.
 *
 * @param {string} routeTreePath - absolute path to `routeTree.gen.ts`
 * @returns {string[]} sorted, deduplicated route paths (e.g. `['/', '/playground', '/settings']`)
 */
export function extractStaticRoutes(routeTreePath) {
  const source = fs.readFileSync(routeTreePath, "utf8");
  // TanStack Router emits `fullPaths` as a string-literal union that may span
  // multiple lines with leading `|` separators, e.g.
  //   fullPaths:
  //     | '/'
  //     | '/playground'
  // Capture every quoted member regardless of single- vs multi-line layout by
  // consuming the contiguous run of `'...'` literals (with optional `|`/space).
  const match = source.match(/fullPaths:\s*((?:\|?\s*'[^']*'\s*)+)/);
  if (!match) {
    throw new Error(
      `Could not find 'fullPaths' union in ${routeTreePath}. ` +
        "Ensure TanStack Router has generated the route tree (run 'yarn dev' or 'yarn build' first)."
    );
  }
  const union = match[1];
  const routes = Array.from(union.matchAll(/'([^']+)'/g)).map(m => m[1]);
  const filtered = routes.filter(route => !route.includes("$"));
  return Array.from(new Set(filtered)).sort();
}

const isCli = (() => {
  if (!process.argv[1]) {
    return false;
  }
  const invoked = path.resolve(process.argv[1]);
  const self = fileURLToPath(import.meta.url);
  return invoked === self;
})();

if (isCli) {
  const routeTreePath = path.resolve(process.argv[2] ?? "src/routeTree.gen.ts");
  for (const route of extractStaticRoutes(routeTreePath)) {
    console.log(route);
  }
}
