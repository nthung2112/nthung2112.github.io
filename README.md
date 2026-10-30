# nthung2112.github.io

Personal site and blog of Hung Nguyen. React SPA built with Vite, TanStack Router, Tailwind CSS v4, and MDX content. Deployed to GitHub Pages on every push to `main`.

Live site: [nthung2112.github.io](https://nthung2112.github.io)

## Stack

- React 19 + TypeScript
- Vite 8 (bundler and dev server)
- TanStack Router (file-based routes in `src/routes`, generated tree in `src/routeTree.gen.ts`)
- Tailwind CSS v4 via `@tailwindcss/vite`
- MDX for blog posts, rendered with `@mdx-js/rollup`
- Bun for install, scripts, and CI
- Vitest + React Testing Library for tests
- oxlint and oxfmt for lint and format

## Prerequisites

- Bun 1.4.4 or newer

## Commands

```bash
bun install        # install dependencies
bun run dev        # start dev server
bun run build      # type-check, build, prerender static routes
bun run preview    # serve the production build
bun run test       # run the test suite
bun run check-types # type-check without emitting
bun run lint       # lint src
bun run format     # format src
```

## Project layout

```
content/           blog posts as .mdx, grouped in YYYY-MM folders
public/            static assets copied verbatim into the build
scripts/           Vite plugins for blog posts and static route prerendering
src/components/    shared UI components
src/features/      feature modules (home, blog)
src/routes/        TanStack Router route files
src/utils/         helpers (date, styles)
```

## Writing a blog post

Create an `.mdx` file under `content/<YYYY-MM>/`. The file name is the URL slug.

```mdx
---
title: 'Post title'
author: Hung Tan Nguyen
tags: [react, typescript]
categories: []
coverImage: 'https://example.com/cover.png'
sourceUrl: 'https://example.com/original-post'
date: '2024-05-01T10:00:00.000Z'
---

Body content here.
```

`title` must be a string and `date` must be a valid date, otherwise the build fails. Slugs must be unique across all posts.

## Build and static routes

`bun run build` runs `tsc -b && vite build`, then `scripts/vite-plugin-static-routes.mjs` writes one HTML shell per static route into `dist/<route>/index.html`. This gives clean URLs (`/blog`, `/blog/<slug>`) that work on any static host without server-side rewrites.

The post list lives in the virtual module `virtual:blog-posts`, provided by `scripts/vite-plugin-blog-posts.mjs`. It is read when the module first loads, so the dev server needs a restart after adding or renaming an `.mdx` file.

## Deployment

`.github/workflows/static.yml` builds with Bun on every push to `main` and publishes `dist/` to GitHub Pages.

The workflow uses `bun install --frozen-lockfile`, so `bun.lock` must be committed and in sync with `package.json`.

## Configuration

`VITE_BASE_URL` sets the site base path for production builds. Defaults to `/`. Local overrides live in `.env.local`, which is not committed.

## License

MIT
