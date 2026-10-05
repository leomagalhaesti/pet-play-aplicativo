-- Dados demo completos do MVP.
INSERT OR IGNORE INTO tutors (id, nome, email, cidade) VALUES
  ('tutor-demo', 'Marina', 'demo@petplay.app', 'Salvador');

INSERT OR IGNORE INTO pets
  (id, tutor_id, nome, especie, raca, idade, porte, energia, estilo, castrado, vacinado, verificado, bio, foto_url)
VALUES
  ('biscuit','tutor-demo','Biscuit','cachorro','Golden Retriever','1 ano','Médio','Alta','Corre com bolinha',1,1,1,'Adora correr atrás de bolinha e fazer amigos no parque.','pet-1'),
  ('nina','tutor-demo','Nina','cachorro','Border Collie','3 anos','Médio','Alta','Brinca forte',0,1,1,'Pedigree completo, exames em dia. Busca cruzamento responsável.','pet-2'),
  ('tico','tutor-demo','Tico','cachorro','Bulldog Francês','2 anos','Pequeno','Média','Explorador tranquilo',1,1,0,'Tranquilo, curte passeios curtos e sombra fresquinha.','pet-3'),
  ('mel','tutor-demo','Mel','gato','Vira-lata Caramelo (gata)','4 anos','Pequeno','Baixa','Calmo/Idoso',0,1,1,'Sociável com outros gatos, encontros só em casa dos tutores.','pet-4');

INSERT OR IGNORE INTO matches (id, pet_id, outro_pet_id, modo, status) VALUES
  ('m1','biscuit','biscuit','social','aceito'),
  ('m2','biscuit','nina','reproducao','aceito'),
  ('m3','biscuit','tico','social','aceito');

INSERT OR IGNORE INTO conversas (id, match_id) VALUES
  ('c1','m1'),('c2','m2'),('c3','m3');

INSERT OR IGNORE INTO mensagens (id, conversa_id, remetente_pet_id, texto, lida, enviada_em) VALUES
  ('msg1','c1','biscuit','Oi Marina! Eles têm a mesma energia, vai ser divertido.',1,'2026-10-05 17:51:00'),
  ('msg2','c1','biscuit','Bora no Parque das Patas amanhã 9h?',1,'2026-10-05 18:02:00'),
  ('msg3','c2','nina','Posso enviar os exames da Nina hoje.',0,'2026-10-04 18:02:00'),
  ('msg4','c3','tico','O Tico prefere passeios no fim da tarde 🌇',1,'2026-10-02 18:02:00');

INSERT OR IGNORE INTO pet_points (id, nome, tipo, descricao, distancia, x, y) VALUES
  ('p1','Parque das Patas','Parque dog friendly','Área para passeios e encontros.','600 m',32,28),
  ('p2','Café Au Lait Pet','Café pet friendly','Café com espaço para pets.','1,1 km',68,44),
  ('p3','Praça do Focinho','Praça com área cercada','Área cercada para socialização.','1,8 km',46,68),
  ('p4','Vet Amigo 24h','Clínica veterinária','Atendimento veterinário 24 horas.','2,3 km',78,76);

INSERT OR IGNORE INTO lembretes_saude (id, pet_id, titulo, tipo, data, em_dias, feito) VALUES
  ('l1','biscuit','Antipulgas mensal','Antipulgas','22 set',2,0),
  ('l2','biscuit','Vermífugo (dose única)','Vermífugo','05 out',15,0),
  ('l3','biscuit','Reforço V10','Vacina','18 out',28,0),
  ('l4','biscuit','Antirrábica anual','Vacina','12 ago',-39,1),
  ('l5','biscuit','Check-up no Vet Amigo','Consulta','30 nov',71,0);

INSERT OR IGNORE INTO conquistas (id, pet_id, nome, descricao, emoji, progresso, meta) VALUES
  ('a1','biscuit','Explorador de Parques','Visite 5 pet points credenciados','🌳',5,5),
  ('a2','biscuit','Sociável do Bairro','Faça amizade com 8 pets diferentes','🐾',6,8),
  ('a3','biscuit','10 Encontros Realizados','Complete 10 dog dates','🏅',10,10),
  ('a4','biscuit','Focinho Saudável','Mantenha vacinas em dia por 12 meses','💚',9,12),
  ('a5','biscuit','Café com Patas','Check-in em 3 cafés pet friendly','☕',1,3);
