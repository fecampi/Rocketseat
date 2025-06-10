export const CalculatorContext = React.createContext();

export function CalculatorProvider({ children }) {
  const [history, setHistory] = React.useState([]);
  const historyStorageKey = "history";

  function updateHistory(operation, parsedResult) {
    setHistory((prev) => {
      const updatedHistory = [...prev, `${operation}=${parsedResult}`];

      localStorage.setItem(historyStorageKey, JSON.stringify(updatedHistory));

      return updatedHistory;
    });
  }

  React.useEffect(() => {
    const savedHistory = localStorage.getItem(
      historyStorageKey,
      JSON.stringify(history)
    );
    setHistory(JSON.parse(savedHistory || "[]"));
  }, []);

  return (
    <CalculatorContext.Provider value={{ history, updateHistory }}>
      {children}
    </CalculatorContext.Provider>
  );
}
