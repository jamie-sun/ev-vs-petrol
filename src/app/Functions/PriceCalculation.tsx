interface Props {
  array: string[];
}
export default function priceCalculation(calculationDataArray: Props["array"]) {
  const formatValues = (value: string) => {
    return Number(value.replace(/[^0-9.]/g, ""));
  };

  const formatCalculationCost = (value: number) => {
    return Math.round(value / 100) * 100;
  };

  const [
    mileage,
    petrolCost,
    serviceCost,
    petrolEfficiency,
    electricityCost,
    evEfficiency,
  ] = calculationDataArray.map(formatValues);

  const evRUC = (mileage / 1000) * 76; // nz ev road user charges

  let evCalculation = (mileage * evEfficiency * electricityCost) / 100 + evRUC;
  let petrolCalculation =
    (mileage * petrolEfficiency * petrolCost) / 100 + serviceCost;

  return [
    formatCalculationCost(evCalculation),
    formatCalculationCost(petrolCalculation),
  ];
}
