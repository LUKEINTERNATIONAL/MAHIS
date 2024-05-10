import {
  modifyFieldValue,
  modifyRadioValue,
  modifyCheckboxValue,
  modifyCheckboxInputField,
} from "@/services/data_helpers";
import Validation from "@/validations/StandardValidations";

export function validateField(data: any, fieldName: string, value: any) {
  const validationRules: any = {
    ironPrescription: () => Validation.isNumber(value),
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
