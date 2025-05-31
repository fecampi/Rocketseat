import { Database } from './database.js';

async function test() {
  const db = new Database();

  // Aguarda um pouco 
  await new Promise(resolve => setTimeout(resolve, 100));

  // Inserir novo registro na tabela 'users'
  const newUser = db.insert('users', { id: "1", name: 'Alice', email: 'alice@example.com' });
  console.log('Inserido:', newUser);

  // Buscar usuários que contenham 'ali' no nome ou email
  const foundUsers = db.select('users', { name: 'Ali' });
  console.log('Buscados:', foundUsers);

  // Atualizar usuário com id 1
  db.update('users', "1", { name: 'Alice Updated', email: 'alice.updated@example.com' });
  console.log('Atualizado:', db.select('users', { id: "1" }));

  // Deletar usuário com id 1
  db.delete('users', "1");
  console.log('Após exclusão:', db.select('users'));
}

test()