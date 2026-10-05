import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppShell, AppHeader } from "@/components/AppShell";
import { petPoints as petPointsBase } from "@/lib/pets";
import { getPetPoints } from "@/lib/server-data";
import mapaDark from "@/assets/map-dark.jpg";
import { MapPin, Users } from "lucide-react";

export const Route = createFileRoute("/mapa")({
  head: () => ({
    meta: [
      { title: "Pet Points — locais dog friendly perto de você" },
      {
        name: "description",
        content:
          "Mapa com parques, cafés e clínicas dog friendly, com check-in de tutores em tempo real para encontros espontâneos.",
      },
      { property: "og:title", content: "Pet Points — locais dog friendly perto de você" },
      {
        property: "og:description",
        content: "Veja quem fez check-in agora e combine um passeio espontâneo.",
      },
    ],
  }),
  component: MapaPage,
});

function MapaPage() {
  const pointsQuery = useQuery({ queryKey: ["pet-points"], queryFn: () => getPetPoints() });
  const petPoints = pointsQuery.data?.data ?? petPointsBase;
  const [ativo, setAtivo] = useState(petPoints[0]?.id ?? "p1");
  const [checkin, setCheckin] = useState<string | null>(null);
  const ponto = petPoints.find((p) => p.id === ativo) ?? petPoints[0]!;

  return (
    <AppShell>
      <AppHeader title="PET POINTS" subtitle="locais dog friendly" />

      <div className="mt-4 px-5">
        <div className="relative overflow-hidden rounded-[28px] ring-1 ring-line">
          <img
            src={mapaDark}
            alt="Mapa da região com locais dog friendly"
            width={1024}
            height={1280}
            loading="lazy"
            className="h-[320px] w-full object-cover sm:h-[380px] md:h-[420px] lg:h-[460px]"
          />
          <div className="absolute inset-0 bg-ink/30" />
          {petPoints.map((p) => (
            <button
              key={p.id}
              onClick={() => setAtivo(p.id)}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              aria-label={p.nome}
            >
              <span className="relative grid place-items-center">
                {p.checkins > 0 && (
                  <span className="animate-ring-pulse absolute size-6 rounded-full bg-glow/40" />
                )}
                <span
                  className={
                    ativo === p.id
                      ? "relative grid size-8 place-items-center rounded-full bg-glow text-ink ring-2 ring-cream/30"
                      : "relative grid size-7 place-items-center rounded-full bg-panel text-cream ring-1 ring-line"
                  }
                >
                  <MapPin className="size-3.5" />
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <section className="mt-4 px-5">
        <div className="animate-fade-up rounded-3xl bg-panel p-4 ring-1 ring-line">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-[22px] sm:text-[26px] leading-none tracking-tight">{ponto.nome}</h2>
              <p className="mt-1.5 text-[12px] text-cream-dim">
                {ponto.tipo} · {ponto.distancia}
              </p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-panel-2 px-2.5 py-1 ring-1 ring-line">
              <Users className="size-3 text-glow" />
              <span className="font-mono text-[10px]">{ponto.checkins}</span>
            </span>
          </div>
          <button
            onClick={() => setCheckin(checkin === ponto.id ? null : ponto.id)}
            className={
              checkin === ponto.id
                ? "mt-4 w-full rounded-full bg-sage/20 py-3 text-[13px] font-semibold text-sage ring-1 ring-sage/40"
                : "mt-4 w-full rounded-full bg-glow py-3 text-[13px] font-semibold text-ink"
            }
          >
            {checkin === ponto.id ? "Check-in ativo · estou aqui" : "Fazer check-in agora"}
          </button>
          <Link
            to="/chat"
            className="mt-2 block w-full rounded-full bg-panel-2 py-3 text-center text-[13px] font-semibold text-cream ring-1 ring-line"
          >
            Convidar um match para cá
          </Link>
        </div>
      </section>

      <section className="mt-4 space-y-2 px-5">
        <p className="font-mono text-[10px] tracking-[0.2em] text-cream-dim uppercase">
          Perto de você
        </p>
        {petPoints.map((p) => (
          <button
            key={p.id}
            onClick={() => setAtivo(p.id)}
            className="flex w-full items-center justify-between rounded-2xl bg-panel-2 px-4 py-3 text-left ring-1 ring-line"
          >
            <span>
              <span className="block text-[13px] font-medium text-cream">{p.nome}</span>
              <span className="block text-[11px] text-cream-dim">{p.tipo}</span>
            </span>
            <span className="font-mono text-[10px] text-cream-dim">{p.distancia}</span>
          </button>
        ))}
      </section>
    </AppShell>
  );
}
