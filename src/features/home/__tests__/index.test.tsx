import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { HomeView } from "@/features/home";

it("should render the greeting with the first name", () => {
  render(<HomeView />);
  expect(screen.getByText("Hi, I'm Hung 👋")).toBeInTheDocument();
});

it("should render every work experience entry", () => {
  render(<HomeView />);
  expect(screen.getByText("NAB VN")).toBeInTheDocument();
  expect(screen.getAllByText("KMS Technology")).toHaveLength(2);
});
