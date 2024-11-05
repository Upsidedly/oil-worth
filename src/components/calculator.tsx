"use client";

import { ReactNode, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Information = {
  label: string;
  key: string;
  type: "number" | "select";
  selectionValues?: string[];
  defaultValue?: number;
  required?: boolean;
};

type CalculationResult = {
  crude: number | string;
  kerosene: number | string;
  gasoline: number | string;
  diesel: number | string;
  additionalInformation?: ReactNode;
  final?: ReactNode;
};

type CalculatorProps = {
  information: Information[];
  calculate: (values: Record<string, number>) => CalculationResult;
  unit?: string;
};

export function Calculator({ information, calculate, unit = "mL" }: CalculatorProps) {
  const formSchema = z.object(
    Object.fromEntries(information.map(({ key, type }) => [key, type === "select" ? z.string() : z.coerce.number().min(0)]))
  );
  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema), defaultValues: Object.fromEntries(information.map(({ key, defaultValue }) => [key, defaultValue ?? ""])) });

  const [result, setResult] = useState<CalculationResult | null>(null);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setResult(calculate(values as any));
  }

  return (
    <div className="w-max max-w-[95vw] md:max-w-[750px] bg-muted/30 flex-col md:flex-row flex">
      <div className="basis-1/3 min-w-[200px] p-4 border-r border-border">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {information.map(({ label, key, type, selectionValues, required, defaultValue }) => (
              <FormField
                key={key}
                control={form.control}
                name={key}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      {type === "select" ? (
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        <Select onValueChange={(v) => form.setValue(key, v)} value={field.value as any}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectionValues?.map((value) => (
                              <SelectItem key={value} value={value.toLowerCase()}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input type="number" {...field} required={required ?? true} defaultValue={defaultValue} className="w-full p-2 border rounded" />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit" variant={"outline"} className="">
              Calculate
            </Button>
          </form>
        </Form>
        {/* <form onSubmit={handleSubmit}>
          {information.map(({ label, key, type, selectionValues }) => (
            <div key={key} className="mb-4">
              <label className="block text-sm font-medium mb-1">{label}</label>
              {type === "select" ? (
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectionValues?.map((value) => (
                      <SelectItem key={value} value={value.toLowerCase()}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input type="number" name={key} required className="w-full p-2 border rounded" />
              )}
            </div>
          ))}
          <Button type="submit" variant={"outline"} className="">
            Calculate
          </Button>
        </form> */}
      </div>
      <div className="basis-2/3 p-4 min-w-[200px]">
        <h2 className="font-bold mb-2">Results:</h2>
        {result && (
          <div>
            {result.additionalInformation}
            <div className="my-4">
              <p>
                Crude Oil and Gasoline: {result.crude} {unit}
              </p>
              <p>
                Kerosene: {result.kerosene} {unit}
              </p>
              {/* <p>
                Gasoline: {result.gasoline} {unit}
              </p> */}
              <p>
                Diesel: {result.diesel} {unit}
              </p>
            </div>
            {result.final}
          </div>
        )}
      </div>
    </div>
  );
}
