import { server } from './server.js';
import { runClient } from './client.js';

server.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");

  setTimeout(async () => {
    await runClient();
    server.close(() => console.log("Servidor encerrado."));
  }, 200);
});
