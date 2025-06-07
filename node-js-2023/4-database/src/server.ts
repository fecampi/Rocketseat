import { knex } from './database'
import { randomUUID } from 'crypto'

async function main() {
  // 1. Criar
  const id = randomUUID()
  const sessionId = randomUUID()
  await knex('transactions').insert({
    id,
    title: 'Compra de Curso',
    amount: 1000,
    session_id: sessionId,
  })

  // 2. Listar por amount
  const byAmount = await knex('transactions').where('amount', 1000).select('*')
  console.log('por amount:', byAmount)

  // 3. Listar por session_id
  const bySession = await knex('transactions')
    .where('session_id', sessionId)
    .select('*')
  console.log('por session:', bySession)

  // 4. Atualizar title
  await knex('transactions')
    .where('id', id)
    .update({ title: 'Curso Atualizado' })

  // 5. Deletar amount < 100
  await knex('transactions').where('amount', '<', 100).del()

  // 6. Mostrar tudo
  const all = await knex('transactions').select('*')
  console.log('tudo:', all)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
