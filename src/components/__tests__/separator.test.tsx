import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Separator } from "@/components/separator";

it("should span the full width when orientation is horizontal", () => {
  render(<Separator orientation="horizontal" />);
  expect(screen.getByRole("separator")).toHaveClass("h-px", "w-full");
});

it("should span the full height when orientation is vertical", () => {
  render(<Separator orientation="vertical" />);
  expect(screen.getByRole("separator")).toHaveClass("h-full", "w-px");
});

it("should apply className", () => {
  render(<Separator orientation="horizontal" className="my-4" />);
  expect(screen.getByRole("separator")).toHaveClass("my-4");
});
