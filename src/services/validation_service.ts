import { modifyFieldValue, modifyRadioValue, modifyCheckboxValue, modifyCheckboxInputField } from "@/services/data_helpers";
import Validation from "@/validations/StandardValidations";

export function validateField(data: any, fieldName: string, value: any) {
    const test = "isName";
    const validationRules: any = {
        nationalID: () => Validation.isMWNationalID(value),
        firstname: () => Validation[test](value),
        lastname: () => Validation.isName(value),
        middleName: () => Validation.isNameEmpty(value),
        birthdate: () => Validation.required(value),
        gender: () => Validation.required(value),
        phoneNumber: () => Validation.isMWPhoneNumber(value),
        estimation: () => Validation.isEstimationDate(value),
        guardianFirstname: () => Validation.isNameEmpty(value),
        guardianMiddleName: () => Validation.isNameEmpty(value),
        guardianLastname: () => Validation.isNameEmpty(value),
        guardianPhoneNumber: () => Validation.isMWPhoneNumber(value),
        current_district: () => Validation.required(value),
        current_traditional_authority: () => Validation.required(value),
        current_village: () => Validation.required(value),
    };
    const isValid = validationRules[fieldName]?.() == null;

    modifyFieldValue(data, fieldName, "alertsErrorMassage", !isValid);
    modifyRadioValue(data, fieldName, "alertsErrorMassage", !isValid);

    if (!isValid) {
        modifyFieldValue(data, fieldName, "alertsErrorMassage", validationRules[fieldName]?.());
        modifyRadioValue(data, fieldName, "alertsErrorMassage", validationRules[fieldName]?.());
    }
    return isValid;
}
