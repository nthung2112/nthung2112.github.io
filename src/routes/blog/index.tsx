import { createFileRoute } from "@tanstack/react-router";

import { BlogListView } from "@/features/blog/blog-list";

export const Route = createFileRoute("/blog/")({
  component: BlogListView,
});
