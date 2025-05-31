import http from "node:http";

const users = [];
let userIdCounter = 1;

export const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  // Ler o corpo da requisição usando for await, acumulando os chunks em buffer
  const buffer = [];
  for await (const chunk of req) {
    buffer.push(chunk);
  }

  // Tentar converter o buffer para JSON, se houver corpo
  let body = {};
  try {
    if (buffer.length > 0) {
      body = JSON.parse(Buffer.concat(buffer).toString());
    }
  } catch {
    // Se o JSON for inválido, responder com status 400 Bad Request
    res.writeHead(400);
    res.end("Invalid JSON");
    return;
  }

  // Rota: [Listar] usuários (GET /users)
  if (method === "GET" && url === "/users") {
    res.setHeader("Content-Type", "application/json");
    // Status 200 OK (implícito): retorna a lista de usuários cadastrados
    res.end(JSON.stringify(users));
    return;
  }

  // Rota: [Criar] usuário (POST /users)
  if (method === "POST" && url === "/users") {
    // Cria um novo usuário com id incremental e dados do corpo da requisição
    const newUser = { id: userIdCounter++, ...body };
    users.push(newUser);

    // Status 201 Created: recurso criado com sucesso, retorna o novo usuário
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newUser));
    return;
  }

  // Rota: [Editar] usuário (PUT /users/:id)
  if (method === "PUT" && url.startsWith("/users/")) {
    const id = Number.parseInt(url.split("/")[2], 10);
    const userIndex = users.findIndex(u => u.id === id);

    // Se não encontrar o usuário, retorna 404 Not Found
    if (userIndex === -1) {
      res.writeHead(404);
      res.end("User not found");
      return;
    }

    // Atualiza os dados do usuário existente com os dados do corpo da requisição
    users[userIndex] = { ...users[userIndex], ...body };

    // Retorna o usuário atualizado com status 200 OK (implícito)
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(users[userIndex]));
    return;
  }

  // Rota: [Remover] usuário (DELETE /users/:id)
  if (method === "DELETE" && url.startsWith("/users/")) {
    const id = Number.parseInt(url.split("/")[2], 10);
    const userIndex = users.findIndex(u => u.id === id);

    // Se usuário não encontrado, retorna 404 Not Found
    if (userIndex === -1) {
      res.writeHead(404);
      res.end("User not found");
      return;
    }

    // Remove o usuário da lista
    users.splice(userIndex, 1);

    // Status 204 No Content: exclusão feita com sucesso, sem corpo na resposta
    res.writeHead(204);
    res.end();
    return;
  }

  // Caso nenhuma rota seja encontrada, retorna 404 Not Found
  res.writeHead(404);
  res.end("Route not found");
});
