import { parse } from "csv-parse";

export async function bodyParser(req, res) {
  const contentType = req.headers["content-type"] || "";

  if (contentType.includes("application/json")) {
    const buffers = [];
    try {
      for await (const chunk of req) {
        buffers.push(chunk);
      }
      req.body = JSON.parse(Buffer.concat(buffers).toString());
    } catch (err) {
      console.error("Erro ao parsear JSON:", err);
      req.body = null;
    }
    return;
  }

  if (contentType.includes("text/csv")) {
    const parser = parse({
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    // Pipe da requisição para o parser
    req.pipe(parser);

    // Expondo  parser 
    req.csvParser = parser;

    return;
  }
  req.body = null;

}
