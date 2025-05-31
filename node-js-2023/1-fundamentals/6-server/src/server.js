import http from "node:http";
import { bodyParser } from "./middlewares/bodyParser.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

/**
 * Response Status Codes
 *
 * 200 OK: Indica que a solicitação foi bem-sucedida.
 * 201 Created: Indica que a solicitação foi bem-sucedida e resultou na criação de um novo recurso.
 * 400 Bad Request: Indica que a solicitação do cliente não pôde ser entendida pelo servidor devido a sintaxe inválida, estrutura malformada ou outros erros do cliente.
 * 401 Unauthorized: Indica que o cliente deve se autenticar para obter a resposta solicitada.
 * 404 Not Found: Indica que o recurso solicitado não foi encontrado no servidor.
 * 500 Internal Server Error: Indica que ocorreu um erro interno no servidor enquanto processava a solicitação do cliente.
 */

/**
 * Função para criar um servidor HTTP.
 *
 * @param {IncomingMessage} req - Objeto de requisição recebido pelo servidor.
 * @param {ServerResponse} res - Objeto de resposta enviado pelo servidor.
 */
const server = http.createServer(async (req, res) => {
  // Obtendo o método HTTP e a URL da requisição.
  const { method, url } = req;

  //-  Middlewares
  await bodyParser(req, res);

  const route = routes.find(route => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);
    const { query, ...params } = routeParams.groups || {};
    req.params = params || {};
    req.query = query ? extractQueryParams(query) : {};

    return route.handler(req, res);
  }

  res.writeHead(404).end();
});

export { server };
