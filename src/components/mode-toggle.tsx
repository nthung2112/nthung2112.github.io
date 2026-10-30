import { MoonIcon, SunIcon } from "lucide-react";

import { cn } from "@/utils/styles";

export function ModeToggle({ className }: { className?: string }) {
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <button type="button" aria-label="Toggle theme" onClick={toggleTheme} className={cn(className)}>
      <SunIcon className="size-[1.2rem] text-neutral-800 dark:hidden dark:text-neutral-200" />
      <MoonIcon className="hidden size-[1.2rem] text-neutral-800 dark:block dark:text-neutral-200" />
    </button>
  );
}
