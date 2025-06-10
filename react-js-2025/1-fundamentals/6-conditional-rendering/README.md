## 📋 Renderização de Listas

No React, usamos listas para **mostrar vários itens na tela**.

### ✅ Usando `.map()`

A forma mais comum:

```jsx
function ListNames() {
  const [names] = React.useState(["Ana", "Bruno", "Carlos", "Daniel", "Eduarda"]);

  return (
    <ul>
      {names.map((name, index) => (
        <li key={`${index}-${name}`}>{name}</li>
      ))}
    </ul>
  );
}
```

🔑 Sobre a `key`

- A `key` ajuda o React a **organizar melhor os itens**.
- Use algo **único e estável**, como `id`, ou combine `index` + nome.
- **Evite usar só o `index`**, pois pode causar bugs se a lista mudar.

**Renderização de Listas com `className`**

```jsx
function OperationHistory() {
  const operations = [
    { text: '1 + 1 = 2', className: 'text-green-500 font-bold' },
    { text: '2 + 3 = 5', className: 'text-red-500 italic' },
    { text: '5 * 5 = 25', className: 'text-gray-700' },
  ];

  return (
    <ul>
      {operations.map((op) => (
        <li key={op.text} className={op.className}>
          {op.text}
        </li>
      ))}
    </ul>
  );
}
```

🔑Sobre o **`estilo`**

- O campo `className` permite customizar o estilo de cada item.

---

## 🔍 Filtrando com `.filter()`

Use `.filter()` para **mostrar só os itens que combinam com algo**.

```jsx
function ListNames() {
  const [names] = React.useState(["Ana", "Bruno", "Carlos", "Daniel", "Eduarda"]);
  const [search, setSearch] = React.useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar nome..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul>
        {names
	        .filter(names => 
		        names.toLowerCase().includes(search.toLowerCase())
		      )
	        .map((name, index) => (
	          <li key={`${index}-${name}`}>{name}</li>
	        ))
	      }
      </ul>
    </div>
  );
}
```

<aside>
⚠️

Dica: Você pode usar `.filter()`,  `.map()` e outras funções de array juntas pra montar o que quiser.

</aside>