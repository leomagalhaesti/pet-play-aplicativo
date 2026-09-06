import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { conversas } from "@/lib/pets";
import { ArrowLeft, ShieldCheck, Send, Star } from "lucide-react";

export const Route = createFileRoute("/chat/$conversaId")({
  head: () => ({
    meta: [
      { title: "Conversa — PetMatch & Play" },
      {
        name: "description",
        content: "Combine o passeio com segurança: local público, horário claro e pets vacinados.",
      },
      { property: "og:title", content: "Conversa — PetMatch & Play" },
      {
        property: "og:description",
        content: "Chat interno com lembretes de segurança e avaliação pós-encontro.",
      },
    ],
  }),
  component: ConversaPage,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-ink text-cream-dim">
      Conversa não encontrada.
    </div>
  ),
});

function ConversaPage() {
  const { conversaId } = useParams({ from: "/chat/$conversaId" });
  const conversa = conversas.find((c) => c.id === conversaId);
  const [msgs, setMsgs] = useState(conversa?.mensagens ?? []);
  const [texto, setTexto] = useState("");
  const [avaliacao, setAvaliacao] = useState(0);

  if (!conversa) {
    return (
      <div className="grid min-h-screen place-items-center bg-ink text-cream-dim">
        Conversa não encontrada.
      </div>
    );
  }

  const enviar = () => {
    const t = texto.trim().slice(0, 500);
    if (!t) return;
    setMsgs((m) => [...m, { de: "eu", texto: t, hora: "agora" }]);
    setTexto("");
  };

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-ink text-cream">
      <header className="flex items-center gap-3 border-b border-line px-4 pt-6 pb-3">
        <Link to="/chat" className="grid size-9 place-items-center rounded-full bg-panel-2 ring-1 ring-line">
          <ArrowLeft className="size-4" />
        </Link>
        <img
          src={conversa.foto}
          alt={conversa.nome}
          width={768}
          height={768}
          loading="lazy"
          className="size-10 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-[14px] font-semibold">{conversa.nome}</p>
          <p className="font-mono text-[10px] text-cream-dim">tutor · {conversa.tutor}</p>
        </div>
      </header>

      <div className="flex items-start gap-2.5 bg-sage/10 px-4 py-3">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-sage" />
        <p className="text-[11px] leading-relaxed text-sage">
          Primeiro encontro em local neutro e público. Avise alguém de confiança sobre o horário.
        </p>
      </div>

      <div className="flex-1 space-y-2 px-4 py-4">
        {msgs.map((m, i) => (
          <div key={i} className={m.de === "eu" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={
                m.de === "eu"
                  ? "max-w-[78%] rounded-2xl rounded-br-md bg-glow px-3.5 py-2.5 text-[13px] text-ink"
                  : "max-w-[78%] rounded-2xl rounded-bl-md bg-panel px-3.5 py-2.5 text-[13px] text-cream ring-1 ring-line"
              }
            >
              {m.texto}
              <span
                className={
                  m.de === "eu"
                    ? "mt-1 block font-mono text-[9px] text-ink/60"
                    : "mt-1 block font-mono text-[9px] text-cream-dim"
                }
              >
                {m.hora}
              </span>
            </div>
          </div>
        ))}
      </div>

      <section className="mx-4 mb-3 rounded-2xl bg-panel-2 p-3.5 ring-1 ring-line">
        <p className="font-mono text-[10px] tracking-[0.2em] text-cream-dim uppercase">
          Avaliação pós-encontro
        </p>
        <div className="mt-2 flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} onClick={() => setAvaliacao(n)} aria-label={`${n} estrelas`}>
              <Star
                className={n <= avaliacao ? "size-6 text-glow" : "size-6 text-cream-dim"}
                fill={n <= avaliacao ? "currentColor" : "none"}
              />
            </button>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-cream-dim">
          {avaliacao > 0
            ? "Obrigado! Sua nota ajuda a manter a comunidade segura."
            : "Como foi o comportamento do pet e a pontualidade do tutor?"}
        </p>
      </section>

      <div className="sticky bottom-0 flex items-center gap-2 border-t border-line bg-ink/95 px-4 py-3 backdrop-blur">
        <input
          value={texto}
          maxLength={500}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && enviar()}
          placeholder="Escreva uma mensagem..."
          className="flex-1 rounded-full bg-panel px-4 py-3 text-[13px] text-cream ring-1 ring-line outline-none placeholder:text-cream-dim focus:ring-glow/50"
        />
        <button
          onClick={enviar}
          aria-label="Enviar"
          className="grid size-11 shrink-0 place-items-center rounded-full bg-glow text-ink"
        >
          <Send className="size-4" />
        </button>
      </div>
    </div>
  );
}
