const BASE_URL = 'http://localhost:3000/users';

async function createUser(user) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  const data = await res.json();
  console.log('Usuário criado:', data);
}

async function listUsers() {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  console.log('Lista de usuários:', data);
}

async function updateUser(id, updates) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  console.log('Usuário atualizado:', data);
}

async function deleteUser(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  console.log(`Usuário ${id} removido com status ${res.status}`);
}

export async function runClient() {
  await createUser({ name: 'João', email: 'joao@email.com' });
  await createUser({ name: 'Maria', email: 'maria@email.com' });

  await listUsers();

  await updateUser(1, { name: 'João Silva' });

  await deleteUser(2);

  await listUsers();
}
