import { createFileRoute } from "@tanstack/react-router";

import { HomeView } from "@/features/home";

export const Route = createFileRoute("/")({
  component: HomeView,
});
