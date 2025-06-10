# React Hooks: Custom hook

### O que é um Custom Hook?

Um **custom hook** é só uma **função que começa com `use`** e que você cria para organizar melhor uma lógica que usa hooks.

Ele serve para **reaproveitar lógica entre componentes** — por exemplo, código de `useState`, `useEffect`, requisições de API, ou qualquer outra coisa que você queira encapsular.

👉 **Pense assim:** quando você perceber que está copiando e colando lógica de um componente para outro, você pode colocar isso em um custom hook.

---

### O que pode ter dentro de um Custom Hook?

✅ Hooks do React (`useState`, `useEffect`, `useContext`, etc.)

✅ Hooks de bibliotecas (ex: React Query, React Hook Form)

✅ Requisições de API (GET, POST, PUT, DELETE)

✅ Lógica de negócio reutilizável (ex: manipular dados, tratar erros)

✅ Acesso e encapsulamento de contexto

---

### O que NÃO deve fazer em um Custom Hook?

❌ Não colocar diretamente eventos de click, submit, etc. — em vez disso, crie funções que o componente chama.

❌ Não colocar lógica puramente de renderização — isso deve ficar no componente.

❌ Se a lógica é muito específica e só um componente usa, talvez não valha a pena criar um hook.