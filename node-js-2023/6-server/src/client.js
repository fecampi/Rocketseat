async function test(base_url) {
  try {
    // POST - criar usuário
    const postResponse = await fetch(`${base_url}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'John Doe', email: 'john@example.com' }),
    });
    console.log('POST /users status:', postResponse.status);
    if (postResponse.status !== 201) {
      console.error('Erro ao criar usuário');
      return;
    }

    // GET - listar usuários
    const getResponse = await fetch(`${base_url}/users`);
    const users = await getResponse.json();
    console.log('GET /users:', users);

    if (users.length === 0) {
      console.error('Nenhum usuário encontrado para testar PUT e DELETE');
      return;
    }

    const userId = users[0].id;

    // PUT - atualizar usuário
    const putResponse = await fetch(`${base_url}/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'John Updated', email: 'johnupdated@example.com' }),
    });
    console.log(`PUT /users/${userId} status:`, putResponse.status);

    // DELETE - apagar usuário
    const deleteResponse = await fetch(`${base_url}/users/${userId}`, {
      method: 'DELETE',
    });
    console.log(`DELETE /users/${userId} status:`, deleteResponse.status);

  } catch (error) {
    console.error('Erro ao testar rotas:', error);
  }
}

export { test as runClient };
