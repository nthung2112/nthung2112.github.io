import { createRouter, RouterProvider } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";

import "./global.css";
import { routeTree } from "./routeTree.gen";

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultStaleTime: 5000,
  scrollRestoration: true,
  basepath: import.meta.env.MODE === "development" ? "/" : import.meta.env.VITE_BASE_URL || "/",
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(<RouterProvider router={router}></RouterProvider>);
