import "./styles.css";
import { CalculatorProvider } from "./context/CalculatorContext";
import { OperationHistory } from "./components/OperationHistory";
import { Calculator } from "./components/Calculator";

function App() {
  return (
    <main
      className={`
          py-28 px-4 sm:px-10
          flex flex-col sm:flex-row
          items-center sm:items-stretch
          gap-2
          `}
    >
      <CalculatorProvider>
        <Calculator />
        <OperationHistory />
      </CalculatorProvider>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
