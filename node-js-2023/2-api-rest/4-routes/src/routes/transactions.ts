import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function transactionsRoutes(app: FastifyInstance) {
  // Hook global (comentado). Poderia ser usado para logar requisições ou autenticação global.
  // app.addHook('preHandler', async (request, reply) => {
  //   console.log(`[${request.method}] ${request.url}`)
  // })

  // Rota GET /
  app.get(
    '/',
    {
      // preHandler local da rota (hook antes do handler).
      // Aqui usamos o middleware checkSessionIdExists para garantir que sessionId existe.
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies

      const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select()

      return { transactions }
    },
  )

  // Rota GET /:id
  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      // Validação do path param `id` com Zod.
      const getTransactionsParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getTransactionsParamsSchema.parse(request.params)

      const { sessionId } = request.cookies

      const transaction = await knex('transactions')
        .where({
          session_id: sessionId,
          id,
        })
        .first()

      return {
        transaction,
      }
    },
  )

  // Rota GET /summary
  app.get(
    '/summary',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies

      const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount' })
        .first()

      return { summary }
    },
  )

  // Rota POST /
  app.post('/', async (request, reply) => {
    // Validação do corpo da requisição com Zod.
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    let sessionId = request.cookies.sessionId

    // Se não existir sessionId, gera um novo UUID e seta um cookie usando reply.setCookie (API do Fastify).
    if (!sessionId) {
      sessionId = randomUUID()

      reply.setCookie('sessionId', sessionId, {
        path: '/', // Cookie disponível para toda a aplicação.
        maxAge: 60 * 60 * 24 * 7, // Expira em 7 dias (em segundos).
      })
    }

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    // reply.status(201).send() — resposta com status HTTP 201 (Created).
    return reply.status(201).send()
  })
}
