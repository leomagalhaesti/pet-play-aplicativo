import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, Check, Upload } from "lucide-react";
import { createPet } from "@/lib/server-data";

export const Route = createFileRoute("/cadastro")({
  head: () => ({
    meta: [
      { title: "Cadastro do tutor e ficha do pet" },
      {
        name: "description",
        content:
          "Crie o perfil do tutor, preencha a ficha do pet (raça, porte, energia, castração) e envie a carteira de vacinação.",
      },
      { property: "og:title", content: "Cadastro do tutor e ficha do pet" },
      {
        property: "og:description",
        content: "Três passos rápidos para começar a encontrar companhia para o seu pet.",
      },
    ],
  }),
  component: CadastroPage,
});

const portes = ["Pequeno", "Médio", "Grande"];
const energias = ["Baixa", "Média", "Alta"];

function CadastroPage() {
  const [passo, setPasso] = useState(1);
  const [porte, setPorte] = useState("Médio");
  const [energia, setEnergia] = useState("Média");
  const [castrado, setCastrado] = useState(true);
  const [carteira, setCarteira] = useState(false);
  const [nomeTutor, setNomeTutor] = useState("");
  const [emailTutor, setEmailTutor] = useState("");
  const [nomePet, setNomePet] = useState("");
  const [raca, setRaca] = useState("");
  const createPetMutation = useMutation({ mutationFn: () => createPet({
    data: { nome: nomePet || "Novo pet", raca: raca || "SRD", porte: porte as "Pequeno" | "Médio" | "Grande",
      energia: energia as "Baixa" | "Média" | "Alta", castrado, tutorNome: nomeTutor || "Tutor", tutorEmail: emailTutor || "demo@petplay.app" }
  }) });

  return (
    <div className="relative mx-auto min-h-screen w-full max-w-[430px] sm:max-w-xl md:max-w-2xl lg:max-w-3xl bg-ink px-5 pt-6 pb-10 sm:px-8 lg:px-10 text-cream">
      <div className="flex items-center gap-3">
        <Link to="/perfil" className="grid size-9 place-items-center rounded-full bg-panel-2 ring-1 ring-line">
          <ArrowLeft className="size-4" />
        </Link>
        <div>
          <p className="font-display text-[22px] leading-none tracking-tight">CADASTRO</p>
          <p className="mt-1 font-mono text-[9px] tracking-[0.25em] text-cream-dim">
            PASSO {passo} DE 3
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-1.5">
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            className={
              n <= passo ? "h-1 flex-1 rounded-full bg-glow" : "h-1 flex-1 rounded-full bg-panel-2"
            }
          />
        ))}
      </div>

      {passo === 1 && (
        <section className="animate-fade-up mt-6 space-y-3">
          <h1 className="font-display text-[26px] leading-tight tracking-tight">Sobre você</h1>
          <Campo label="Nome do tutor" placeholder="Como podemos te chamar?" value={nomeTutor} onChange={setNomeTutor} />
          <Campo label="E-mail" placeholder="voce@email.com" type="email" value={emailTutor} onChange={setEmailTutor} />
          <Campo label="Cidade" placeholder="Salvador, BA" />
        </section>
      )}

      {passo === 2 && (
        <section className="animate-fade-up mt-6 space-y-3">
          <h1 className="font-display text-[26px] leading-tight tracking-tight">Ficha do pet</h1>
          <Campo label="Nome do pet" placeholder="Amora" value={nomePet} onChange={setNomePet} />
          <Campo label="Raça" placeholder="SRD, Golden, Siamês..." value={raca} onChange={setRaca} />

          <div>
            <p className="mb-2 font-mono text-[10px] tracking-[0.2em] text-cream-dim uppercase">
              Porte
            </p>
            <div className="flex gap-2">
              {portes.map((p) => (
                <Opcao key={p} ativo={porte === p} onClick={() => setPorte(p)}>
                  {p}
                </Opcao>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 font-mono text-[10px] tracking-[0.2em] text-cream-dim uppercase">
              Nível de energia
            </p>
            <div className="flex gap-2">
              {energias.map((e) => (
                <Opcao key={e} ativo={energia === e} onClick={() => setEnergia(e)}>
                  {e}
                </Opcao>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCastrado((c) => !c)}
            className="flex w-full items-center justify-between rounded-2xl bg-panel px-4 py-3.5 ring-1 ring-line"
          >
            <span className="text-[13px]">Pet castrado</span>
            <span
              className={
                castrado
                  ? "grid size-6 place-items-center rounded-full bg-sage text-ink"
                  : "size-6 rounded-full bg-panel-2 ring-1 ring-line"
              }
            >
              {castrado && <Check className="size-3.5" />}
            </span>
          </button>
        </section>
      )}

      {passo === 3 && (
        <section className="animate-fade-up mt-6 space-y-3">
          <h1 className="font-display text-[26px] leading-tight tracking-tight">
            Carteira de vacinação
          </h1>
          <p className="text-[12px] leading-relaxed text-cream-dim">
            Envie uma foto da carteira para receber o <strong className="text-cream">Selo de
            Saúde Verificada</strong>. Perfis com selo recebem mais matches e passam mais confiança.
          </p>
          <button
            onClick={() => setCarteira(true)}
            className={
              carteira
                ? "flex w-full items-center justify-center gap-2 rounded-2xl bg-sage/15 py-8 text-[13px] font-semibold text-sage ring-1 ring-sage/30"
                : "flex w-full items-center justify-center gap-2 rounded-2xl bg-panel py-8 text-[13px] font-medium text-cream-dim ring-1 ring-line ring-dashed"
            }
          >
            {carteira ? <Check className="size-4" /> : <Upload className="size-4" />}
            {carteira ? "Carteira enviada para análise" : "Enviar foto da carteira"}
          </button>
        </section>
      )}

      <div className="mt-8 flex gap-3">
        {passo > 1 && (
          <button
            onClick={() => setPasso((p) => p - 1)}
            className="flex-1 rounded-full bg-panel-2 py-3.5 text-[13px] font-medium text-cream ring-1 ring-line"
          >
            Voltar
          </button>
        )}
        {passo < 3 ? (
          <button
            onClick={() => setPasso((p) => p + 1)}
            className="flex-1 rounded-full bg-glow py-3.5 text-[13px] font-semibold text-ink"
          >
            Continuar
          </button>
        ) : (
          <button
            onClick={() => void createPetMutation.mutateAsync()}
            disabled={createPetMutation.isPending}
            className="flex-1 rounded-full bg-glow py-3.5 text-center text-[13px] font-semibold text-ink disabled:opacity-60"
          >
            {createPetMutation.isPending ? "Salvando..." : "Salvar e começar"}
          </button>
          <Link
            to="/"
            className="flex-1 rounded-full bg-glow py-3.5 text-center text-[13px] font-semibold text-ink"
          >
            Começar a buscar
          </Link>
        )}
      </div>
    </div>
  );
}

function Campo({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[10px] tracking-[0.2em] text-cream-dim uppercase">
        {label}
      </span>
      <input
        type={type}
        maxLength={80}
        placeholder={placeholder}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className="w-full rounded-2xl bg-panel px-4 py-3.5 text-[13px] text-cream ring-1 ring-line outline-none placeholder:text-cream-dim focus:ring-glow/50"
      />
    </label>
  );
}

function Opcao({
  ativo,
  onClick,
  children,
}: {
  ativo: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={
        ativo
          ? "flex-1 rounded-full bg-cream py-2.5 text-[12px] font-semibold text-ink"
          : "flex-1 rounded-full bg-panel py-2.5 text-[12px] text-cream-dim ring-1 ring-line"
      }
    >
      {children}
    </button>
  );
}
