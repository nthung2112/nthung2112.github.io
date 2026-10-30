import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

import { Navbar } from "@/components/navbar";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent configured on root route</p>
        <Link to="/">Start Over</Link>
      </div>
    );
  },
});

function RootComponent() {
  return (
    <div className="mx-auto min-h-screen max-w-2xl px-6 py-12 sm:py-24">
      <Outlet />
      <Navbar />
    </div>
  );
}
