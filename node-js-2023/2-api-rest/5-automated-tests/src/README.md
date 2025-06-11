
# API REST com Node.js e Fastify

## Sobre este projeto

Este projeto é uma API REST desenvolvida com **Node.js** utilizando o framework **Fastify**. Durante o desenvolvimento, foram estudados conceitos importantes como **Fastify Hooks**, **middlewares**, **validação com Zod** e uso das APIs de resposta do Fastify.

---

## Conteúdo estudado

### 1. Fastify Hooks

- **preHandler**: Hook que pode ser configurado globalmente (comentado no projeto) ou localmente nas rotas. Ele é executado antes do handler da rota, permitindo validações e autenticações.

### 2. Middlewares

- Middleware personalizado **checkSessionIdExists** utilizado como **preHandler** para rotas protegidas. Serve para validar a existência do cookie de sessão e garantir segurança.

### 3. Validação com Zod

- Utilizado para validar dados de entrada:
  - **params** da rota GET `/transactions/:id`
  - **body** da rota POST `/transactions`

### 4. Fastify Reply API

- **reply.setCookie()**: usado para criar e configurar cookies de sessão.
- **reply.status().send()**: controla o status HTTP e envia a resposta.

---

## Perguntas e respostas estudadas

| Pergunta | Resposta correta |
| -------- | ---------------- |
| No Fastify, como configuramos rotas com um path em comum? | Utilizando o método `register` para registrar um plugin que contém todas as rotas com o mesmo path |
| Para que serve o termo `declare module` no TypeScript? | Para declarar módulos personalizados |
| Como criar tipos personalizados para representar tabelas e colunas no TypeScript? | Escrevendo manualmente as definições de tipos |
| Como acessar cookies enviados por um cliente no Fastify? | `request.cookies` |
| É possível configurar opções para os Cookies ao escrever um cookie no Fastify? | Sim, passando um objeto com as opções como terceiro parâmetro da função |
| O que é o `preHandler` no Fastify? | Uma função que é executada antes de uma rota |
| Os contextos dentro de um plugin no Fastify são isolados entre eles? | Verdadeiro |
| O que são Hooks no contexto do Fastify? | Funções que são executadas de acordo ao hook configurado |

---

## Organização dos arquivos

```
src/
├── env.ts                 # Configurações e variáveis de ambiente
├── routes/
│   └── transactions.ts    # Rotas relacionadas a transações (GET, POST, etc)
├── middlewares/
│   └── checkSessionIdExists.ts  # Middleware para validação do cookie de sessão
├── plugins/
│   └── fastifyCookie.ts   # Plugin para registrar o cookie no Fastify
├── app.ts                 # Instancia o Fastify, registra plugins, rotas e hooks
└── server.ts              # Responsável por iniciar o servidor HTTP
```

---

## Exemplo rápido do uso dos hooks e middlewares

```ts
// Middleware exemplo (middlewares/checkSessionIdExists.ts)
export async function checkSessionIdExists(request, reply) {
  const sessionId = request.cookies.sessionId;
  if (!sessionId) {
    return reply.status(401).send({ error: 'Unauthorized' });
  }
}
```

```ts
// Rota protegida usando preHandler local
fastify.get('/transactions', { preHandler: checkSessionIdExists }, async (request, reply) => {
  // lógica da rota
});
```

---

## Instruções para rodar

1. Instale as dependências:

```bash
npm install
```

2. Configure as variáveis de ambiente em `.env`

3. Rode o servidor:

```bash
npm run dev
```

---

## Tecnologias utilizadas

- Node.js
- Fastify
- Zod (validação)
- TypeScript

---

Se precisar de ajuda, só avisar! 🚀
