import { Knex } from 'knex'

// Função 'up': define as operações que serão executadas ao aplicar a migration
export async function up(knex: Knex): Promise<void> {
  // Altera a tabela 'transactions'
  await knex.schema.alterTable('transactions', (table) => {
    // Adiciona uma nova coluna 'session_id' do tipo UUID
    // O método 'after' (quando suportado pelo banco) posiciona a coluna após 'id'
    // Cria também um índice para acelerar buscas por 'session_id'
    table.uuid('session_id').after('id').index()
  })
}

// Função 'down': define como reverter a migration (rollback)
export async function down(knex: Knex): Promise<void> {
  // Altera a tabela 'transactions' para remover a coluna 'session_id'
  await knex.schema.alterTable('transactions', (table) => {
    table.dropColumn('session_id')
  })
}
