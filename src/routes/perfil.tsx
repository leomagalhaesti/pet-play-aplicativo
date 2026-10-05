import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppShell, AppHeader } from "@/components/AppShell";
import pet1 from "@/assets/pet-1.jpg";
import { conquistas as conquistasBase, meuPet } from "@/lib/pets";
import { getAchievements } from "@/lib/server-data";
import { BadgeCheck, Crown, Star, Upload, HeartPulse, Share2 } from "lucide-react";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Meu pet — ficha, vacinas e reputação" },
      {
        name: "description",
        content:
          "Ficha completa do pet, envio da carteira de vacinação para o Selo de Saúde Verificada e plano Premium.",
      },
      { property: "og:title", content: "Meu pet — ficha, vacinas e reputação" },
      {
        property: "og:description",
        content: "Complete a ficha do pet, verifique as vacinas e desbloqueie filtros avançados.",
      },
    ],
  }),
  component: PerfilPage,
});

function PerfilPage() {
  const achievementsQuery = useQuery({ queryKey: ["conquistas"], queryFn: () => getAchievements() });
  const conquistas = achievementsQuery.data?.source === "d1" && achievementsQuery.data.data.length
    ? achievementsQuery.data.data
    : conquistasBase;
  const [enviada, setEnviada] = useState(false);

  return (
    <AppShell>
      <AppHeader title="MEU PET" subtitle="ficha e reputação" />

      <div className="mt-4 px-5">
        <div className="flex flex-col items-start gap-4 rounded-3xl sm:flex-row sm:items-center bg-panel p-4 ring-1 ring-line">
          <img
            src={pet1}
            alt="Foto do meu pet"
            width={768}
            height={768}
            className="size-20 shrink-0 rounded-2xl object-cover"
          />
          <div className="min-w-0">
            <p className="font-display text-[24px] leading-none tracking-tight">Amora</p>
            <p className="mt-1.5 text-[12px] text-cream-dim">
              SRD · 3 anos · Porte médio · Energia média
            </p>
            <div className="mt-2 flex items-center gap-1.5">
              <Star className="size-3.5 text-glow" fill="currentColor" />
              <span className="font-mono text-[10px] text-cream">4,9 · 18 encontros</span>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-3 px-5">
        <div
          className={
            enviada
              ? "rounded-3xl bg-sage/10 p-4 ring-1 ring-sage/30"
              : "rounded-3xl bg-panel-2 p-4 ring-1 ring-line"
          }
        >
          <div className="flex items-center gap-2">
            <BadgeCheck className={enviada ? "size-4 text-sage" : "size-4 text-cream-dim"} />
            <p className="text-[13px] font-semibold">
              {enviada ? "Selo de Saúde Verificada ativo" : "Selo de Saúde Verificada"}
            </p>
          </div>
          <p className="mt-1.5 text-[11px] leading-relaxed text-cream-dim">
            {enviada
              ? "Carteira de vacinação analisada. Seu perfil aparece com prioridade nas buscas."
              : "Envie a carteira de vacinação para ganhar o selo e mais confiança nos matches."}
          </p>
          {!enviada && (
            <button
              onClick={() => setEnviada(true)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-glow py-3 text-[13px] font-semibold text-ink"
            >
              <Upload className="size-4" /> Enviar carteira de vacinação
            </button>
          )}
        </div>
      </section>

      <section className="mt-3 px-5">
        <Link
          to="/saude"
          className="flex items-center gap-3 rounded-3xl bg-panel px-4 py-3.5 ring-1 ring-line"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sage/15 ring-1 ring-sage/30">
            <HeartPulse className="size-4 text-sage" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[13px] font-semibold text-cream">
              Cartão de vacina &amp; prontuário
            </span>
            <span className="block text-[11px] text-cream-dim">
              Lembretes de vacina, vermífugo e antipulgas · grátis
            </span>
          </span>
          <span className="font-mono text-[10px] text-glow">abrir</span>
        </Link>
      </section>

      <section className="mt-3 px-5">
        <div className="rounded-3xl bg-panel p-4 ring-1 ring-line">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] tracking-[0.2em] text-cream-dim uppercase">
              Passport Play
            </p>
            <button className="flex items-center gap-1.5 rounded-full bg-panel-2 px-2.5 py-1 text-[10px] text-cream ring-1 ring-line">
              <Share2 className="size-3 text-glow" /> Compartilhar
            </button>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {conquistas.map((c) => {
              const completa = c.progresso >= c.meta;
              return (
                <div
                  key={c.id}
                  className={
                    completa
                      ? "rounded-2xl bg-glow/15 p-2.5 text-center ring-1 ring-glow/40"
                      : "rounded-2xl bg-panel-2 p-2.5 text-center ring-1 ring-line"
                  }
                >
                  <span className={completa ? "text-[20px]" : "text-[20px] opacity-40"}>
                    {c.emoji}
                  </span>
                  <p className="mt-1 text-[10px] leading-tight font-medium text-cream">{c.nome}</p>
                  <p className="mt-0.5 font-mono text-[9px] text-cream-dim">
                    {Math.min(c.progresso, c.meta)}/{c.meta}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-[11px] text-cream-dim">
            Medalhas conquistadas por {meuPet.nome} em encontros e check-ins em locais credenciados.
          </p>
        </div>
      </section>

      <section className="mt-3 space-y-2 px-5">
        <p className="font-mono text-[10px] tracking-[0.2em] text-cream-dim uppercase">
          Ficha do pet
        </p>
        {[
          ["Raça", "SRD"],
          ["Porte", "Médio"],
          ["Nível de energia", meuPet.energia],
          ["Estilo de brincadeira", meuPet.estilo],
          ["Castração", "Castrada"],
          ["Vacinas", "V10 e antirrábica em dia"],
          ["Temperamento", "Sociável, calma com filhotes"],
        ].map(([k, v]) => (
          <div
            key={k}
            className="flex items-center justify-between rounded-2xl bg-panel px-4 py-3 ring-1 ring-line"
          >
            <span className="text-[12px] text-cream-dim">{k}</span>
            <span className="text-[12px] font-medium text-cream">{v}</span>
          </div>
        ))}
      </section>

      <section className="mt-3 px-5">
        <div className="rounded-3xl bg-gradient-to-br from-glow/20 to-panel p-4 ring-1 ring-glow/30">
          <div className="flex items-center gap-2">
            <Crown className="size-4 text-glow" />
            <p className="text-[13px] font-semibold">Premium · R$ 9,90/mês</p>
          </div>
          <ul className="mt-2 space-y-1 text-[11px] text-cream-dim">
            <li>· Selo de vacinação com verificação prioritária</li>
            <li>· Filtros comportamentais avançados</li>
            <li>· Curtidas ilimitadas e sem anúncios</li>
          </ul>
          <button className="mt-3 w-full rounded-full bg-glow py-3 text-[13px] font-semibold text-ink">
            Assinar Premium
          </button>
        </div>
      </section>

      <section className="mt-3 px-5">
        <Link
          to="/cadastro"
          className="block rounded-2xl bg-panel-2 px-4 py-3 text-center text-[12px] font-medium text-cream ring-1 ring-line"
        >
          Cadastrar outro pet
        </Link>
      </section>
    </AppShell>
  );
}
