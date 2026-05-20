# 🧩 Hackerstore

[![Backend](https://img.shields.io/badge/backend-Spring%20Boot-blue?logo=springboot)](backend)
[![Frontend](https://img.shields.io/badge/frontend-Angular%2021-orange?logo=angular)](frontend)
[![Java](https://img.shields.io/badge/java-17-informational?logo=java)](https://www.oracle.com/java/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Uma aplicação exemplo (loja) com backend em Spring Boot e frontend em Angular (standalone components). O propósito deste repositório é demonstrar autenticação JWT, operações CRUD de produtos e separação de privilégios (admin vs usuário comum).

---

## 🚀 Visão geral

- **Backend:** Java + Spring Boot (REST, Spring Security, JWT)
- **Frontend:** Angular v21 (standalone components, HttpClient, Guards, Interceptors)

Ports padrão:
- Frontend: `http://localhost:4200`
- Backend: `http://localhost:8080`

---

## Estrutura do repositório

- `/backend` — código Java Spring Boot
  - `src/main/java/hacker/store/hackerstore` — código fonte
  - segurança: `infra/security` (filtros, token service, configurações)
- `/frontend` — código Angular
  - `src/app` — components, services e rotas

---

## 🧭 Endpoints principais (backend)

- `POST /auth/login` — Autenticação
  - Request JSON: `{ "login": "isaquelael", "password": "..." }`
  - Response JSON: `{ "token": "<JWT>", "user": { "login": "isaquelael", "role": "ADMIN" } }`

- `POST /auth/register` — Registrar usuário (requer ROLE_ADMIN no backend)

- `GET /produto` — Listar produtos (público)
- `POST /produto` — Criar produto (ADMIN)
- `PUT /produto/{id}` — Atualizar produto (ADMIN)
- `DELETE /produto/{id}` — Excluir produto (ADMIN)

> Observação: O backend usa JWT e valida o token via header `Authorization: Bearer <token>`.

---

## 🧩 Como executar (local)

### Backend (Windows / Linux / macOS)

```bash
cd backend/hackerstore
./mvnw spring-boot:run    # (Windows: mvnw.cmd spring-boot:run)
```

### Frontend

```bash
cd frontend
npm install
npm start   # ou ng serve
```

Abra o navegador em `http://localhost:4200`.

---

## 🔐 Autenticação (frontend)

- O frontend envia `{ login, password }` para `POST http://localhost:8080/auth/login`.
- Ao receber o `token`, o frontend salva em `localStorage` como `auth_token`.
- Um `JwtInterceptor` adiciona `Authorization: Bearer <token>` nas requisições subsequentes.
- `AuthService` expõe `isAdmin()` para condicionar ações administrativas na UI.

Se o usuário estiver autenticado e com role `ADMIN`, verá os botões de adicionar/editar/excluir produtos. Usuários anônimos apenas visualizam.

---

## 👩‍💻 Criar usuário administrador

O endpoint `POST /auth/register` exige ROLE_ADMIN (apenas admins criam usuários). Para criar o primeiro administrador existem duas opções:

1. Inserir diretamente no banco (ex.: script SQL) um usuário com `role = ADMIN` e senha `BCrypt` encoded.
2. Temporariamente alterar a configuração de segurança para permitir registro público, criar o admin e voltar a proteção.

Exemplo de payload (se o endpoint estiver disponível):

```json
{
  "login": "isaquelael",
  "password": "sua_senha",
  "role": "ADMIN"
}
```

---

## 🧾 Notas importantes

- CORS: o backend permite chamadas do frontend (`http://localhost:4200`) e o Security está configurado para aceitar requisições `OPTIONS` (pré-voo).
- Senhas são armazenadas usando `BCryptPasswordEncoder` no backend.
- Tokens expiram de acordo com a configuração em `TokenService`.

---

## 🧰 Desenvolvimento e testes

- Backend: use `mvnw test` para rodar testes unitários (se existirem).
- Frontend: `npm test` / `ng test` para executar testes.

---

## ✍️ Contribuição

Abra issues ou PRs. Boas contribuições incluem:

- Ajustes de documentação
- Melhorias na experiência do login/UX
- Tests unitários e e2e

---

## 📬 Contato

Crie uma issue no repositório para feedbacks, dúvidas ou relatórios de bug.


