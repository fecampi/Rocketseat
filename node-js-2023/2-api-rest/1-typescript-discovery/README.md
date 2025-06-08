# Iniciação em TypeScript com funções JavaScript

Neste projeto, usamos funções escritas em JavaScript (JS) e adicionamos tipagem com TypeScript (TS) através de arquivos de declaração `.d.ts`.

## 1. Funções JS + Tipos no `.d.ts`

- As funções `add`, `subtract` e `multiply` estão implementadas em JavaScript, sem tipos.
- Criamos um arquivo `.d.ts` para declarar os tipos dessas funções, permitindo que o TypeScript entenda os parâmetros e tipos de retorno.

## 2. Uso da Interface

- No TypeScript, usamos **interfaces** para definir a estrutura dos objetos.
- Exemplo: interface `User` com a propriedade `birthYear` do tipo `number`.
- Isso ajuda o TypeScript a garantir que os dados usados estejam corretos e evite erros.

## 3. Exemplo prático

```ts
import { add, subtract, multiply } from './functions';

interface User {
  birthYear: number;
}

function calculateAgeOfUser(user: User): number {
  const currentYear = new Date().getFullYear();
  return currentYear - user.birthYear;
}

const user: User = { birthYear: 1994 };
console.log(`The user is ${calculateAgeOfUser(user)} years old.`);

console.log(`Addition result: ${add(10, 5)}`);
console.log(`Subtraction result: ${subtract(10, 5)}`);
console.log(`Multiplication result: ${multiply(10, 5)}`);
