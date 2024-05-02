import { modifyFieldValue, modifyRadioValue, modifyCheckboxValue, modifyCheckboxInputField } from "@/services/data_helpers";
import Validation from "@/validations/StandardValidations";

export function validateField(data: any, fieldName: string, value: any) {
    const validationRules: any = {
        nationalID: () => Validation.isMWNationalID(value),
        firstname: () => Validation.isName(value),
        lastname: () => Validation.isName(value),
        middleName: () => Validation.isNameEmpty(value),
        birthdate: () => Validation.required(value),
        gender: () => Validation.required(value),
        phoneNumber: () => Validation.isMWPhoneNumber(value),
        estimation: () => Validation.isEstimationDate(value),
        guardianFirstname: () => Validation.isName(value),
        guardianMiddleName: () => Validation.isNameEmpty(value),
        guardianLastname: () => Validation.isName(value),
        guardianPhoneNumber: () => Validation.isMWPhoneNumber(value),
    };
    const isValid = validationRules[fieldName]?.() == null;

    modifyFieldValue(data, fieldName, "alertsError", !isValid);
    modifyRadioValue(data, fieldName, "alertsError", !isValid);

    if (!isValid) {
        modifyFieldValue(data, fieldName, "alertsErrorMassage", validationRules[fieldName]?.());
        modifyRadioValue(data, fieldName, "alertsErrorMassage", validationRules[fieldName]?.());
    }
    return isValid;
}
