import { useCalculator } from "../hooks/useCalculator";
import { Button } from "./Button";
import { Card } from "./Card";
import { buttons } from "../data/buttons";
import { CalculatorDisplay } from "./CalculatorDisplay";
import {useCalculator} from "../hooks/useCalculator"

export function Calculator() {
  const { operation, result, doOperation } = useCalculator();

  function handleInputClick(input) {
    doOperation(input);
  }

  return (
    <Card
      className={`
          flex flex-col gap-[1.625rem] w-[22.25rem]
          pt-14 px-8 pb-8
          `}
    >
      <CalculatorDisplay operation={operation} result={result} />

      <div className="flex flex-col gap-3">
        {buttons.map((row, index) => (
          <div key={`row-${index}`} className="flex gap-3">
            {row.map((button) => (
              <Button
                key={button.input}
                className={button.className || "w-16 h-16"}
                variant={button.variant}
                onClick={() => handleInputClick(button.input)}
              >
                {button.input}
              </Button>
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
}
