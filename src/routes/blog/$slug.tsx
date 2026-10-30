import { createFileRoute, notFound } from "@tanstack/react-router";
import { posts } from "virtual:blog-posts";

import { BlogPostView } from "@/features/blog/blog-post";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = posts.find(candidate => candidate.slug === params.slug);
    if (!post) {
      throw notFound();
    }
    const { default: Content } = await post.load();
    return { post, Content };
  },
  component: BlogPostRoute,
});

function BlogPostRoute() {
  const { post, Content } = Route.useLoaderData();
  return <BlogPostView post={post} Content={Content} />;
}
