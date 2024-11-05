"use client";

import { Calculator } from "../calculator";

function calculateWalkingEnergy(weight: number, distance: number, inclineRatio: number = 0): number {
  const g = 9.8; // gravitational acceleration in m/s²

  // Calculate the horizontal work (standard walking work without incline)
  const horizontalWork = weight * g * distance;

  // Calculate the vertical work if there is an incline
  const verticalWork = inclineRatio > 0 ? weight * g * (distance * inclineRatio) : 0;

  // Total energy is the sum of horizontal and vertical work
  const totalEnergy = horizontalWork + verticalWork;

  return totalEnergy; // Energy in joules
}

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


export function WalkingCalculator() {
  return (
    <Calculator
      information={[
        { label: "Weight (in KG)", key: "weight", type: "number" },
        { label: "Distance (in M)", key: "distance", type: "number" },
        { label: "Incline (0-1, 0 means flat)", key: "incline", type: "number", required: false },
      ]}
      unit="mL"
      calculate={(vals) => {
        const { weight, distance, incline } = vals as unknown as { [key: string]: number };
        const energy = calculateWalkingEnergy(weight, distance, incline);
        return {
          crude: (energy / 34_200).toFixed(0),
          kerosene: (energy / 35_000).toFixed(0),
          gasoline: (energy / 34_200).toFixed(0),
          diesel: (energy / 35_800).toFixed(0),
          additionalInformation: (
            <p>
              <span className="font-serif break-words">
                Horizontal work = weight × g × distance<br />
                Horizontal work = {weight} × 9.8 × {distance}<br />
                Horizontal work = {displayNumber(weight * 9.8 * distance)} J<br /><br />

                Vertical work = weight × g × (distance × incline)<br />
                Vertical work = {weight} × 9.8 × ({displayNumber(distance)} × {incline})<br />
                Vertical work = {displayNumber(weight * 9.8 * (distance * incline))} J<br /><br />

                Total energy = Horizontal work + Vertical work<br />
                Total energy = {displayNumber(weight * 9.8 * distance)} + {displayNumber(weight * 9.8 * (distance * incline))} J
              </span>
            </p>
          ),
          final: <p className="text-md text-muted-foreground">You burn the equivalent of <span className="text-foreground">{displayNumber((energy / 34_200).toFixed(0))} mL</span> of crude oil during a {distance}m walk at a {Math.round(incline * 100)}% incline.</p>
        };
      }}
    />
  );
}
