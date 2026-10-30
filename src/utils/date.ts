const DAY_MS = 1000 * 60 * 60 * 24;

export function formatDate(date: string, now = new Date()) {
  const target = new Date(date.includes("T") ? date : `${date}T00:00:00`);
  const daysAgo = Math.floor(Math.abs(now.getTime() - target.getTime()) / DAY_MS);
  const fullDate = target.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (daysAgo < 1) {
    return "Today";
  }
  if (daysAgo < 7) {
    return `${fullDate} (${daysAgo}d ago)`;
  }
  if (daysAgo < 30) {
    return `${fullDate} (${Math.floor(daysAgo / 7)}w ago)`;
  }
  if (daysAgo < 365) {
    return `${fullDate} (${Math.floor(daysAgo / 30)}mo ago)`;
  }
  return `${fullDate} (${Math.floor(daysAgo / 365)}y ago)`;
}
