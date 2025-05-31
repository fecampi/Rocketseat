import { Readable } from "node:stream";
import http from "node:http";

export class SlowReadable extends Readable {
  constructor(lines, delay = 1000) {
    super();
    this.lines = lines;
    this.delay = delay;
    this.index = 0;
  }

  _read() {
    if (this.index >= this.lines.length) {
      console.log("SlowReadable: fim da leitura");
      this.push(null);
      return;
    }

    const line = this.lines[this.index] + "\n";
    this.index++;

    setTimeout(() => {
      console.log(`SlowReadable: enviando linha -> ${line.trim()}`);
      this.push(line);
    }, this.delay);
  }
}

export class Client {
  constructor(hostname = "localhost", port = 3000) {
    this.hostname = hostname;
    this.port = port;
  }

  send(lines) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: this.hostname,
        port: this.port,
        path: "/",
        method: "POST",
        headers: {
          "Content-Type": "text/csv",
        },
      };

      console.log("Cliente: iniciando requisição POST");

      const req = http.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          console.log("Cliente: resposta completa recebida");
          resolve(data);
        });
      });

      req.on("error", (err) => {
        console.error("Cliente: erro na requisição", err);
        reject(err);
      });

      const slowStream = new SlowReadable(lines, 300);
      slowStream.pipe(req);
    });
  }
}
