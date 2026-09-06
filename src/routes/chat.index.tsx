import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, AppHeader } from "@/components/AppShell";
import { conversas } from "@/lib/pets";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/chat/")({
  head: () => ({
    meta: [
      { title: "Conversas — chat seguro após o match" },
      {
        name: "description",
        content:
          "Converse com tutores depois do match, com lembretes de segurança para encontros em locais neutros.",
      },
      { property: "og:title", content: "Conversas — chat seguro após o match" },
      {
        property: "og:description",
        content: "Chat liberado só após o match, com dicas de segurança em cada conversa.",
      },
    ],
  }),
  component: ChatPage,
});

function ChatPage() {
  return (
    <AppShell>
      <AppHeader title="CONVERSAS" subtitle="liberadas após o match" />

      <div className="mt-4 px-5">
        <div className="flex items-start gap-2.5 rounded-2xl bg-sage/10 p-3.5 ring-1 ring-sage/25">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-sage" />
          <p className="text-[11px] leading-relaxed text-sage">
            Combine o primeiro encontro em local público e neutro. Nunca envie documentos ou dados
            de pagamento pelo chat.
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-2 px-5">
        {conversas.map((c) => (
          <Link
            key={c.id}
            to="/chat/$conversaId"
            params={{ conversaId: c.id }}
            className="flex items-center gap-3 rounded-2xl bg-panel p-3 ring-1 ring-line"
          >
            <img
              src={c.foto}
              alt={c.nome}
              width={768}
              height={768}
              loading="lazy"
              className="size-12 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-[14px] font-semibold text-cream">
                  {c.nome} <span className="font-normal text-cream-dim">· {c.tutor}</span>
                </p>
                <span className="font-mono text-[10px] text-cream-dim">{c.hora}</span>
              </div>
              <p className="mt-0.5 truncate text-[12px] text-cream-dim">{c.previa}</p>
            </div>
            {c.naoLidas > 0 && (
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-glow font-mono text-[10px] text-ink">
                {c.naoLidas}
              </span>
            )}
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
