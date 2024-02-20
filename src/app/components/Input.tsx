"use client";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

import InputValidation from "../Functions/InputValidation";
import PriceCalculation from "../Functions/PriceCalculation";

interface Props {
  onNewInput: (numbers: number[]) => void;
}

interface InputValues {
  number: Number | null;
}

export default function Input(props: Props) {
  const [mileageError, setMileageError] = useState(false);
  const [petrolCostError, setPetrolCostError] = useState(false);
  const [serviceCostError, setServiceCostError] = useState(false);
  const [efficiencyError, setEfficiencyError] = useState(false);
  const [electricityCostError, setElectricityCostError] = useState(false);
  const [mileage, setMileage] = useState<InputValues["number"]>(14000);
  const [petrolCost, setPetrolCost] = useState<InputValues["number"]>(1);
  const [serviceCost, setServiceCost] = useState<InputValues["number"]>(1);
  const [efficiency, setEfficiency] = useState<InputValues["number"]>(1);
  const [electricityCost, setElectricityCost] =
    useState<InputValues["number"]>(1);

  const inputDataHandler = (value: number | null, inputType: string) => {
    const validationResult = InputValidation(value, inputType);
    const validationType = validationResult[0];
    const isValid = validationResult[1];
    switch (validationType) {
      case "mileage":
        isValid
          ? (setMileageError(false), setMileage(value))
          : setMileageError(true);
        break;
      case "petrolCost":
        isValid
          ? (setPetrolCostError(false), setPetrolCost(value))
          : setPetrolCostError(true);
        break;
      case "serviceCost":
        isValid
          ? (setServiceCostError(false), setServiceCost(value))
          : setServiceCostError(true);
        break;
      case "efficiency":
        isValid
          ? (setEfficiencyError(false), setEfficiency(value))
          : setEfficiencyError(true);
        break;
      case "electricityCost":
        isValid
          ? (setElectricityCostError(false), setElectricityCost(value))
          : setElectricityCostError(true);
        break;
    }
  };

  useEffect(() => {
    const calculation = PriceCalculation(
      mileage,
      petrolCost,
      serviceCost,
      efficiency,
      electricityCost
    );

    console.log(calculation);

    props.onNewInput([100, 300]);
  }, [mileage, petrolCost, serviceCost, efficiency, electricityCost]);

  return (
    <div className="flex m-auto justify-around">
      <div className="flex flex-col">
        <TextField
          type="number"
          label="Annual Mileage"
          variant="standard"
          defaultValue={mileage}
          error={mileageError}
          onChange={(e) => inputDataHandler(Number(e.target.value), "mileage")}
        />
        <TextField
          type="number"
          label="Petrol Cost"
          variant="standard"
          defaultValue={petrolCost}
          error={petrolCostError}
          onChange={(e) =>
            inputDataHandler(Number(e.target.value), "petrolCost")
          }
        />
        <TextField
          type="number"
          label="Annual Petrol Car Service Cost"
          variant="standard"
          defaultValue={serviceCost}
          error={serviceCostError}
          onChange={(e) =>
            inputDataHandler(Number(e.target.value), "serviceCost")
          }
        />
        <TextField
          type="number"
          label="Petrol Car Efficiency"
          variant="standard"
          defaultValue={efficiency}
          error={efficiencyError}
          onChange={(e) =>
            inputDataHandler(Number(e.target.value), "efficiency")
          }
        />
        <TextField
          type="number"
          label="Electricity Cost"
          variant="standard"
          defaultValue={electricityCost}
          error={electricityCostError}
          onChange={(e) =>
            inputDataHandler(Number(e.target.value), "electricityCost")
          }
        />
      </div>
    </div>
  );
}
