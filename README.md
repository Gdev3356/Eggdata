# 🥚 EggData: Sistema de Gestão do Império Eggman

## 🎯 Objetivo do Projeto
O **EggData** é uma API RESTful desenvolvida para gerenciar as operações secretas, os recrutas e os alvos do Dr. Eggman do universo do Sonic. O sistema foi projetado para garantir que planos malignos sejam mantidos em sigilo por meio de uma rigorosa hierarquia de patentes militares, evitando que recrutas e robôs de baixo nível acessem projetos confidenciais.

Este projeto foi desenvolvido como requisito para a disciplina de Java Advanced, aplicando conceitos da arquitetura REST, persistência de dados com o Spring Data JPA e regras de negócio complexas.

---

## 👥 Integrantes
- **Gustavo Keiji Okada** – RM: 563428 – Turma: 2TDSPG
- **Luna de Carvalho Guimarães** – RM: 562290 – Turma: 2TDSPG

---

## 🚀 Endpoints Principais

### 👤 Usuários (Users)
- `GET /users` – Listar todos os membros (paginado)
- `POST /users` – Registrar novo recruta ou robô
- `GET /users/{id}` – Detalhes de um membro específico

### 🧠 Planos Malignos (Plans) *(Requer Header `X-User-Id`)*
- `GET /plans` – Listar planos permitidos para a patente do usuário
- `POST /plans` – Criar nova operação estratégica
- `PUT /plans/{id}` – Atualizar detalhes (apenas criador ou Egg-Master)
- `DELETE /plans/{id}` – Abortar plano (apenas criador ou Egg-Master)

### 🎯 Alvos e Oponentes (Opponents)
- `GET /opponents` – Listar todos os alvos registrados
- `PATCH /opponents/{id}/status` – Atualizar situação (Capturado, Eliminado, etc)

#### 🔍 Filtros de busca:
- `/opponents?name=sonic` – Busca por nome
- `/opponents?species=hedgehog` – Busca por espécie
- `/opponents?age=15` – Busca por idade

---

## 🗂️ Entidades Principais
O banco de dados relacional gerencia três pilares do Império:

- **User (Usuários):** Representa os membros do império (Dr. Eggman, robôs, generais). Cada usuário possui um `UserRank` que dita seu nível de acesso.
- **Plans (Planos Malignos):** As operações em andamento. Possuem um nível de ameaça, um criador e uma lista de alvos.
- **Opponent (Oponentes):** O ouriço e seus aliados. O sistema cataloga a espécie do oponente, seu nível de poder, suas fraquezas e o status atual (Vivo, Capturado, etc).

---

## 🔒 Funcionamento Básico e Regras de Negócio (Sistema de Patentes)
Para garantir a segurança dos dados do Império, a API implementa uma lógica de autorização baseada no `UserRank`:

- **EGG_MASTER:** Acesso total e irrestrito. Pode visualizar, editar e deletar qualquer plano de qualquer usuário
- **GENERAL, ROBOT e RECRUIT:** Só podem visualizar planos com nível de ameaça igual ou inferior à sua própria patente. Tentativas acima disso resultam em bloqueio
- Apenas o próprio criador do plano (ou o Líder Supremo) pode modificá-lo ou deletá-lo

---

## 🔍 Consultas e Filtros Estratégicos
A API disponibiliza endpoints de paginação e filtros específicos, tais como:

- Busca de usuários por `userName`
- Listagem de planos filtrados pelas patentes acessíveis do requisitante
- Busca de planos específicos de um criador
- Rastreamento de oponentes por *nome* (ignorando case), *espécie* ou *idade*

---

## 🛠️ Como Rodar o Projeto

1. **Clonar o repositório** e abrir na sua IDE (IntelliJ/VSCode)

2. **Executar a aplicação**:  
   O `DbSeeder` criará automaticamente o usuário `eggman` (ID 1).  
   Obviamente, o Dr. Eggman merece ser o primeiro a ser criado em seu próprio sistema 😄

3. **Importar o arquivo de requisições**:
   - Abra o Insomnia
   - Clique em `Import` → `File`
   - Selecione o arquivo `EggmanEmpire_API_Requests.json` na raiz do projeto

4. **Testar os Planos**:
   - As requisições exigem o header `X-User-Id`
   - O valor padrão configurado é `1` (Dr. Eggman)  