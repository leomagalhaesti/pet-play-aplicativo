import { createServerFn } from "@tanstack/react-start";
import { conversas as fallbackConversas, lembretes as fallbackLembretes, petPoints as fallbackPoints, pets as fallbackPets, type Lembrete, type Pet, type PetPoint, type Conversa } from "@/lib/pets";

type D1Statement = {
  bind(...values: unknown[]): D1Statement;
  all<T>(): Promise<{ results: T[] }>;
  first<T>(): Promise<T | null>;
  run(): Promise<unknown>;
};
type D1 = { prepare(sql: string): D1Statement };

type PetRow = {
  id:string; nome:string; raca:string|null; idade:string|null; porte:Pet["porte"]; energia:Pet["energia"];
  estilo:Pet["estilo"]; castrado:number; vacinado:number; verificado:number; bio:string|null;
  foto_url:string|null; tutor:string; modos:string;
};
type PointRow = { id:string; nome:string; tipo:string; distancia:string; checkins:number; x:number; y:number };
type ReminderRow = { id:string; titulo:string; tipo:Lembrete["tipo"]; data:string; em_dias:number; feito:number };
type ConversationRow = { id:string; pet_id:string; nome:string; tutor:string; foto_url:string|null; previa:string; hora:string; nao_lidas:number };
type MessageRow = { id:string; conversa_id:string; remetente:string; texto:string; hora:string };

async function getD1(): Promise<D1 | null> {
  try {
    const { env } = await import("cloudflare:workers");
    return (env as unknown as { DB?: D1 }).DB ?? null;
  } catch {
    return null;
  }
}

function parseModes(value: string): Pet["modos"] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((m): m is Pet["modos"][number] => m === "social" || m === "reproducao") : ["social"];
  } catch {
    return ["social"];
  }
}

function mapPet(row: PetRow): Pet {
  return {
    id: row.id, nome: row.nome, raca: row.raca ?? "SRD", idade: row.idade ?? "não informado",
    porte: row.porte, energia: row.energia, estilo: row.estilo, castrado: Boolean(row.castrado),
    vacinado: Boolean(row.vacinado), verificado: Boolean(row.verificado), distancia: "próximo",
    tutor: row.tutor, bio: row.bio ?? "", foto: fallbackPets.find((p) => p.id === row.id)?.foto ?? row.foto_url ?? "", modos: parseModes(row.modos),
  };
}

export const getPets = createServerFn({ method: "GET" }).handler(async () => {
  const db = await getD1();
  if (!db) return { source: "demo" as const, data: fallbackPets };
  const result = await db.prepare(`
    SELECT p.*, t.nome AS tutor
    FROM pets p JOIN tutors t ON t.id = p.tutor_id WHERE p.id <> 'amora'
    ORDER BY p.verificado DESC, p.nome ASC
  `).all<PetRow>();
  return { source: "d1" as const, data: result.results.map(mapPet) };
});

export const getPetPoints = createServerFn({ method: "GET" }).handler(async () => {
  const db = await getD1();
  if (!db) return { source: "demo" as const, data: fallbackPoints };
  const result = await db.prepare(`
    SELECT pp.id, pp.nome, pp.tipo, COALESCE(pp.distancia, '') AS distancia,
           COUNT(c.id) AS checkins, COALESCE(pp.x, 50) AS x, COALESCE(pp.y, 50) AS y
    FROM pet_points pp LEFT JOIN checkins c ON c.pet_point_id = pp.id
    WHERE pp.ativo = 1 GROUP BY pp.id ORDER BY pp.nome
  `).all<PointRow>();
  return { source: "d1" as const, data: result.results };
});

export const getReminders = createServerFn({ method: "GET" }).handler(async () => {
  const db = await getD1();
  if (!db) return { source: "demo" as const, data: fallbackLembretes };
  const result = await db.prepare(`
    SELECT id, titulo, tipo, data, COALESCE(em_dias, 999) AS em_dias, feito
    FROM lembretes_saude WHERE pet_id = 'amora' ORDER BY feito ASC, data ASC
  `).all<ReminderRow>();
  return {
    source: "d1" as const,
    data: result.results.map((r) => ({ id:r.id, titulo:r.titulo, tipo:r.tipo, data:r.data, emDias:r.em_dias, feito:Boolean(r.feito) })),
  };
});

export const toggleReminder = createServerFn({ method: "POST" })
  .inputValidator((input: { id: string; feito: boolean }) => input)
  .handler(async ({ data }) => {
    const db = await getD1();
    if (!db) return { ok: false, source: "demo" as const };
    await db.prepare("UPDATE lembretes_saude SET feito = ? WHERE id = ?").bind(data.feito ? 1 : 0, data.id).run();
    return { ok: true, source: "d1" as const };
  });

export const getConversations = createServerFn({ method: "GET" }).handler(async () => {
  const db = await getD1();
  if (!db) return { source: "demo" as const, data: fallbackConversas };
  const conversations = await db.prepare(`
    SELECT c.id, p.id AS pet_id, p.nome, t.nome AS tutor, p.foto_url,
      (SELECT texto FROM mensagens m WHERE m.conversa_id = c.id ORDER BY m.enviada_em DESC LIMIT 1) AS previa,
      (SELECT substr(enviada_em, 12, 5) FROM mensagens m WHERE m.conversa_id = c.id ORDER BY m.enviada_em DESC LIMIT 1) AS hora,
      (SELECT COUNT(*) FROM mensagens m WHERE m.conversa_id = c.id AND m.lida = 0 AND m.remetente_pet_id <> 'amora') AS nao_lidas
    FROM conversas c
    JOIN matches mt ON mt.id = c.match_id
    JOIN pets p ON p.id = mt.outro_pet_id
    JOIN tutors t ON t.id = p.tutor_id
    ORDER BY c.criada_em DESC
  `).all<ConversationRow>();

  const data: Conversa[] = [];
  for (const row of conversations.results) {
    const messages = await db.prepare(`
      SELECT CASE WHEN remetente_pet_id = 'amora' THEN 'eu' ELSE 'ele' END AS remetente, texto,
             substr(enviada_em, 12, 5) AS hora
      FROM mensagens WHERE conversa_id = ? ORDER BY enviada_em ASC
    `).bind(row.id).all<{ remetente:"eu"|"ele"; texto:string; hora:string }>();
    data.push({
      id: row.id, petId: row.pet_id, nome: row.nome, tutor: row.tutor,
      foto: row.foto_url ?? row.pet_id, previa: row.previa ?? "", hora: row.hora ?? "",
      naoLidas: Number(row.nao_lidas ?? 0),
      mensagens: messages.results.map((m) => ({ de:m.remetente, texto:m.texto, hora:m.hora })),
    });
  }
  return { source: "d1" as const, data };
});

export const sendMessage = createServerFn({ method: "POST" })
  .inputValidator((input: { conversaId: string; texto: string }) => input)
  .handler(async ({ data }) => {
    const db = await getD1();
    const texto = data.texto.trim().slice(0, 500);
    if (!db || !texto) return { ok: false, source: "demo" as const };
    const id = `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    await db.prepare(`
      INSERT INTO mensagens (id, conversa_id, remetente_pet_id, texto, lida)
      VALUES (?, ?, 'amora', ?, 1)
    `).bind(id, data.conversaId, texto).run();
    return { ok: true, source: "d1" as const, id };
  });

export const getDatabaseStatus = createServerFn({ method: "GET" }).handler(async () => {
  const db = await getD1();
  if (!db) return { connected: false, provider: "Cloudflare D1" as const };
  try {
    await db.prepare("SELECT 1 AS ok").first();
    return { connected: true, provider: "Cloudflare D1" as const };
  } catch {
    return { connected: false, provider: "Cloudflare D1" as const };
  }
});

export const createPet = createServerFn({ method: "POST" })
  .inputValidator((input: {
    nome: string; raca: string; porte: Pet["porte"]; energia: Pet["energia"];
    castrado: boolean; tutorNome: string; tutorEmail: string;
  }) => input)
  .handler(async ({ data }) => {
    const db = await getD1();
    if (!db) return { ok: false, source: "demo" as const };
    const tutorId = "tutor-demo";
    await db.prepare(
      "INSERT OR IGNORE INTO tutors (id, nome, email) VALUES (?, ?, ?)"
    ).bind(tutorId, data.tutorNome.trim().slice(0, 80) || "Tutor", data.tutorEmail.trim().slice(0, 120) || "demo@petplay.app").run();
    const id = `pet-${Date.now()}`;
    await db.prepare(`
      INSERT INTO pets (id, tutor_id, nome, especie, raca, idade, porte, energia, estilo, castrado, vacinado, verificado, bio, foto_url)
      VALUES (?, ?, ?, 'cachorro', ?, 'não informado', ?, ?, 'Corre com bolinha', ?, 0, 0, '', NULL)
    `).bind(id, tutorId, data.nome.trim().slice(0, 80), data.raca.trim().slice(0, 80), data.porte, data.energia, data.castrado ? 1 : 0).run();
    return { ok: true, source: "d1" as const, id };
  });

export const getAchievements = createServerFn({ method: "GET" }).handler(async () => {
  const db = await getD1();
  if (!db) return { source: "demo" as const, data: [] as { id:string; nome:string; descricao:string; emoji:string; progresso:number; meta:number }[] };
  const result = await db.prepare(`
    SELECT id, nome, descricao, COALESCE(emoji, '🏅') AS emoji, progresso, meta
    FROM conquistas WHERE pet_id = 'amora' ORDER BY id
  `).all<{ id:string; nome:string; descricao:string; emoji:string; progresso:number; meta:number }>();
  return { source: "d1" as const, data: result.results };
});
