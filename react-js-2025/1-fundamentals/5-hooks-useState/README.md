## ⚙️ React Hooks: Introdução

Os **React Hooks** foram lançados no **React 16.8** para trazer mais poder aos **componentes funcionais**.

### 🏛 Antes dos Hooks

- Apenas **componentes de classe** podiam:
    - Ter **estado**
    - Usar **ciclo de vida**
- Isso tornava o código mais **complicado e repetitivo**.

---


### 💡 O que são Hooks?

- **Hooks são funções especiais** que permitem usar recursos do React (como estado e efeitos colaterais) **dentro de componentes funcionais**.
- São como **pequenos serviços reutilizáveis**, criados sempre com **funções**.
- Ajudam a deixar o código mais **organizado** e **fácil de manter**.

---

- **Eliminam a necessidade de classes** (sem `this`, `bind`, etc.)
- Permitem **reutilizar lógica** com hooks personalizados
- Tornam o código **mais limpo e legível**
- São a **base da forma moderna** de se escrever React

---

### 📌 Boas práticas com Hooks

- O nome do hook **sempre começa com `use`** (ex: `useSomething`)
- **Devem ser chamados no topo do componente** (fora de `if`, loops ou funções internas)
- **Seguem a ordem de chamada** a cada render — mudar isso pode causar erros
- Usar hooks **personalizados** para **organizar e isolar lógica**
- **Evitar efeitos colaterais dentro de renderizações**

<aside>
⚠️

Nunca chame um hook dentro de:

- `if`, `switch`, ou `try/catch`
- Loops
- Funções internas
</aside>

## ⚙️ React Hooks: `useState`

O `useState` é um **hook que cria e controla estados** em componentes funcionais.

---

### ✨ O que ele faz?

- Armazena **um valor que pode mudar** (ex: contador, texto, etc)
- Quando o valor muda, o **componente é re-renderizado**
- Você pode ter **quantos estados quiser** no mesmo componente

---

### 📦 Sintaxe básica

```jsx
const [valor, setValor] = useState(valorInicial);
```

- `valor`: valor atual do estado
- `setValor`: função para **atualizar o estado**
- `useState(valorInicial)`: define o **valor inicial**

---

### 🧪 Exemplo simples

```jsx
function Counter() {
  const [contador, setContador] = React.useState(0);

  return (
    <><p>Contador: {contador}</p>
      <button onClick={() => setContador(10)}>Atualizar</button>
    </>
  );
}
```

---

### 🔁 Atualizando com o valor anterior

Às vezes você precisa **atualizar o estado com base no valor anterior**.

Nesse caso, o `setValor` pode receber uma **função**, e o **primeiro parâmetro é o valor anterior**.

### 🧠 Por quê?

Porque o React pode **agrupar atualizações**, e se você depender do valor atual diretamente, pode ter bugs.

---

### ✅ Exemplo com `prevValue`:

```jsx
function Counter() {
  const [contador, setContador] = React.useState(0);

  return (
    <><p>Contador: {contador}</p>
      <button onClick={() => setContador(prev => prev + 1)}>
        Incrementar
      </button>
    </>
  );
}
```

- `prev` (ou `prevValue`) é o **valor atual do estado no momento da atualização**
- Isso garante que o novo valor será sempre baseado corretamente no último valor

---

## Renderização condicional

É quando você **mostra ou esconde algo na tela dependendo de uma condição**.

### Formas de fazer renderização condicional

❓ Operador Ternário `? :`

Usado quando você quer **escolher entre duas opções** com base em uma condição.

```jsx
{isDark ? "Modo Escuro" : "Modo Claro"}
```

⚡ Curto-circuito `&&`

Mostra algo **só se a condição for verdadeira**.

```jsx
{isLoggedIn && <p>Bem-vindo!</p>}
```

## 🧩 Condicional `if`

Boa para **lógicas mais complexas** antes de mostrar algo.

```jsx
if (loading) {
  return <p>Carregando...</p>;
}

return <p>Pronto!</p>;
```

---