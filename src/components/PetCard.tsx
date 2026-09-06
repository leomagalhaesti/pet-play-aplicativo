import type { Pet } from "@/lib/pets";
import { BadgeCheck, MapPin } from "lucide-react";

export function PetCard({ pet }: { pet: Pet }) {
  return (
    <article
      key={pet.id}
      className="card-stack animate-card-in relative overflow-hidden bg-panel ring-1 ring-line"
    >
      <div className="relative h-[290px]">
        <img
          src={pet.foto}
          alt={`${pet.nome}, ${pet.raca}`}
          width={768}
          height={768}
          className="size-full object-cover"
        />
        <div className="absolute inset-x-3 top-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 rounded-full bg-ink/70 px-2.5 py-1 ring-1 ring-cream/15 backdrop-blur-sm">
            <MapPin className="size-3 text-glow" />
            <span className="font-mono text-[10px] text-cream">{pet.distancia}</span>
          </div>
          {pet.verificado ? (
            <div className="animate-badge-pop flex items-center gap-1 rounded-full bg-glow px-2.5 py-1">
              <BadgeCheck className="size-3 text-ink" />
              <span className="font-mono text-[10px] font-medium text-ink">VERIFICADO</span>
            </div>
          ) : (
            <div className="rounded-full bg-ink/70 px-2.5 py-1 ring-1 ring-cream/15 backdrop-blur-sm">
              <span className="font-mono text-[10px] text-cream-dim">SEM SELO</span>
            </div>
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-panel to-transparent" />
      </div>

      <div className="px-4 pt-1 pb-4">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-[30px] leading-none tracking-tight text-cream">
            {pet.nome}
          </h2>
          <div className="text-right">
            <p className="font-mono text-[10px] text-cream-dim">RAÇA</p>
            <p className="text-[13px] font-medium text-cream">{pet.raca}</p>
          </div>
        </div>

        <p className="mt-2 text-[12px] leading-snug text-cream-dim">{pet.bio}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          <Chip>Porte {pet.porte}</Chip>
          <Chip>Energia {pet.energia}</Chip>
          <Chip>{pet.idade}</Chip>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {pet.vacinado && (
            <div className="flex items-center gap-1.5 rounded-full bg-sage/15 px-3 py-1.5 ring-1 ring-sage/30">
              <span className="size-1.5 rounded-full bg-sage" />
              <span className="text-[11px] font-medium text-sage">Vacinas em dia</span>
            </div>
          )}
          <div className="rounded-full bg-panel-2 px-3 py-1.5 ring-1 ring-line">
            <span className="text-[11px] font-medium text-cream">
              {pet.castrado ? "Castrado" : "Não castrado"}
            </span>
          </div>
          <div className="rounded-full bg-panel-2 px-3 py-1.5 ring-1 ring-line">
            <span className="text-[11px] font-medium text-cream-dim">Tutor: {pet.tutor}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-panel-2 px-2.5 py-1 text-[11px] text-cream ring-1 ring-line">
      {children}
    </span>
  );
}
