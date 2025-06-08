
// require('dotenv').config();
// or import 'dotenv/config';

const { env } = require('../env');


console.log('Variáveis de ambiente validadas com sucesso!');
console.log('PORT:', env.PORT);
console.log('API_KEY:', env.API_KEY);
console.log('NODE_ENV:', env.NODE_ENV);

// Exemplo: rodar um servidor fake (só pra você ver que funciona)
const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello from Node.js with validated env vars!');
});

server.listen(env.PORT, () => {
  console.log(`Servidor rodando na porta ${env.PORT} 🚀`);
});