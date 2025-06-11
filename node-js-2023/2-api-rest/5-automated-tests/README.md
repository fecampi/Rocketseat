
# API REST com Node.js e Fastify

## Sobre este projeto

Este projeto é uma API REST desenvolvida com **Node.js** utilizando o framework **Fastify**. Durante o desenvolvimento, foram estudados conceitos importantes como **Fastify Hooks**, **middlewares**, **validação com Zod** e uso das APIs de resposta do Fastify.

---
## 📖 Conceitos

### Requisitos Funcionais (RF)

👉 **O que são?**  
Os requisitos funcionais definem *o que o sistema deve fazer*, ou seja, as funcionalidades que ele precisa oferecer aos usuários.

### Regras de Negócio (RN)

👉 **O que são?**  
As regras de negócio determinam as **condições e restrições** que devem ser respeitadas, garantindo que as operações estejam de acordo com o contexto do negócio.

### Requisitos Não Funcionais (RNF)

👉 **O que são?**  
Os requisitos não funcionais descrevem **qualidades e características técnicas** esperadas do sistema, como desempenho, segurança, disponibilidade, entre outras.

---

## ✅ Funcionalidades e Requisitos

### Requisitos Funcionais (RF)

- [x] O usuário deve poder criar uma nova transação;
- [x] O usuário deve poder obter um resumo da sua conta;
- [x] O usuário deve poder listar todas transações que já ocorreram;
- [x] O usuário deve poder visualizar uma transação única;

### Regras de Negócio (RN)

- [x] A transação pode ser do tipo **crédito**, que **somará ao saldo total**, ou **débito**, que **subtrairá** do saldo;
- [x] Deve ser possível identificar o usuário em cada requisição (ex: autenticação via token);
- [x] O usuário só pode visualizar transações que ele mesmo criou;

### Requisitos Não Funcionais (RNF)

- [x] As APIs devem ser autenticadas utilizando cookie de sessão para controle de acesso;
- [x] O sistema deve permitir múltiplos usuários simultâneos sem interferência nos dados (isolamento de dados por cookie de sessão);

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

