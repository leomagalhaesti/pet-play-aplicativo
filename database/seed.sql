-- Dados iniciais mínimos para desenvolvimento/demo do MVP.
INSERT OR IGNORE INTO tutors (id, nome, email, cidade) VALUES
  ('tutor-demo', 'Marina', 'demo@petplay.app', 'Salvador');

INSERT OR IGNORE INTO pets
  (id, tutor_id, nome, especie, raca, idade, porte, energia, estilo, castrado, vacinado, verificado, bio)
VALUES
  ('biscuit', 'tutor-demo', 'Biscuit', 'cachorro', 'Golden Retriever', '1 ano', 'Médio', 'Alta', 'Corre com bolinha', 1, 1, 1, 'Adora correr atrás de bolinha e fazer amigos no parque.');

INSERT OR IGNORE INTO pet_points (id, nome, tipo, descricao) VALUES
  ('p1', 'Parque das Patas', 'Parque dog friendly', 'Área para passeios e encontros.'),
  ('p2', 'Café Au Lait Pet', 'Café pet friendly', 'Café com espaço para pets.'),
  ('p3', 'Praça do Focinho', 'Praça com área cercada', 'Área cercada para socialização.'),
  ('p4', 'Vet Amigo 24h', 'Clínica veterinária', 'Atendimento veterinário 24 horas.');
