# Pet&Play Aplicativo 

> **Projeto proprietário.** Repositório público apenas para consulta e demonstração. Uso, cópia ou reprodução da ideia, do código ou da arquitetura sem autorização por escrito do autor não são permitidos — veja [LICENSE](LICENSE).

PROJETO DE APLICATIVO MOBILE: "PetMatch & Play" (Nome Provisório)

OBJETIVO DO PRODUTO:

Desenvolver um aplicativo mobile altamente dinâmico, moderno e focado na socialização pet ("Dog Dates"), encontros para passeios e cruzamento responsável, resolvendo as dores de falta de segurança e incompatibilidade observadas no mercado.

PUBLICO-ALVO (BASEADO EM PESQUISA DE MERCADO):

- 71% tutores de cães; 15% gatos; 9% ambos.

- 63,6% buscam amizades/passeios (Dog Dates); 27,3% buscam ambos (socialização e cruzamento).

- Principais preocupações: Carteira de vacinação/saúde, temperamento do pet e segurança no chat.

ESTRUTURA DE TELAS E FLUXOS PRINCIPAIS:

1. ONBOARDING E CADASTRO:

   - Cadastro do Tutor + Ficha Completa do Pet (Foto, Raça, Porte, Nível de Energia, Status de Castração, Vacinas).

   - Envio da Carteira de Vacinação para obter o badge "Selo de Saúde Verificada".

2. TELA PRINCIPAL (Navegação/Match):

   - Modos alternáveis: [Modo Socialização / Dog Date] vs [Modo Reprodução / Raça].

   - Cards dinâmicos no estilo "Swipe" exibindo fotos, distância, porte, nível de energia e selos de verificação.

3. MAPA INTERATIVO (Pet Points):

   - Exibição de locais dog friendly na região e check-in de tutores em tempo real para encontros espontâneos.

4. CHAT E SEGURANÇA:

   - Chat interno habilitado após o Match, com lembretes de segurança para encontros em locais neutros.

5. AVALIAÇÕES E REPUTAÇÃO:

   - Sistema de feedback rápido pós-encontro sobre a experiência e comportamento do pet.

MONETIZAÇÃO:

- Modelo Freemium com anúncios nativos + Assinatura Premium de baixo custo para desbloqueio do Selo de Vacinação, filtros comportamentais avançados e curtidas ilimitadas.

DIRETRIZES DE DESIGN (UI/UX):

- Interface leve, alegre, colorida e fluida, priorizando imagens de alta qualidade dos pets e navegação simples com uma mão.

This project was built with [Lovable](https://lovable.dev).

## Documentação acadêmica

- [Diagramas UML e modelo lógico do banco](docs/uml.md)
- [DDL do banco SQLite](database/schema.sql)
- [DML com dados de demonstração](database/seed.sql)

O aplicativo atual é um protótipo frontend: as telas usam dados em memória e ainda não se conectam ao banco. O schema e os dados SQL são artefatos executáveis da modelagem proposta para o MVP.

Para criar e preencher o banco local usando SQLite:

```sh
sqlite3 petplay.db < database/schema.sql
sqlite3 petplay.db < database/seed.sql
```

## Build with Lovable


- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
