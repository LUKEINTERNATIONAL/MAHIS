import {
  modifyFieldValue,
  modifyRadioValue,
  modifyCheckboxValue,
  modifyCheckboxInputField,
  modifyCheckboxHeader,
} from "@/services/data_helpers";
import Validation from "@/validations/StandardValidations";

export function validateField(data: any, fieldName: string, value: any) {
  const validationRules: any = {
    "iron Amount": () => MultValidations(fieldName, value),
    "Amount of Folic acid": () => MultValidations(fieldName, value),
  };
  const isValid = validationRules[fieldName]?.() == null;

  modifyFieldValue(data, fieldName, "alertsError", !isValid);
  modifyRadioValue(data, fieldName, "alertsError", !isValid);
  modifyCheckboxValue(data, fieldName, "alertsError", !isValid);

  if (!isValid) {
    modifyFieldValue(
      data,
      fieldName,
      "alertsErrorMassage",
      validationRules[fieldName]?.()
    );
    modifyRadioValue(
      data,
      fieldName,
      "alertsErrorMassage",
      validationRules[fieldName]?.()
    );
    modifyCheckboxValue(
      data,
      fieldName,
      "alertsErrorMassage",
      validationRules[fieldName]?.()
    );
  }
  return isValid;
}

function MultValidations(fieldName: string, value: any): null | any {
  if (fieldName === "iron Amount") {
    const requiredError: any | null = Validation.required(value);
    if (requiredError !== null) {
      return requiredError;
    }

    const wholeNumberError: string | null = Validation.isWholeNumber(value);
    if (wholeNumberError !== null) {
      return wholeNumberError;
    }

    const minMaxError: string | null = Validation.checkMinMax(value, 1, 1000);
    if (minMaxError !== null) {
      return minMaxError;
    }
  } else if (fieldName === "Amount of Folic acid"){
    const requiredError: any | null = Validation.required(value);
    if (requiredError !== null) {
      return requiredError;
    }

    const wholeNumberError: string | null = Validation.isWholeNumber(value);
    if (wholeNumberError !== null) {
      return wholeNumberError;
    }

    const minMaxError: string | null = Validation.checkMinMax(value,1, 1000);
    if (minMaxError !== null) {
      return minMaxError;
    }
  } else {
    // For other fields, simply return null
    return null;
  }

  return null;
}
