"use client";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

import InputValidation from "../Functions/InputValidation";
import PriceCalculation from "../Functions/PriceCalculation";
import InputAdornment from "@mui/material/InputAdornment";
import FormatInput from "../Functions/FormatInput";
import "./Input.css";

interface Props {
  onNewInput: (numbers: number[]) => void;
}

interface InputValues {
  label: string;
  value: string;
  error: boolean;
  type: string;
  metric: string;
}

type InputValueKey = {
  mileage: InputValues;
  petrolCost: InputValues;
  serviceCost: InputValues;
  petrolEfficiency: InputValues;
  electricityCost: InputValues;
  evEfficiency: InputValues;
};

export default function Input(props: Props) {
  const initialInputValues: InputValueKey = {
    mileage: {
      label: "Annual Mileage",
      value: "14,000",
      error: false,
      type: "mileage",
      metric: "km",
    },
    petrolCost: {
      label: "Petrol Cost",
      value: "$2.80",
      error: false,
      type: "petrolCost",
      metric: "/litre",
    },
    serviceCost: {
      label: "Petrol Car Service Cost",
      value: "$400",
      error: false,
      type: "serviceCost",
      metric: "/year",
    },
    petrolEfficiency: {
      label: "Petrol Car Efficiency",
      value: "6.0",
      error: false,
      type: "petrolEfficiency",
      metric: "L/100km",
    },
    electricityCost: {
      label: "Electricity Cost",
      value: "$0.30",
      error: false,
      type: "electricityCost",
      metric: "/kWh",
    },
    evEfficiency: {
      label: "EV Car Efficiency",
      value: "14.0",
      error: false,
      type: "evEfficiency",
      metric: "kWh/100km",
    },
  };

  const [inputValues, setInputValues] = useState(
    initialInputValues as InputValueKey
  );

  const updateGraph = () => {
    let calculationValues = Object.values(inputValues).map((input) => {
      return input.value;
    });
    const calculation = PriceCalculation(calculationValues);
    props.onNewInput(calculation);
  };

  const inputMoneyHandler = (newValue: string | null, inputType: string) => {
    if (newValue !== null) {
      const rawValue = Number(newValue.toString().replace(/[^0-9.]/g, ""));
      if (InputValidation(rawValue, inputType)) {
        setInputError(inputType, false);
        const roundedValue = FormatInput(rawValue, inputType);
        setInputValue(inputType, roundedValue);
        updateGraph();
      } else {
        setInputError(inputType, true);
      }
    } else {
      setInputError(inputType, true);
    }
  };

  const setInputValue = (inputType: string, value: string) => {
    setInputValues((prevState) => ({
      ...prevState,
      [inputType]: {
        ...prevState[inputType as keyof InputValueKey],
        value: value,
      },
    }));
  };

  const setInputError = (inputType: string, valid: boolean) => {
    setInputValues((prevState) => ({
      ...prevState,
      [inputType]: {
        ...prevState[inputType as keyof InputValueKey],
        error: valid,
      },
    }));
  };

  const handleInputChange = (value: string | null, inputType: string) => {
    if (value !== null) {
      setInputValue(inputType, value);
    }
  };

  useEffect(() => {
    updateGraph();
  }, []);

  return (
    <div className="flex m-auto justify-around md:pl-10">
      <div className="flex flex-col w-full">
        {Object.keys(inputValues).map((key) => {
          const inputKey: InputValues = inputValues[key as keyof InputValueKey];
          return (
            <div key={key} className="input-wrapper">
              <TextField
                className="custom-text-field"
                type="text"
                label={inputKey.label}
                variant="standard"
                error={inputKey.error}
                value={inputKey.value}
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ color: "white" }}>
                      <span className="text-sm">{inputKey.metric}</span>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) =>
                  handleInputChange(e.target.value, inputKey.type as string)
                }
                onBlur={(e) => {
                  inputMoneyHandler(e.target.value, inputKey.type as string);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
