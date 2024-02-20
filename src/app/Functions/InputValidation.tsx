interface Props {
  value: number | null;
  inputType: string;
}

export default function InputValidation(
  value: Props["value"],
  inputType: Props["inputType"]
) {
  if (inputType == "serviceCost") {
    if (!(value != null && value >= 0)) {
      return [inputType, false];
    }
    return [inputType, true];
  } else {
    if (!(value != null && value > 0)) {
      return [inputType, false];
    }
    return [inputType, true];
  }
}
