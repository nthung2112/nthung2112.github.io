import { expect, it } from "vitest";

import { cn } from "@/utils/styles";

it("should join class names", () => {
  expect(cn("px-2", "py-1")).toBe("px-2 py-1");
});

it("should drop falsy values", () => {
  expect(cn("px-2", false, null, undefined, "py-1")).toBe("px-2 py-1");
});

it("should keep the later Tailwind class when utilities conflict", () => {
  expect(cn("px-2", "px-4")).toBe("px-4");
});
