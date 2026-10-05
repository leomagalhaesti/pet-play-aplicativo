-- Dados demo completos do MVP.
INSERT OR IGNORE INTO tutors (id, nome, email, cidade) VALUES
  ('tutor-demo', 'Leonardo', 'demo@petplay.app', 'Salvador');

INSERT OR IGNORE INTO pets
  (id, tutor_id, nome, especie, raca, idade, porte, energia, estilo, castrado, vacinado, verificado, bio, foto_url)
VALUES
  ('amora','tutor-demo','Amora','cachorro','SRD','3 anos','Médio','Média','Corre com bolinha',1,1,1,'Sociável, calma com filhotes e apaixonada por passeios.','pet-1'),
  ('biscuit','tutor-demo','Biscuit','cachorro','Golden Retriever','1 ano','Médio','Alta','Corre com bolinha',1,1,1,'Adora correr atrás de bolinha e fazer amigos no parque.','pet-1'),
  ('nina','tutor-demo','Nina','cachorro','Border Collie','3 anos','Médio','Alta','Brinca forte',0,1,1,'Pedigree completo, exames em dia. Busca cruzamento responsável.','pet-2'),
  ('tico','tutor-demo','Tico','cachorro','Bulldog Francês','2 anos','Pequeno','Média','Explorador tranquilo',1,1,0,'Tranquilo, curte passeios curtos e sombra fresquinha.','pet-3'),
  ('mel','tutor-demo','Mel','gato','Vira-lata Caramelo (gata)','4 anos','Pequeno','Baixa','Calmo/Idoso',0,1,1,'Sociável com outros gatos, encontros só em casa dos tutores.','pet-4');

INSERT OR IGNORE INTO matches (id, pet_id, outro_pet_id, modo, status) VALUES
  ('m1','amora','biscuit','social','aceito'),
  ('m2','amora','nina','reproducao','aceito'),
  ('m3','amora','tico','social','aceito');

INSERT OR IGNORE INTO conversas (id, match_id) VALUES
  ('c1','m1'),('c2','m2'),('c3','m3');

INSERT OR IGNORE INTO mensagens (id, conversa_id, remetente_pet_id, texto, lida, enviada_em) VALUES
  ('msg1','c1','biscuit','Oi! O Biscuit amou o perfil da sua pet 🐾',0,'2026-10-05 17:44:00'),
  ('msg2','c1','amora','Oi Marina! Eles têm a mesma energia, vai ser divertido.',1,'2026-10-05 17:51:00'),
  ('msg3','c1','biscuit','Bora no Parque das Patas amanhã 9h?',0,'2026-10-05 18:02:00'),
  ('msg4','c2','nina','Posso enviar os exames da Nina hoje.',1,'2026-10-04 18:02:00'),
  ('msg5','c3','tico','O Tico prefere passeios no fim da tarde 🌇',1,'2026-10-02 18:02:00');

INSERT OR IGNORE INTO pet_points (id, nome, tipo, descricao, distancia, x, y) VALUES
  ('p1','Parque das Patas','Parque dog friendly','Área para passeios e encontros.','600 m',32,28),
  ('p2','Café Au Lait Pet','Café pet friendly','Café com espaço para pets.','1,1 km',68,44),
  ('p3','Praça do Focinho','Praça com área cercada','Área cercada para socialização.','1,8 km',46,68),
  ('p4','Vet Amigo 24h','Clínica veterinária','Atendimento veterinário 24 horas.','2,3 km',78,76);

INSERT OR IGNORE INTO lembretes_saude (id, pet_id, titulo, tipo, data, em_dias, feito) VALUES
  ('l1','amora','Antipulgas mensal','Antipulgas','22 set',2,0),
  ('l2','amora','Vermífugo (dose única)','Vermífugo','05 out',15,0),
  ('l3','amora','Reforço V10','Vacina','18 out',28,0),
  ('l4','amora','Antirrábica anual','Vacina','12 ago',-39,1),
  ('l5','amora','Check-up no Vet Amigo','Consulta','30 nov',71,0);

INSERT OR IGNORE INTO conquistas (id, pet_id, nome, descricao, emoji, progresso, meta) VALUES
  ('a1','amora','Explorador de Parques','Visite 5 pet points credenciados','🌳',5,5),
  ('a2','amora','Sociável do Bairro','Faça amizade com 8 pets diferentes','🐾',6,8),
  ('a3','amora','10 Encontros Realizados','Complete 10 dog dates','🏅',10,10),
  ('a4','amora','Focinho Saudável','Mantenha vacinas em dia por 12 meses','💚',9,12),
  ('a5','amora','Café com Patas','Check-in em 3 cafés pet friendly','☕',1,3);
