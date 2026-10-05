import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Heart, MapPinned, MessageCircle, CircleUser, HeartPulse } from "lucide-react";

const tabs = [
  { to: "/", label: "match", Icon: Heart },
  { to: "/mapa", label: "mapa", Icon: MapPinned },
  { to: "/saude", label: "saúde", Icon: HeartPulse },
  { to: "/chat", label: "chat", Icon: MessageCircle },
  { to: "/perfil", label: "perfil", Icon: CircleUser },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink text-cream">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 size-[420px] -translate-x-1/2 rounded-full bg-glow/10 blur-3xl" />
        <div className="absolute bottom-0 -right-20 size-[300px] rounded-full bg-sage/10 blur-3xl" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-[430px] sm:max-w-xl md:max-w-2xl lg:max-w-4xl pb-24 sm:px-6 md:pt-4 md:pb-32">{children}</div>
      <nav className="fixed inset-x-0 bottom-0 z-30">
        <div className="mx-auto flex w-full max-w-[430px] sm:max-w-xl md:max-w-2xl lg:max-w-4xl items-center justify-around bg-ink/95 px-4 pt-3 pb-[calc(1.25rem+env(safe-area-inset-bottom))] ring-1 ring-line backdrop-blur md:mb-4 md:rounded-full md:pb-3">
          {tabs.map(({ to, label, Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="flex flex-col items-center gap-1 text-cream-dim transition-colors"
              activeProps={{ className: "!text-glow" }}
            >
              <Icon className="size-[18px]" strokeWidth={2} />
              <span className="font-mono text-[9px] tracking-wide">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

export function AppHeader({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle: string;
  right?: ReactNode;
}) {
  return (
    <header className="flex items-start justify-between px-5 pt-6">
      <div className="leading-none">
        <h1 className="font-display text-[26px] sm:text-[30px] tracking-tight text-cream">{title}</h1>
        <p className="mt-1.5 font-mono text-[9px] tracking-[0.25em] text-cream-dim uppercase">
          {subtitle}
        </p>
      </div>
      {right}
    </header>
  );
}
