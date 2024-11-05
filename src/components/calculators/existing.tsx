"use client";

import { Calculator } from "../calculator";

export function ExistingCalculator() {
  return (
    <Calculator
      information={[
        { label: "Weight (in KG)", key: "weight", type: "number" },
        { label: "Height (in CM)", key: "height", type: "number" },
        { label: "Age", key: "age", type: "number" },
        { label: "Gender", key: "gender", type: "select", selectionValues: ["Male", "Female"] },
      ]}
      unit="mL/day"
      calculate={(vals) => {
        const { weight, height, gender, age } = vals as unknown as { weight: number; age: number; height: number; gender: "male" | "female" };
        const bmr = (10 * weight + 6.25 * height - 5 * age + (gender === "male" ? 5 : -161)) * 4187;
        const f = gender === "male" ? "+ 5" : "- 161";
        return {
          crude: (bmr / 34_200).toFixed(0),
          kerosene: (bmr / 35_000).toFixed(0),
          gasoline: (bmr / 34_200).toFixed(0),
          diesel: (bmr / 35_800).toFixed(0),
          additionalInformation: (
            <p>
              <span className="font-serif break-words">
                Basal metabolic rate (BMR) is the number of calories your body needs to accomplish its most basic (basal) life-sustaining functions.
                <br />
                BMR = (10 × weight + 6.25 × height - 5 × age {f}) × 4184
                <br />
                BMR = (10 × {weight} + 6.25 × {height} - 5 × {age} {f}) × 4187
                <br />
                BMR = {bmr/4187} kcal/day
                <br />
                BMR = {bmr} J/day
              </span>
            </p>
          ),
          final: <p className="text-md text-muted-foreground">You burn the equivalent of <span className="text-foreground">{(bmr / 34_200).toFixed(0)} mL</span> of crude oil a day.</p>,
        };
      }}
    />
  );
}
