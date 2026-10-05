-- Pet&Play MVP - Cloudflare D1 / SQLite schema
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS tutors (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telefone TEXT,
  cidade TEXT,
  criado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pets (
  id TEXT PRIMARY KEY,
  tutor_id TEXT NOT NULL REFERENCES tutors(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  especie TEXT NOT NULL DEFAULT 'cachorro',
  raca TEXT,
  idade TEXT,
  porte TEXT NOT NULL CHECK (porte IN ('Pequeno','Médio','Grande')),
  energia TEXT NOT NULL CHECK (energia IN ('Baixa','Média','Alta')),
  estilo TEXT NOT NULL,
  castrado INTEGER NOT NULL DEFAULT 0 CHECK (castrado IN (0,1)),
  vacinado INTEGER NOT NULL DEFAULT 0 CHECK (vacinado IN (0,1)),
  verificado INTEGER NOT NULL DEFAULT 0 CHECK (verificado IN (0,1)),
  bio TEXT,
  foto_url TEXT,
  latitude REAL,
  longitude REAL,
  criado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS matches (
  id TEXT PRIMARY KEY,
  pet_id TEXT NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  outro_pet_id TEXT NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  modo TEXT NOT NULL CHECK (modo IN ('social','reproducao')),
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente','aceito','recusado','encerrado')),
  criado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(pet_id, outro_pet_id)
);

CREATE TABLE IF NOT EXISTS conversas (
  id TEXT PRIMARY KEY,
  match_id TEXT NOT NULL UNIQUE REFERENCES matches(id) ON DELETE CASCADE,
  criada_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mensagens (
  id TEXT PRIMARY KEY,
  conversa_id TEXT NOT NULL REFERENCES conversas(id) ON DELETE CASCADE,
  remetente_pet_id TEXT NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  texto TEXT NOT NULL,
  lida INTEGER NOT NULL DEFAULT 0 CHECK (lida IN (0,1)),
  enviada_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pet_points (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  tipo TEXT NOT NULL,
  descricao TEXT,
  distancia TEXT,
  latitude REAL,
  longitude REAL,
  ativo INTEGER NOT NULL DEFAULT 1 CHECK (ativo IN (0,1))
);

CREATE TABLE IF NOT EXISTS checkins (
  id TEXT PRIMARY KEY,
  pet_id TEXT NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  pet_point_id TEXT NOT NULL REFERENCES pet_points(id) ON DELETE CASCADE,
  criado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lembretes_saude (
  id TEXT PRIMARY KEY,
  pet_id TEXT NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('Vacina','Vermífugo','Antipulgas','Consulta')),
  data TEXT NOT NULL,
  em_dias INTEGER,
  feito INTEGER NOT NULL DEFAULT 0 CHECK (feito IN (0,1))
);

CREATE TABLE IF NOT EXISTS conquistas (
  id TEXT PRIMARY KEY,
  pet_id TEXT NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  descricao TEXT NOT NULL,
  emoji TEXT,
  progresso INTEGER NOT NULL DEFAULT 0,
  meta INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS avaliacoes (
  id TEXT PRIMARY KEY,
  encontro_id TEXT,
  avaliador_tutor_id TEXT NOT NULL REFERENCES tutors(id) ON DELETE CASCADE,
  avaliado_pet_id TEXT NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  nota INTEGER NOT NULL CHECK (nota BETWEEN 1 AND 5),
  comentario TEXT,
  criado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_pets_tutor ON pets(tutor_id);
CREATE INDEX IF NOT EXISTS idx_pets_energia ON pets(energia);
CREATE INDEX IF NOT EXISTS idx_pets_porte ON pets(porte);
CREATE INDEX IF NOT EXISTS idx_matches_pet ON matches(pet_id);
CREATE INDEX IF NOT EXISTS idx_matches_outro_pet ON matches(outro_pet_id);
CREATE INDEX IF NOT EXISTS idx_mensagens_conversa ON mensagens(conversa_id, enviada_em);
CREATE INDEX IF NOT EXISTS idx_checkins_point ON checkins(pet_point_id, criado_em);
CREATE INDEX IF NOT EXISTS idx_lembretes_pet ON lembretes_saude(pet_id, data);
