// Importa o tipo Knex para garantir tipagem nas funções de migration
import { Knex } from 'knex'

// Função 'up': define as operações que serão executadas ao aplicar a migration
export async function up(knex: Knex): Promise<void> {
  // Cria uma nova tabela chamada 'transactions'
  await knex.schema.createTable('transactions', (table) => {
    // Coluna 'id' do tipo UUID, usada como chave primária
    table.uuid('id').primary()

    // Coluna 'title' do tipo texto, que não permite valores nulos
    table.text('title').notNullable()

    // Coluna 'amount' do tipo decimal, com precisão de até 10 dígitos e 2 casas decimais
    // Não permite valores nulos
    table.decimal('amount', 10, 2).notNullable()

    // Coluna 'created_at' do tipo timestamp
    // Valor padrão é a data/hora atual (knex.fn.now())
    // Não permite valores nulos
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

// Função 'down': define como reverter a migration (rollback)
// Neste caso, simplesmente remove a tabela 'transactions'
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('transactions')
}
