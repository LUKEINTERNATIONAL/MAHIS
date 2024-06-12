import { modifyFieldValue, modifyRadioValue, modifyCheckboxValue, modifyCheckboxInputField } from "@/services/data_helpers";
import Validation from "@/validations/StandardValidations";

export function validateField(data: any, fieldName: string, value: any) {
    const validationRules: any = {
        "High caffeine intake": () => Validation.required(value),
        "Tobacco use": () => Validation.required(value),
        "Recently quit tobacco products": () => Validation.required(value),
        "Exposure to second-hand smoke": () => Validation.required(value),
        "Persistent Symptom": () => Validation.required(value),
        "Physiological symptom": () => Validation.required(value),
        "Fetal movement": () => Validation.required(value),
    };
    const isValid = validationRules[fieldName]?.() == null;

    modifyRadioValue(data, fieldName, "alertsErrorMassage", !isValid);
    modifyCheckboxValue(data, fieldName, "alertsErrorMassage", !isValid);

    if (!isValid) {
        modifyRadioValue(data, fieldName, "alertsErrorMassage", validationRules[fieldName]?.());
        modifyCheckboxValue(data, fieldName, "alertsErrorMassage", validationRules[fieldName]?.());
    }
    return isValid;
}
