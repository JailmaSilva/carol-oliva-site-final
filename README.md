# Carol Oliva Fotografia — Seleção & Entrega
Projeto com **frontend (Next.js)** no Netlify e **backend (Express)** com MongoDB + S3.

## Passo a passo rápido
1) **Backend**
   - Preencha `backend/.env` com suas credenciais (Mongo, JWT, Instagram OAuth, AWS S3).
   - `cd backend && npm install && npm run dev`
   - O backend inicia em `http://localhost:4000`.

2) **Frontend**
   - `cd frontend && npm install`
   - Crie um arquivo `.env.local` em `frontend` com:
     ```
     NEXT_PUBLIC_API_URL=http://localhost:4000
     ```
   - `npm run dev` (em `frontend`) e acesse `http://localhost:3000`.

3) **Deploy**
   - Frontend no **Netlify** configurando `NEXT_PUBLIC_API_URL` apontando para o backend público.
   - Backend em provedor de sua preferência (Render, Railway, Vercel Functions, etc.).

> Este é um boilerplate funcional e simples para iniciar. Ajuste design, permissões e fluxos conforme sua necessidade.
