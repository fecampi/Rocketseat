import { Writable, Transform } from "node:stream";
import fs from "fs";
import path from "path";
import { randomUUID } from "node:crypto";
import http from "node:http";


const csvFile = path.join(process.cwd(), "output.csv");



class IdToUuidTransform extends Transform {
  constructor() {
    super();
    this.isHeader = true;
  }

  _transform(chunk, encoding, callback) {
    const data = chunk.toString();
    const lines = data.split(/\r?\n/);

    let transformedLines = lines.map(line => {
      if (!line.trim()) return "";

      if (this.isHeader) {
        this.isHeader = false;
        return line;
      }

      const cols = line.split(",");
      cols[0] = randomUUID();
      return cols.join(",");
    });

    const result = transformedLines.join("\n") + "\n";
    callback(null, result);
  }
}



export class CsvWritableStream extends Writable {
  constructor(filePath) {
    super();
    this.writer = fs.createWriteStream(filePath, { flags: "a" });
  }

  _write(chunk, encoding, callback) {
    console.log("CsvWritableStream: escrevendo chunk");
    this.writer.write(chunk, encoding, callback);
  }

  _final(callback) {
    console.log("CsvWritableStream: finalizando escrita");
    this.writer.end(callback);
  }
}



export class Server {
  constructor(port = 3000) {
    this.port = port;
    this.server = http.createServer((req, res) => {
      console.log(`Servidor: recebida requisição ${req.method} ${req.url}`);

      if (req.method === "POST") {
        const csvWriter = new CsvWritableStream(csvFile);
        const idTransform = new IdToUuidTransform();

        req.pipe(idTransform).pipe(csvWriter);

        req.on("end", () => {
          console.log("Servidor: fim dos dados recebidos");
          res.writeHead(200);
          res.end("Dados CSV gravados com sucesso!\n");
        });
      } else {
        res.writeHead(200);
        res.end("Envie dados CSV via POST.\n");
      }
    });
  }

  start() {
    this.server.listen(this.port, () => {
      console.log(`Servidor rodando na porta ${this.port}`);
    });
  }
}
