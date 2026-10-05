import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AppShell, AppHeader } from "@/components/AppShell";
import { lembretes as lembretesBase, type Lembrete } from "@/lib/pets";
import { getReminders, toggleReminder } from "@/lib/server-data";
import { BadgeCheck, Bell, CalendarPlus, Syringe, Pill, Bug, Stethoscope } from "lucide-react";

export const Route = createFileRoute("/saude")({
  head: () => ({
    meta: [
      { title: "Cartão de vacina e prontuário digital — PetMatch & Play" },
      {
        name: "description",
        content:
          "Gestão gratuita do pet: lembretes de vacina, vermífugo e antipulgas, além do cartão de vacinação digital.",
      },
      { property: "og:title", content: "Cartão de vacina e prontuário digital" },
      {
        property: "og:description",
        content: "Lembretes de vacinas, vermífugo e antipulgas sempre à mão.",
      },
    ],
  }),
  component: SaudePage,
});

const icones = {
  Vacina: Syringe,
  Vermífugo: Pill,
  Antipulgas: Bug,
  Consulta: Stethoscope,
} as const;

function SaudePage() {
  const remindersQuery = useQuery({ queryKey: ["lembretes"], queryFn: () => getReminders() });
  const [itens, setItens] = useState<Lembrete[]>(lembretesBase);
  const [novo, setNovo] = useState("");
  const toggleMutation = useMutation({ mutationFn: (value: { id: string; feito: boolean }) => toggleReminder({ data: value }) });
  useEffect(() => {
    if (remindersQuery.data?.source === "d1") setItens(remindersQuery.data.data);
  }, [remindersQuery.data]);

  const proximos = useMemo(
    () => itens.filter((l) => !l.feito).sort((a, b) => a.emDias - b.emDias),
    [itens],
  );
  const concluidos = itens.filter((l) => l.feito);

  const alternar = (id: string) => {
    setItens((l) => {
      const atual = l.find((i) => i.id === id);
      if (!atual) return l;
      const feito = !atual.feito;
      void toggleMutation.mutateAsync({ id, feito }).catch(() => undefined);
      return l.map((i) => (i.id === id ? { ...i, feito } : i));
    });
  };

  const adicionar = () => {
    const t = novo.trim().slice(0, 60);
    if (!t) return;
    setItens((l) => [
      ...l,
      {
        id: `n${l.length + 1}`,
        titulo: t,
        tipo: "Consulta",
        data: "a definir",
        emDias: 999,
        feito: false,
      },
    ]);
    setNovo("");
  };

  return (
    <AppShell>
      <AppHeader title="SAÚDE DO PET" subtitle="prontuário digital" />

      <section className="mt-4 px-5">
        <div className="rounded-3xl bg-gradient-to-br from-sage/20 to-panel p-4 ring-1 ring-sage/30">
          <div className="flex items-center gap-2">
            <BadgeCheck className="size-4 text-sage" />
            <p className="text-[13px] font-semibold">Selo Pet Limpo &amp; Seguro</p>
          </div>
          <p className="mt-1.5 text-[11px] leading-relaxed text-cream-dim">
            Carteira de vacinação verificada em 12/08. Válida até 12/08 do próximo ano — seu perfil
            exibe o selo de vacinação verificada.
          </p>
          <div className="mt-3 grid grid-cols-1 gap-2 text-center sm:grid-cols-3">
            {[
              ["V10", "em dia"],
              ["Antirrábica", "em dia"],
              ["Giárdia", "pendente"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl bg-panel-2 px-2 py-2.5 ring-1 ring-line">
                <p className="text-[11px] font-medium text-cream">{k}</p>
                <p className="font-mono text-[9px] text-cream-dim uppercase">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-4 px-5">
        <p className="font-mono text-[10px] tracking-[0.2em] text-cream-dim uppercase">
          Próximos lembretes
        </p>
        <div className="mt-2 space-y-2">
          {proximos.map((l) => {
            const Icone = icones[l.tipo];
            const atrasado = l.emDias < 0;
            return (
              <button
                key={l.id}
                onClick={() => alternar(l.id)}
                className="flex w-full items-center gap-3 rounded-2xl bg-panel px-4 py-3 text-left ring-1 ring-line"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-panel-2 ring-1 ring-line">
                  <Icone className="size-4 text-glow" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-medium text-cream">
                    {l.titulo}
                  </span>
                  <span className="block font-mono text-[10px] text-cream-dim">
                    {l.tipo} · {l.data}
                  </span>
                </span>
                <span
                  className={
                    atrasado
                      ? "rounded-full bg-rose/20 px-2.5 py-1 font-mono text-[10px] text-rose"
                      : "rounded-full bg-panel-2 px-2.5 py-1 font-mono text-[10px] text-cream-dim"
                  }
                >
                  {l.emDias === 999
                    ? "sem data"
                    : atrasado
                      ? `${Math.abs(l.emDias)}d atrás`
                      : `em ${l.emDias}d`}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-4 px-5">
        <div className="flex items-center gap-2">
          <input
            value={novo}
            maxLength={60}
            onChange={(e) => setNovo(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && adicionar()}
            placeholder="Novo lembrete (ex.: vermífugo)"
            className="flex-1 rounded-full bg-panel px-4 py-3 text-[13px] text-cream ring-1 ring-line outline-none placeholder:text-cream-dim focus:ring-glow/50"
          />
          <button
            onClick={adicionar}
            aria-label="Adicionar lembrete"
            className="grid size-11 shrink-0 place-items-center rounded-full bg-glow text-ink"
          >
            <CalendarPlus className="size-4" />
          </button>
        </div>
      </section>

      {concluidos.length > 0 && (
        <section className="mt-4 px-5">
          <p className="font-mono text-[10px] tracking-[0.2em] text-cream-dim uppercase">
            Concluídos
          </p>
          <div className="mt-2 space-y-2">
            {concluidos.map((l) => (
              <button
                key={l.id}
                onClick={() => alternar(l.id)}
                className="flex w-full items-center justify-between rounded-2xl bg-panel-2/60 px-4 py-3 text-left ring-1 ring-line"
              >
                <span className="text-[12px] text-cream-dim line-through">{l.titulo}</span>
                <span className="font-mono text-[10px] text-sage">feito</span>
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="mt-4 px-5">
        <div className="flex items-start gap-2.5 rounded-2xl bg-panel px-4 py-3 ring-1 ring-line">
          <Bell className="mt-0.5 size-4 shrink-0 text-glow" />
          <p className="text-[11px] leading-relaxed text-cream-dim">
            Avisamos você com 3 dias de antecedência de cada dose. Ferramenta gratuita, sem
            assinatura.
          </p>
        </div>
      </section>
      <div className="mx-5 mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Link to="/mapa" className="rounded-2xl bg-panel p-3 text-center text-[12px] text-cream ring-1 ring-line">
          🩺 Achar veterinário
        </Link>
        <Link to="/perfil" className="rounded-2xl bg-panel p-3 text-center text-[12px] text-cream ring-1 ring-line">
          🏅 Ver selo e medalhas
        </Link>
      </div>
    </AppShell>
  );
}
