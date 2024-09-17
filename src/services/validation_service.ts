import {
  modifyFieldValue,
  modifyRadioValue,
  modifyCheckboxValue,
  modifyCheckboxInputField,
} from "@/services/data_helpers";
import Validation from "@/validations/StandardValidations";
import * as yup from "yup";

export function validateField(data: any, fieldName: string, value: any) {
  const test = "isName";
  const validationRules: any = {
    nationalID: () => Validation.isMWNationalID(value),
    firstname: () => Validation[test](value),
    lastname: () => Validation.isName(value),
    middleName: () => Validation.isNamesEmpty(value),
    birthdate: () => Validation.required(value),
    gender: () => Validation.required(value),
    "Other (specify)": () => Validation.required(value),
    "Height Weight Reason": () => Validation.required(value),
    "Blood Pressure Reason": () => Validation.required(value),
    "Pulse Rate Reason": () => Validation.required(value),
    phoneNumber: () => Validation.isMWPhoneNumber(value),
    estimation: () => Validation.isEstimationDate(value),
    guardianFirstname: () => MultValidations(fieldName, value),
    guardianLastname: () => MultValidations(fieldName, value),
    guardianMiddleName: () => Validation.isNamesEmpty(value),
    guardianPhoneNumber: () => MultValidations(fieldName, value),
    current_district: () => Validation.required(value),
    current_traditional_authority: () => Validation.required(value),
    current_village: () => Validation.required(value),
  };
  const isValid = validationRules[fieldName]?.() == null;

  modifyFieldValue(data, fieldName, "alertsErrorMassage", !isValid);
  modifyRadioValue(data, fieldName, "alertsErrorMassage", !isValid);

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
  }
  return isValid;
}

function MultValidations(fieldName: string, value: any): null | any {
  if (fieldName === "guardianFirstname") {
    const requiredError: any | null = Validation.required(value);
    if (requiredError !== null) {
      return requiredError;
    }

    const wholeNumberError: string | null = Validation.isNameEmpty(value);
    if (wholeNumberError !== null) {
      return wholeNumberError;
    }
  } else if (fieldName === "guardianLastname") {
    const requiredError: any | null = Validation.required(value);
    if (requiredError !== null) {
      return requiredError;
    }

    const wholeNumberError: string | null = Validation.isNameEmpty(value);
    if (wholeNumberError !== null) {
      return wholeNumberError;
    }
  } else if (fieldName === "guardianPhoneNumber") {
    const requiredError: any | null = Validation.required(value);
    if (requiredError !== null) {
      return requiredError;
    }

    const wholeNumberError: string | null = Validation.isMWPhoneNumber(value);
    if (wholeNumberError !== null) {
      return wholeNumberError;
    }
  } else {
    return null;
  }

  return null;
}

export async function YupValidateField(
  store: any,
  validationSchema: any,
  fieldName: string,
  value: any
) {
  try {
    const fieldSchema = validationSchema.fields[fieldName];
    if (yup.isSchema(fieldSchema)) {
      await fieldSchema.validate(value);
      setErrorOnFields(store, fieldName, false, "");
      return true;
    }
  } catch (error: any) {
    setErrorOnFields(store, fieldName, true, error.message);
    return false;
  }
}

const setErrorOnFields = (
  store: any,
  fieldName: any,
  isValid: boolean,
  message: string
) => {
  modifyFieldValue(store, fieldName, "alertsErrorMassage", isValid);
  modifyRadioValue(store, fieldName, "alertsErrorMassage", isValid);
  modifyFieldValue(store, fieldName, "alertsErrorMassage", message);
  modifyRadioValue(store, fieldName, "alertsErrorMassage", message);
};
