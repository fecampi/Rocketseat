// Importa o módulo 'http' nativo do Node.js, que permite criar servidores web
import http from "node:http";

// Cria um servidor HTTP
const server = http.createServer((req, res) => {
  // Quando o servidor recebe uma requisição, responde com o método HTTP usado (GET, POST, etc.)
  res.end(`Você fez uma requisição ${req.method}`);
});

// Faz o servidor escutar na porta 3000
server.listen(3000, () => {
  // Exibe no console que o servidor está rodando, com o endereço de acesso
  console.log("Servidor rodando em http://localhost:3000");
});

/*
  Dica: para reiniciar o servidor automaticamente sempre que salvar este arquivo,
  use o modo watch do Node.js (a partir da versão 18):

    node --watch nome-do-arquivo.js

  Exemplo:
    node --watch server.js

  Ou, se preferir, adicione um script no seu package.json:

    "scripts": {
      "dev": "node --watch server.js"
    }

  E rode com:

    npm run dev
*/