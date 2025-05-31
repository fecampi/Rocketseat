import { Server } from "./server.js";
import { Client } from "./client.js";

const server = new Server();
server.start();

const client = new Client();

const csvLines = [
  "id,nome,tempo_online",
];

for (let i = 1; i <= 10; i++) {
  const name = `User${i}`;
  const time = `${Math.floor(Math.random() * 60) + 1}m`;
  csvLines.push(`${i},${name},${time}`);
}

setTimeout(() => {
  client.send(csvLines)
    .then(response => {
      console.log("Cliente recebeu:", response);
    })
    .catch(console.error);
}, 1000);
