import pet1 from "@/assets/pet-1.jpg";
import pet2 from "@/assets/pet-2.jpg";
import pet3 from "@/assets/pet-3.jpg";
import pet4 from "@/assets/pet-4.jpg";

export type Modo = "social" | "reproducao";

export type Pet = {
  id: string;
  nome: string;
  raca: string;
  idade: string;
  porte: "Pequeno" | "Médio" | "Grande";
  energia: "Baixa" | "Média" | "Alta";
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
    mensagens: [
      { de: "ele", texto: "Posso enviar os exames da Nina hoje.", hora: "Ontem" },
    ],
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
    mensagens: [
      { de: "ele", texto: "O Tico prefere passeios no fim da tarde 🌇", hora: "Seg" },
    ],
  },
];
