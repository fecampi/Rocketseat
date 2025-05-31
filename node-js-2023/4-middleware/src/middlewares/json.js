async function json(req, res) {
  // Middleware: função que prepara a requisição antes da rota tratar
  const buffers = []

  // Lê todo o corpo da requisição em pedaços e junta no buffer
  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    // Tenta converter o corpo para JSON e guarda em req.body
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null // Se não for JSON, deixa nulo
  }

  // Seta o tipo da resposta como JSON
  res.setHeader('Content-type', 'application/json')
}
export { json}