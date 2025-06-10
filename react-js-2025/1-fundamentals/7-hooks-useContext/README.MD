# React Hooks: API de Contexto

A Context API permite **compartilhar estados e funções** entre componentes **sem precisar passar props manualmente**.

- Útil quando vários componentes precisam acessar o mesmo dado, como tema, usuário logado ou configurações globais.
- Sem ela, precisaríamos passar props de pai para filho, o que pode complicar conforme a aplicação cresce.
- Com a Context API, criamos um contexto (`Context`) e um “provedor” (`Provider`), que disponibilizam dados para toda a árvore de componentes dentro deles.

### Características principais

- Pode ter múltiplos Contextos na aplicação, não precisa ser um só para tudo.
- O contexto precisa envolver os componentes que vão usá-lo (wrapper).
- Os estados globais geralmente usam `useState` ou outros hooks dentro do Provider.
- React fornece duas funções para isso: `createContext` e `useContext`.

### Por que não usar sempre?.

- Para estados simples, `useState` é mais direto — Context API pode ser exagero.
- Pode causar renders desnecessários em muitos componentes.
- Cada contexto exige um Provider, que normalmente fica no topo da árvore.
- 

### Exemplo básico

1. **Criar o contexto e o provider**
    
    ```jsx
    const CounterContext = React.createContext();
    
    function CounterProvider({ children }) {
      const [savedCounts, setSavedCounts] = React.useState([]);
    
      function saveCount(count) {
        setSavedCounts((prev) => [...prev, count]);
      }
    
      return (
        <CounterContext.Provider value={{ savedCounts, saveCount }}>
          {children}
        </CounterContext.Provider>
      );
    }
    ```
    
2. **Envolver os componentes que vão usar o contexto “wrapper”**
    
    ```jsx
    function App() {
      return (
        <CounterProvider>
          <Counter />
          <CounterList />
        </CounterProvider>
      );
    }
    ```
    
3. **Utilizar o contexto para salvar dados**
    
    ```jsx
    function Counter() {
      const [count, setCount] = useState(0);
      const { saveCount } = React.useContext(CounterContext);
    
      return (
        <div>
          <h2>Contador: {count}</h2>
          <button onClick={() => setCount(count + 1)}>Incrementar</button>
          <button onClick={() => saveCount(count)}>Salvar</button>
        </div>
      );
    }
    ```
    
4. **Utilizar o contexto para ler os dados**
    
    ```jsx
    function CounterList() {
      const { savedCounts } = React.useContext(CounterContext);
    
      return (
        <div>
          <h2>Valores Salvos</h2>
          <ul>
            {savedCounts.map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        </div>
      );
    }
    ```