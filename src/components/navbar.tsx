import type { ReactNode } from "react";

import { Link } from "@tanstack/react-router";

import { Dock, DockIcon } from "@/components/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/separator";
import { DATA } from "@/data/resume";

const ICON_LINK =
  "inline-flex size-12 items-center justify-center rounded-full text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground";

function Tooltip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="group relative flex">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 rounded-md bg-primary px-3 py-1.5 text-xs whitespace-nowrap text-primary-foreground opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
      >
        {label}
      </span>
    </div>
  );
}

export function Navbar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex h-full max-h-14 origin-bottom">
      <div className="fixed inset-x-0 bottom-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
      <Dock className="pointer-events-auto relative z-50 mx-auto flex h-full min-h-full transform-gpu items-center bg-background px-1 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]">
        {DATA.navbar.map(item => (
          <DockIcon key={item.label}>
            <Tooltip label={item.label}>
              {item.href === "#" ? (
                <a href={item.href} aria-label={item.label} className={ICON_LINK}>
                  <item.icon className="size-4" />
                </a>
              ) : (
                <Link to={item.href} aria-label={item.label} className={ICON_LINK}>
                  <item.icon className="size-4" />
                </Link>
              )}
            </Tooltip>
          </DockIcon>
        ))}
        <Separator orientation="vertical" className="h-full" />
        {Object.entries(DATA.contact.social)
          .filter(([, social]) => social.navbar)
          .map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip label={name}>
                <a href={social.url} aria-label={name} className={ICON_LINK}>
                  <social.icon className="size-4" />
                </a>
              </Tooltip>
            </DockIcon>
          ))}
        <Separator orientation="vertical" className="h-full py-2" />
        <DockIcon>
          <Tooltip label="Theme">
            <ModeToggle className={ICON_LINK} />
          </Tooltip>
        </DockIcon>
      </Dock>
    </div>
  );
}
