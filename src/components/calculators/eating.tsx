"use client";

import { Calculator } from "../calculator";

function trimZeroes(num: string | number): string {
  if (typeof num === 'number') num = num.toString();
  while (num.includes('.') && (num.endsWith('0') || num.endsWith('.'))) {
    num = num.slice(0, -1);
  }
  return num
}

function displayNumber(num: string | number): string {
  if (typeof num === 'number') num = num.toFixed(6);
  num = trimZeroes(num);
  return Intl.NumberFormat().format(parseFloat(num));
}


export function EatingCalculator() {
  return (
    <Calculator
      information={[
        { label: "Calories (in kcals)", key: "cals", type: "number" },
      ]}
      unit="mL"
      calculate={(vals) => {
        const { cals } = vals as unknown as { [key: string]: number };
        const energy = cals * 4184;
        return {
          crude: (energy / 34_200).toFixed(0),
          kerosene: (energy / 35_000).toFixed(0),
          gasoline: (energy / 34_200).toFixed(0),
          diesel: (energy / 35_800).toFixed(0),
          additionalInformation: (
            <p>
              <span className="font-serif break-words">
                1 kcal = 4,184 J
                <br />
                Energy = calories × 4184
                <br />
                Energy = {displayNumber(cals)} × 4184
                <br />
                Energy = {displayNumber(energy)} J
              </span>
            </p>
          ),
          final: <p className="text-md text-muted-foreground">You consume the equivalent of <span className="text-foreground">{displayNumber((energy / 34_200).toFixed(0))} mL</span> of crude oil when eating a meal of {displayNumber(cals)} kcals.</p>
        };
      }}
    />
  );
}
