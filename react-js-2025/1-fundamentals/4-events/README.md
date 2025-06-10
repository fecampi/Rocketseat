## Eventos

### Diferença entre eventos no React e no JavaScript puro

**JavaScript puro (HTML):**

```html

<button onclick="alert('Clicou!')">Clique aqui</button>

```

**React:**

```jsx

function MeuBotao() {
  function handleClick() {
    alert('Clicou!');
  }

  return <button onClick={handleClick}>Clique aqui</button>;
}
```

### O que muda?

- No **React**, usamos `onClick` com letra maiúscula (camelCase) e passamos uma função.
- O React usa um tipo especial de evento (SyntheticEvent), mas pra você, funciona igual.
- A função recebe o evento como argumento automaticamente, se precisar.

### Escrita Vanilla JS x React

|  ‣ Vanilla **JavaScript**  | ‣ **React** |
| --- | --- |
| `onclick` / `addEventListener('click')` | `onClick` |
| `onchange` / `addEventListener('change')` | `onChange` |
| `onkeydown` / `addEventListener('keydown')`  | `onKeyDown` |
| `onsubmit` / `addEventListener('submit')` | `onSubmit` |

### O que é `SyntheticEvent`?

- É um **wrapper (encapsulador)** sobre os eventos nativos do navegador no React.
- Ele serve para garantir que os eventos funcionem de forma **consistente** em diferentes navegadores e para melhorar a **eficiência da performance**.
- O React gerencia todos os eventos através de um **event delegation** (delegação de eventos) em um único listener no nível superior.
- Ele sabe quais eventos criar ou destruir conforme faz a renderização dos componentes em tela.

<aside>
☝🏻

**Isso melhora a performance porque evita a criação de múltiplos event listeners no DOM.**

</aside>

- É o jeito que o **React lida com eventos** (como cliques).
- Ele funciona **igual ao evento normal**, mas é **mais leve e mais rápido**.
- O React **escuta tudo em um lugar só**, em vez de colocar um monte de escutas espalhadas.
- Isso deixa o site mais **rápido** e **funcionando igual** em todos os navegadores.
- Ele é  responsável por **encerrar (limpar) os eventos automaticamente** após a execução, para evitar vazamentos de memória e manter a performance.

### Quando usar o `addEventListener`  do vanilla no React:

- Precisa escutar algo **fora do React**, como uma tecla no teclado (`keydown`).
- Nesses casos, é importante **remover o listener** quando o componente for desmontado.

### Exemplos:

**Sem parâmetros - Posso chamar diretamente**

```jsx
function Alert() {
  function handleAlertClick() {
    alert('Uma mensagem de alerta');
  }

  return (
	  <button onClick={handleAlertClick}>
		  Mostrar Alerta
		</button>
	)
}
```

**Com parâmetros - Necessita função intermediária**

```jsx
function Alert() {
  function handleAlertClick(msg) {
    alert(msg);
  }

  return (
	  <button onClick={() => handleAlertClick('Uma mensagem de alerta')}>
		  Mostrar Alerta
		</button>
	)
}
```

**Utilizando parâmetro “event” do DOM**

```jsx
function Alert() {
  function handleAlertClick(event) {
    alert(event.target.previousSibling.value);
  }

  return (
    <div>
      <input type="text" placeholder="Digite algo..." />
      <button onClick={handleAlertClick}>Mostrar Alerta</button>
    </div>
  );
}
```
