import { expect, it } from "vitest";

import { formatDate } from "@/utils/date";

const NOW = new Date("2026-10-29T12:00:00");

it("should say Today for a date less than a day old", () => {
  expect(formatDate("2026-10-29T08:00:00", NOW)).toBe("Today");
});

it("should count days for a date less than a week old", () => {
  expect(formatDate("2026-10-26", NOW)).toBe("October 26, 2026 (3d ago)");
});

it("should count weeks for a date less than a month old", () => {
  expect(formatDate("2026-10-14", NOW)).toBe("October 14, 2026 (2w ago)");
});

it("should count months for a date less than a year old", () => {
  expect(formatDate("2026-07-01", NOW)).toBe("July 1, 2026 (4mo ago)");
});

it("should count years for older dates", () => {
  expect(formatDate("2019-08-05T12:50:00", NOW)).toBe("August 5, 2019 (7y ago)");
});
