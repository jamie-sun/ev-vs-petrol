interface Props {
  value: number;
  inputType: string;
}

export default function FormatInput(
  value: Props["value"],
  inputType: Props["inputType"]
) {
  switch (inputType) {
    case "mileage":
      return value.toLocaleString();
    case "serviceCost":
      return "$" + (Math.round(Number(value) * 100) / 100).toFixed();
    case "petrolEfficiency":
    case "evEfficiency":
      return (Math.round(Number(value) * 100) / 100).toFixed(1);
    default:
      return "$" + (Math.round(Number(value) * 100) / 100).toFixed(2);
  }
}
