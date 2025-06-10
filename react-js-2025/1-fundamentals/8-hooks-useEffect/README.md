# React Hooks: UseEffect

### Ciclos de vida de um componente React

Todo componente React passa por 3 momentos principais:

- **Montagem (mount)** → Quando o componente aparece na tela pela primeira vez.
- **Atualização (update)** → Quando o estado ou as props mudam.
- **Desmontagem (unmount)** → Quando o componente sai da tela.

👉 Nessas fases você pode executar **efeitos colaterais**, como:

- Buscar dados de uma API.
- Atualizar o título da página.
- Adicionar/remover event listeners.
- Iniciar ou limpar timers (`setTimeout` / `setInterval`).
- Conectar ou desconectar de WebSockets.tá

### Criando efeitos com `useEffect`

O `useEffect` serve para você rodar **efeitos colaterais** — coisas que acontecem *fora do React* (buscar dados, manipular DOM, abrir conexões, etc).

---

### Primeiro parâmetro: Função de callback

O primeiro parâmetro do `useEffect` é uma **função anônima** que o React vai executar:

```jsx
React.useEffect(() => {
  // Código do efeito (roda no mount e quando dependências mudam)
  const timer = setInterval(() => {
    console.log('tic-tac');
  }, 1000);

  return () => {
    // Código de limpeza (roda no unmount ou antes de refazer o efeito)
    clearInterval(timer); // limpeza
  };
}, []);

```

👉 O que você pode fazer nessa função:

- Buscar dados de uma API
- Adicionar event listeners
- Iniciar timers (`setTimeout`, `setInterval`)
- Conectar em WebSockets

👉 O que você deve fazer na **função de retorno** (`return`):

- Remover event listeners
- Limpar timers (`clearTimeout`, `clearInterval`)
- Cancelar requisições
- Fechar conexões (WebSockets, Streams)

---

### Segundo parâmetro: Lista de dependências

O segundo parâmetro do `useEffect` é uma **lista de dependências** → ele controla **quando o efeito deve rodar novamente**.

```jsx
const [count, setCount] = React.useState(0);

React.useEffect(() => {
 // efeito
  console.log(`Count mudou: ${count}`);
}, [count]);
```

Como funciona:

- `[]` → Efeito roda **1 vez só** (quando o componente aparece na tela).
- `[var1, var2]` → Efeito roda **sempre que alguma dependência mudar**.
- **Sem dependências** → Efeito roda **toda vez que o componente renderiza** (⚠️ pode causar loops).

###