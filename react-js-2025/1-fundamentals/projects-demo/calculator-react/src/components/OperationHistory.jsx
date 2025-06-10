import { Text } from "./Text";
import { Card } from "./Card";
import { CalculatorContext } from "../context/CalculatorContext";

export function OperationHistory() {
  const { history } = React.useContext(CalculatorContext);

  return (
    <Card className="w-full py-10 px-8">
      <Text as="h1" variant="heading" className="mb-4">
        Histórico de Operações
      </Text>

      {history.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {history.map((value, index) => (
            <Text key={`item-${index}`} as="li">
              {value}
            </Text>
          ))}
        </ul>
      ) : (
        <Text as="p" variant="muted">
          Nenhuma operação recente.
        </Text>
      )}
    </Card>
  );
}