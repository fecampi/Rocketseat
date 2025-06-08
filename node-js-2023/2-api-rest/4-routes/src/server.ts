import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

// Criação da instância do Fastify.
const app = fastify()

// Registro do plugin de cookies (Fastify plugin system).
// Isso adiciona suporte a request.cookies e reply.setCookie.
app.register(cookie)

// Registro do grupo de rotas transactionsRoutes, com o prefixo 'transactions'.
// As rotas ficarão disponíveis em /transactions/... .
app.register(transactionsRoutes, {
  prefix: 'transactions',
})

// Hook global preHandler: executa antes de toda requisição.
// Aqui estamos logando o método e a URL da requisição.
// app.addHook('preHandler', async (request, reply) => {
//   console.log(`[${request.method}] ${request.url}`)
// })

// Inicialização do servidor Fastify.
// A porta vem da env.PORT (configuração via variável de ambiente).
app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
