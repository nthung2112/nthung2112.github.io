import fs from "node:fs/promises";
import path from "node:path";

import { extractStaticRoutes } from "./extract-static-routes.mjs";

/**
 * Vite plugin that emits one HTML shell per static route declared in the
 * TanStack Router generated tree.
 *
 * The plugin runs after Vite has written `dist/index.html`, then duplicates
 * that file into `dist/<route>/index.html` for every non-root route. The
 * resulting folder layout is the standard "clean URL" prerender shape that
 * any static host can serve directly. A separate flatten step
 * (`scripts/flatten-static-html.mjs`) can be used to collapse those folders
 * into flat `<route>.html` files when the host prefers that layout.
 *
 * Notes:
 * - Asset URLs in `index.html` are absolute (e.g. `/assets/...`), so the
 *   duplicated HTML files keep working at any depth.
 * - Routes containing dynamic params (`$param`) or splats are skipped unless
 *   their concrete paths are passed through `extraRoutes`.
 *
 * @param {{ routeTreePath: string, outDir?: string, extraRoutes?: string[] }} options
 */
export function staticRoutesPrerender({ routeTreePath, outDir = "dist", extraRoutes = [] } = {}) {
  if (!routeTreePath) {
    throw new Error("staticRoutesPrerender: 'routeTreePath' is required");
  }

  const absRouteTree = path.resolve(routeTreePath);
  let resolvedOutDir = path.resolve(outDir);

  return {
    name: "sre-viewer:static-routes-prerender",
    apply: "build",
    configResolved(config) {
      resolvedOutDir = path.resolve(config.root, config.build?.outDir ?? outDir);
    },
    async closeBundle() {
      const indexHtmlPath = path.join(resolvedOutDir, "index.html");
      let indexHtml;
      try {
        indexHtml = await fs.readFile(indexHtmlPath, "utf8");
      } catch (error) {
        this.warn(
          `[static-routes-prerender] Skipping prerender: '${indexHtmlPath}' was not found ` +
            `(${error instanceof Error ? error.message : String(error)})`
        );
        return;
      }

      const routes = [...extractStaticRoutes(absRouteTree), ...extraRoutes];
      const generated = [];

      for (const route of routes) {
        if (route === "/") {
          continue;
        }
        const segments = route.split("/").filter(Boolean);
        const targetDir = path.join(resolvedOutDir, ...segments);
        const targetFile = path.join(targetDir, "index.html");
        await fs.mkdir(targetDir, { recursive: true });
        await fs.writeFile(targetFile, indexHtml, "utf8");
        generated.push(path.relative(resolvedOutDir, targetFile));
      }

      if (generated.length > 0) {
        this.info(
          `[static-routes-prerender] Generated ${generated.length} route HTML file(s): ${generated.join(", ")}`
        );
      }
    },
  };
}
