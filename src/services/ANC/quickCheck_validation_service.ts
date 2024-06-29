import { modifyFieldValue, modifyRadioValue, modifyCheckboxValue, modifyCheckboxInputField } from "@/services/data_helpers";
import Validation from "@/validations/StandardValidations";

export function validateField(data: any, fieldName: string, value: any) {
    const validationRules: any = {
        reasonVisitFacility: () => Validation.required(value),
        dangerSigns: () => Validation.required(value),
        pregnancyConfirmed: () => Validation.required(value),
        pregnancyPlanned: () => Validation.required(value),
        referWoman: () => Validation.required(value),
    };
    const isValid = validationRules[fieldName]?.() == null;

    modifyFieldValue(data, fieldName, "alertsErrorMassage", !isValid);
    modifyRadioValue(data, fieldName, "alertsErrorMassage", !isValid);
    modifyCheckboxValue(data, fieldName, "alertsErrorMassage", !isValid);

    if (!isValid) {
        modifyFieldValue(data, fieldName, "alertsErrorMassage", validationRules[fieldName]?.());
        modifyRadioValue(data, fieldName, "alertsErrorMassage", validationRules[fieldName]?.());
        modifyCheckboxValue(data, fieldName, "alertsErrorMassage", validationRules[fieldName]?.());
    }
    return isValid;
}
