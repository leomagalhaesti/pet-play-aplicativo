import pet1 from "@/assets/pet-1.jpg";
import pet2 from "@/assets/pet-2.jpg";
import pet3 from "@/assets/pet-3.jpg";
import pet4 from "@/assets/pet-4.jpg";

export type Modo = "social" | "reproducao";

export type Energia = "Baixa" | "Média" | "Alta";

export type Estilo = "Brinca forte" | "Calmo/Idoso" | "Corre com bolinha" | "Explorador tranquilo";

export type Pet = {
  id: string;
  nome: string;
  raca: string;
  idade: string;
  porte: "Pequeno" | "Médio" | "Grande";
  energia: Energia;
  estilo: Estilo;
  castrado: boolean;
  vacinado: boolean;
  verificado: boolean;
  distancia: string;
  tutor: string;
  bio: string;
  foto: string;
  modos: Modo[];
};

export const pets: Pet[] = [
  {
    id: "biscuit",
    nome: "Biscuit",
    raca: "Golden Retriever",
    idade: "1 ano",
    porte: "Médio",
    energia: "Alta",
    estilo: "Corre com bolinha",
    castrado: true,
    vacinado: true,
    verificado: true,
    distancia: "1,2 km",
    tutor: "Marina",
    bio: "Adora correr atrás de bolinha e fazer amigos no parque.",
    foto: pet1,
    modos: ["social"],
  },
  {
    id: "nina",
    nome: "Nina",
    raca: "Border Collie",
    idade: "3 anos",
    porte: "Médio",
    energia: "Alta",
    estilo: "Brinca forte",
    castrado: false,
    vacinado: true,
    verificado: true,
    distancia: "2,4 km",
    tutor: "Rafael",
    bio: "Pedigree completo, exames em dia. Busca cruzamento responsável.",
    foto: pet2,
    modos: ["social", "reproducao"],
  },
  {
    id: "tico",
    nome: "Tico",
    raca: "Bulldog Francês",
    idade: "2 anos",
    porte: "Pequeno",
    energia: "Média",
    estilo: "Explorador tranquilo",
    castrado: true,
    vacinado: true,
    verificado: false,
    distancia: "800 m",
    tutor: "Júlia",
    bio: "Tranquilo, curte passeios curtos e sombra fresquinha.",
    foto: pet3,
    modos: ["social"],
  },
  {
    id: "mel",
    nome: "Mel",
    raca: "Vira-lata Caramelo (gata)",
    idade: "4 anos",
    porte: "Pequeno",
    energia: "Baixa",
    estilo: "Calmo/Idoso",
    castrado: false,
    vacinado: true,
    verificado: true,
    distancia: "3,1 km",
    tutor: "Caio",
    bio: "Sociável com outros gatos, encontros só em casa dos tutores.",
    foto: pet4,
    modos: ["social", "reproducao"],
  },
];

/** Perfil do pet do usuário (base do algoritmo de compatibilidade). */
export const meuPet = {
  nome: "Amora",
  energia: "Média" as Energia,
  estilo: "Corre com bolinha" as Estilo,
  porte: "Médio" as const,
};

const escalaEnergia: Record<Energia, number> = { Baixa: 0, Média: 1, Alta: 2 };

/**
 * Compatibilidade de energia + estilo de brincadeira (0-100).
 * Quanto menor a diferença de energia e mais próximo o estilo, maior a chance
 * do encontro dar certo.
 */
export function compatibilidade(pet: Pet, base = meuPet): number {
  const difEnergia = Math.abs(escalaEnergia[pet.energia] - escalaEnergia[base.energia]);
  let score = 100 - difEnergia * 26;

  if (pet.estilo !== base.estilo) {
    const intensos: Estilo[] = ["Brinca forte", "Corre com bolinha"];
    const calmos: Estilo[] = ["Calmo/Idoso", "Explorador tranquilo"];
    const mesmoGrupo =
      (intensos.includes(pet.estilo) && intensos.includes(base.estilo)) ||
      (calmos.includes(pet.estilo) && calmos.includes(base.estilo));
    score -= mesmoGrupo ? 8 : 22;
  }

  if (pet.porte !== base.porte) score -= 6;
  if (!pet.verificado) score -= 5;

  return Math.max(12, Math.min(100, score));
}

export function rotuloCompatibilidade(score: number): string {
  if (score >= 85) return "Match ideal";
  if (score >= 70) return "Boa combinação";
  if (score >= 50) return "Requer atenção";
  return "Pouco compatível";
}

export type PetPoint = {
  id: string;
  nome: string;
  tipo: string;
  distancia: string;
  checkins: number;
  x: number;
  y: number;
};

export const petPoints: PetPoint[] = [
  { id: "p1", nome: "Parque das Patas", tipo: "Parque dog friendly", distancia: "600 m", checkins: 7, x: 32, y: 28 },
  { id: "p2", nome: "Café Au Lait Pet", tipo: "Café pet friendly", distancia: "1,1 km", checkins: 3, x: 68, y: 44 },
  { id: "p3", nome: "Praça do Focinho", tipo: "Praça com área cercada", distancia: "1,8 km", checkins: 12, x: 46, y: 68 },
  { id: "p4", nome: "Vet Amigo 24h", tipo: "Clínica veterinária", distancia: "2,3 km", checkins: 0, x: 78, y: 76 },
];

export type Conversa = {
  id: string;
  petId: string;
  nome: string;
  tutor: string;
  foto: string;
  previa: string;
  hora: string;
  naoLidas: number;
  mensagens: { de: "eu" | "ele"; texto: string; hora: string }[];
};

export const conversas: Conversa[] = [
  {
    id: "c1",
    petId: "biscuit",
    nome: "Biscuit",
    tutor: "Marina",
    foto: pet1,
    previa: "Bora no Parque das Patas amanhã 9h?",
    hora: "18:02",
    naoLidas: 2,
    mensagens: [
      { de: "ele", texto: "Oi! O Biscuit amou o perfil da sua pet 🐾", hora: "17:44" },
      { de: "eu", texto: "Oi Marina! Eles têm a mesma energia, vai ser divertido.", hora: "17:51" },
      { de: "ele", texto: "Bora no Parque das Patas amanhã 9h?", hora: "18:02" },
    ],
  },
  {
    id: "c2",
    petId: "nina",
    nome: "Nina",
    tutor: "Rafael",
    foto: pet2,
    previa: "Posso enviar os exames da Nina hoje.",
    hora: "Ontem",
    naoLidas: 0,
    mensagens: [{ de: "ele", texto: "Posso enviar os exames da Nina hoje.", hora: "Ontem" }],
  },
  {
    id: "c3",
    petId: "tico",
    nome: "Tico",
    tutor: "Júlia",
    foto: pet3,
    previa: "O Tico prefere passeios no fim da tarde 🌇",
    hora: "Seg",
    naoLidas: 0,
    mensagens: [{ de: "ele", texto: "O Tico prefere passeios no fim da tarde 🌇", hora: "Seg" }],
  },
];

/** Prontuário digital: lembretes de vacinas, vermífugo e antipulgas. */
export type Lembrete = {
  id: string;
  titulo: string;
  tipo: "Vacina" | "Vermífugo" | "Antipulgas" | "Consulta";
  data: string;
  emDias: number;
  feito: boolean;
};

export const lembretes: Lembrete[] = [
  { id: "l1", titulo: "Antipulgas mensal", tipo: "Antipulgas", data: "22 set", emDias: 2, feito: false },
  { id: "l2", titulo: "Vermífugo (dose única)", tipo: "Vermífugo", data: "05 out", emDias: 15, feito: false },
  { id: "l3", titulo: "Reforço V10", tipo: "Vacina", data: "18 out", emDias: 28, feito: false },
  { id: "l4", titulo: "Antirrábica anual", tipo: "Vacina", data: "12 ago", emDias: -39, feito: true },
  { id: "l5", titulo: "Check-up no Vet Amigo", tipo: "Consulta", data: "30 nov", emDias: 71, feito: false },
];

/** Passport Play: medalhas de conquistas do pet. */
export type Conquista = {
  id: string;
  nome: string;
  descricao: string;
  emoji: string;
  progresso: number;
  meta: number;
};

export const conquistas: Conquista[] = [
  { id: "a1", nome: "Explorador de Parques", descricao: "Visite 5 pet points credenciados", emoji: "🌳", progresso: 5, meta: 5 },
  { id: "a2", nome: "Sociável do Bairro", descricao: "Faça amizade com 8 pets diferentes", emoji: "🐾", progresso: 6, meta: 8 },
  { id: "a3", nome: "10 Encontros Realizados", descricao: "Complete 10 dog dates", emoji: "🏅", progresso: 10, meta: 10 },
  { id: "a4", nome: "Focinho Saudável", descricao: "Mantenha vacinas em dia por 12 meses", emoji: "💚", progresso: 9, meta: 12 },
  { id: "a5", nome: "Café com Patas", descricao: "Check-in em 3 cafés pet friendly", emoji: "☕", progresso: 1, meta: 3 },
];
