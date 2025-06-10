# Estruração

## HTML, CSS e JSX

- O React é uma **biblioteca para construir interfaces**, e toda interface é composta por três pilares principais:
    - **HTML** → Define a estrutura da página
    - **CSS** → Cuida da estilização e aparência
    - **JavaScript** → Garante a interatividade e automação

<aside>
‼️

**O React não substitui essas tecnologias, ele apenas as organiza dentro de componentes reutilizáveis e processa de forma mais inteligente os dado**

</aside>

---

## JSX (JavaScript XML)

- É uma sintaxe que permite escrever código **HTML** dentro do **JavaScript**.
- Dentro do React, ele facilita a criação de interfaces via componentes, tornando o código mais intuitivo.
- Não precisa criar vários arquivos para ter um componente funcional

Por exemplo, em vez de escrever o componente com puro JavaScript como:

```
return React.createElement('h1', null, 'Olá, mundo!');
```

Você pode escrever igual no exemplo do “Hello World”

```
return <h1>Olá, mundo!</h1>;
```

O React sozinho compila JSX para `React.createElement()`, então, no fim das contas, escrever as tags em HTML é apenas “sugar syntax” para criar elementos de forma mais legível.

<aside>
💡

**Em alguns momentos você pode ver a extensão `.jsx` no arquivo de componente, mas ela nem sempre é necessária.**

</aside>

---

## Fragmentos

- No **JSX**, a parte escrita do HTML **sempre** **precisa** **retornar um único elemento pai**.
    - Pode ser qualquer elemento HTML, como uma `div` ou qualquer outro
    - Pode ser uma tag vazia, que é conhecida como `Fragmento`, ele permite agrupar sem criar elementos adicionais

```jsx
return (
  <>
    {/* 
      React Fragment no formato curto.
      É equivalente a usar <React.Fragment> 
    */}
    <h1>Elemento 1</h1>
    <p>Elemento 2</p>
  </>
)
```

<aside>
💡

**Lembrando: Retornar dois ou mais elementos soltos, sem um “wrapper” resultará em erros de compilação**

</aside>

---

## Como o código é convertido na prática

**O Babel é um “transpilador” de JavaScript.** 

Ele pega código e **converte para uma versão compatível com a maioria dos navegadores**.

```jsx
const soma = (a, b) => a + b;

function MyComponent() {
  return <h1>test</h1>
}

```

→ 

```jsx
function soma(a, b) {
  return a + b;
}

import { jsx as _jsx } from "react/jsx-runtime";
function MyComponent() {
  return /*#__PURE__*/_jsx("h1", {
    children: "test"
  });
}
```

---

## Como vamos estilizar o HTML

‣ **CSS interno (inline)**

`app.js`

```jsx
export default function App() {
  return (
    <div style={{ backgroundColor: "lightblue", padding: "20px" }}>
      Background Azul
    </div>
  );
}
```

‣ **CSS externo**

`styles.css`

```jsx
.container {
  background-color: lightblue;
  padding: 20px;
}
```

`app.js`

```jsx
import "./styles.css";

function App() {
  return <div className="container">Background Azul</div>;
}
```

‣ **CSS Modules**

`styles.module.css`

```css
.container {
  background-color: lightblue;
  padding: 20px;
}
```

`app.js`

```jsx
import styles from "./styles.module.css";

export default function App() {
  return <div className={styles.container}>Background Azul</div>;
}
```

‣ **CSS-in-JS**

`app.js`

```jsx
import styled from "styled-components";

const Container = styled.div`
  background-color: lightblue;
  padding: 20px;
`;

export default function App() {
  return <Container>Background Azul</Container>;
}
```

‣ **Sass e outros pré-processadores**

`styles.scss`

```sass
$bg-color: lightblue;

.container {
  background-color: $bg-color;
  padding: 20px;
}
```

`app.js`

```jsx
import "./styles.scss";

export default function App() {
  return <div className="container">Background Azul</div>;
}
```

‣ **TailwindCSS e outras bibliotecas**

`app.js`

```jsx
export default function App() {
  return <div className="bg-blue-300 p-5">Background Azul</div>;
}
```

<aside>

**Cada uma dessas formas tem seus pontos positivos e negativos e você deve escolher a melhor para o seu contexto de projeto**

</aside>

---

### Importando TailwindCSS

Vamos configurar nossa página modelo para utilizar o TailwindCSS diretamente da CDN deles, mantendo a simplicidade do estudo.

```jsx
<script src="https://unpkg.com/@tailwindcss/browser@4"></script>
```

---

## Componentes

- **Bloco de UI**:  Representa uma parte da interface de usuário.
- **Tags customizadas**: um componente abre e fecha uma tag, e essas tags obrigatoriamente precisam começar com a primeira letra em caixa alta.
- **Funcional:** ele precisa estar dentro de uma função onde o HTML a ser desenhado na página é retornado.
- **Reutilizável:** ele pode ser reutilizado em diferentes partes da aplicação.
- **Recebe estilização:** ele recebe estilos CSS através das propriedades `style` ou `className` (que é a mesma coisa que o `class` do HTML).
- **Multi-definições:** ele pode ser atômico onde não há muita lógica funcional, ou com mais inteligência integrado nele

### Estrutura básica

```jsx
function Button() {
  return (
    <button>Botão</button>
  )
}
```

---

## Propriedades

- **Personalização dinâmica:** As props permitem modificar o comportamento e a aparência dos componentes.
- **Atributos customizados:** Passam dados como atributos para componentes, além dos atributos HTML tradicionais.
- **Passagem de dados:** Componentes recebem dados externos, como texto, números, objetos, funções ou outros componentes, através das props.
- **Imutabilidade:** Props são somente leitura e não podem ser alteradas diretamente dentro do componente.
- **Padrões opcionais:** É possível definir valores padrão para props, caso não sejam fornecidas.
- **Composição:** Props permitem a renderização de outros componentes dentro do componente pai.
- **Propriedades especiais:**
    - **`children`:** Representa o conteúdo entre as tags do componente.
    - **`key`:** Usada para identificar elementos em listas e otimizar a renderização.

### Exemplo

```jsx
function Button({ children, variant }) {
  return (
    <button 
	    className={variant === 'primary' ? 'bg-purple-500' : 'bg-gray-500'}
	  >
		  {children}
	  </button>
  )
}

function App() {
  return (
    <Button variant="primary">Meu Botão</Button>
  )
}
```