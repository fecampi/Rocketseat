# 📦 Variáveis de Ambiente com dotenv + Zod

Este projeto demonstra como usar **dotenv** para carregar variáveis de ambiente e **Zod** para validar e tipar essas variáveis de forma segura.

## 📚 Stack

- [dotenv](https://github.com/motdotla/dotenv) → Carrega variáveis do arquivo `.env` para `process.env`.
- [zod](https://github.com/colinhacks/zod) → Valida, transforma e tipa variáveis de ambiente.

## 🚀 Como funciona

1. Variáveis são carregadas do `.env` pelo `dotenv`.
2. Um schema com `zod` define:
   - Variáveis obrigatórias.
   - Tipos esperados (string, number, enum, etc).
   - Valores `default` opcionais.
3. Se alguma variável for inválida ou ausente (sem `default`), o app não inicia.

## 🗂 Estrutura

```
.
├── .env
├── env.js
├── index.js
└── package.json
```

## 📝 Exemplo de `.env`

```env
PORT=3000
API_KEY=abcdef123456
NODE_ENV=development
```

## 🧑‍💻 Exemplo de uso com `zod`

```js
const { z } = require("zod");
require("dotenv").config();

const envSchema = z.object({
  PORT: z
    .string()
    .default('3000')
    .transform(Number)
    .refine((n) => !isNaN(n), {
      message: "PORT deve ser um número válido",
    }),
  API_KEY: z.string().min(1, "API_KEY é obrigatória"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("⚠️ Invalid environment variables", _env.error.format());
  throw new Error("Invalid environment variables.");
}

const env = _env.data;

module.exports = { env };
```

## ✅ Benefícios

- Tipagem e validação de variáveis de ambiente.
- Valores default garantem comportamento consistente.
- Evita bugs por variáveis ausentes ou mal configuradas.
- App falha rapidamente se `.env` estiver incorreto.

## 🚀 Execução

```bash
npm run server
```

## ✨ Boas práticas

✅ Nunca versionar `.env` → adicione ao `.gitignore`.  
✅ Sempre validar `process.env` com um schema.  
✅ Use valores `default` com cuidado (evite esconder configurações obrigatórias).