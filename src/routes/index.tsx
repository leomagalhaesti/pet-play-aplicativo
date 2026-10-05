import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/AppShell";
import { PetCard } from "@/components/PetCard";
import { pets as petsBase, conversas, compatibilidade, meuPet, type Modo, type Estilo } from "@/lib/pets";
import { getPets } from "@/lib/server-data";
import { Heart, RotateCcw, Star, SlidersHorizontal } from "lucide-react";

const estilos: Estilo[] = [
  "Corre com bolinha",
  "Brinca forte",
  "Explorador tranquilo",
  "Calmo/Idoso",
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PetMatch & Play — encontros seguros entre pets" },
      {
        name: "description",
        content:
          "Encontre companhia para passeios e cruzamento responsável com selo de saúde verificada, mapa de pet points e chat seguro.",
      },
      { property: "og:title", content: "PetMatch & Play — encontros seguros entre pets" },
      {
        property: "og:description",
        content:
          "Dog dates, socialização e cruzamento responsável com verificação de vacinas e chat seguro.",
      },
    ],
  }),
  component: MatchPage,
});

function MatchPage() {
  const petsQuery = useQuery({ queryKey: ["pets"], queryFn: () => getPets() });
  const pets = petsQuery.data?.data ?? petsBase;
  const [modo, setModo] = useState<Modo>("social");
  const [indice, setIndice] = useState(0);
  const [curtidas, setCurtidas] = useState<string[]>([]);

  const [soCompativeis, setSoCompativeis] = useState(true);
  const [estilo, setEstilo] = useState<Estilo | null>(null);

  const lista = useMemo(() => {
    const base = pets
      .filter((p) => p.modos.includes(modo))
      .filter((p) => (estilo ? p.estilo === estilo : true))
      .filter((p) => (soCompativeis ? compatibilidade(p) >= 70 : true));
    return base.sort((a, b) => compatibilidade(b) - compatibilidade(a));
  }, [pets, modo, estilo, soCompativeis]);

  const pet = lista.length ? lista[indice % lista.length] : undefined;

  const [ultimoMatch, setUltimoMatch] = useState<(typeof pets)[number] | null>(null);
  const conversaDoMatch = ultimoMatch
    ? conversas.find((c) => c.petId === ultimoMatch.id)
    : undefined;

  const avancar = (curtiu: boolean) => {
    if (curtiu && pet) {
      setCurtidas((c) => [...new Set([...c, pet.id])]);
      setUltimoMatch(pet);
    }
    setIndice((i) => i + 1);
  };

  return (
    <AppShell>
      <div className="flex items-start justify-between px-5 pt-6">
        <div className="leading-none">
          <p className="font-display text-[26px] tracking-tight text-cream">
            PET<span className="text-glow">&</span>PLAY
          </p>
          <p className="mt-1.5 font-mono text-[9px] tracking-[0.25em] text-cream-dim">
            PETMATCH · SOCIAL
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-panel-2 px-2.5 py-1 ring-1 ring-line">
            <span className="size-1.5 rounded-full bg-glow" />
            <span className="font-mono text-[10px] text-cream">{curtidas.length}</span>
          </div>
          <Link
            to="/perfil"
            className="grid size-9 place-items-center rounded-full bg-panel ring-1 ring-line"
          >
            <span className="font-mono text-[10px] text-cream-dim">EU</span>
          </Link>
        </div>
      </div>

      <div className="px-5 pt-4">
        <div className="flex rounded-full bg-panel p-1 text-[13px] font-medium ring-1 ring-line">
          {(
            [
              ["social", "Socialização"],
              ["reproducao", "Reprodução"],
            ] as const
          ).map(([valor, label]) => (
            <button
              key={valor}
              onClick={() => {
                setModo(valor);
                setIndice(0);
              }}
              className={
                modo === valor
                  ? "flex-1 rounded-full bg-cream py-2 text-center text-ink transition"
                  : "flex-1 rounded-full py-2 text-center text-cream-dim transition"
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto px-5 pb-1 text-[11px]">
        <button
          onClick={() => {
            setSoCompativeis((v) => !v);
            setIndice(0);
          }}
          className={
            soCompativeis
              ? "flex shrink-0 items-center gap-1.5 rounded-full bg-glow px-3 py-1 font-medium text-ink"
              : "flex shrink-0 items-center gap-1.5 rounded-full bg-panel-2 px-3 py-1 text-cream ring-1 ring-line"
          }
        >
          <SlidersHorizontal className="size-3" /> Só compatíveis
        </button>
        {estilos.map((e) => (
          <button
            key={e}
            onClick={() => {
              setEstilo((atual) => (atual === e ? null : e));
              setIndice(0);
            }}
            className={
              estilo === e
                ? "shrink-0 rounded-full bg-cream px-3 py-1 font-medium text-ink"
                : "shrink-0 rounded-full bg-panel-2 px-3 py-1 text-cream-dim ring-1 ring-line"
            }
          >
            {e}
          </button>
        ))}
      </div>

      <p className="mt-2 px-5 font-mono text-[10px] text-cream-dim">
        Base: {meuPet.nome} · energia {meuPet.energia} · {meuPet.estilo}
      </p>

      <div className="relative mt-4 px-5 sm:px-6 md:px-8">
        <div className="card-stack absolute inset-x-9 top-8 h-[420px] sm:h-[480px] md:h-[520px] bg-panel-2 opacity-40 ring-1 ring-line" />
        <div className="relative">
          {pet ? (
            <PetCard key={pet.id + indice} pet={pet} />
          ) : (
            <div className="card-stack grid h-[300px] place-items-center bg-panel px-8 text-center text-[12px] text-cream-dim ring-1 ring-line">
              Nenhum pet com alta compatibilidade agora. Ajuste os filtros de energia ou estilo de
              brincadeira.
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-5">
        <button
          aria-label="Voltar"
          onClick={() => setIndice((i) => Math.max(0, i - 1))}
          className="grid size-11 place-items-center rounded-full bg-panel-2 text-cream-dim ring-1 ring-line"
        >
          <RotateCcw className="size-4" />
        </button>
        <button
          aria-label="Curtir"
          onClick={() => avancar(true)}
          className="grid size-16 place-items-center rounded-full bg-glow text-ink shadow-[0_0_30px_-4px_oklch(0.87_0.14_88/0.6)] ring-1 ring-cream/20 transition active:scale-95"
        >
          <Heart className="size-6" fill="currentColor" />
        </button>
        <button
          aria-label="Super curtir"
          onClick={() => avancar(false)}
          className="grid size-11 place-items-center rounded-full bg-panel-2 text-cream-dim ring-1 ring-line"
        >
          <Star className="size-4" />
        </button>
      </div>

      {ultimoMatch && (
        <div className="mx-5 mt-4 flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center rounded-2xl bg-glow/15 p-3 ring-1 ring-glow/40">
          <p className="text-[12px] text-cream">
            É um match com <b>{ultimoMatch.nome}</b>! 🐾
          </p>
          {conversaDoMatch ? (
            <Link
              to="/chat/$conversaId"
              params={{ conversaId: conversaDoMatch.id }}
              className="w-full shrink-0 rounded-full bg-glow px-3 py-1.5 text-center sm:w-auto text-[11px] font-semibold text-ink"
            >
              Abrir chat
            </Link>
          ) : (
            <Link
              to="/chat"
              className="shrink-0 rounded-full bg-glow px-3 py-1.5 text-[11px] font-semibold text-ink"
            >
              Abrir chat
            </Link>
          )}
        </div>
      )}

      <p className="mt-4 px-8 text-center font-mono text-[10px] leading-relaxed text-cream-dim">
        {modo === "social"
          ? "Encontros sugeridos sempre em locais públicos e neutros."
          : "Cruzamento responsável: exames e pedigree conferidos antes do match."}
      </p>
    </AppShell>
  );
}
