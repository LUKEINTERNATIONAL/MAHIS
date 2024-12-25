import { modifyFieldValue, modifyRadioValue, modifyCheckboxValue, modifyCheckboxInputField, modifyCheckboxHeader } from "@/services/data_helpers";
import Validation from "@/validations/StandardValidations";

export function validateField(data: any, fieldName: string, value: any) {
    const validationRules: any = {
        "Birth weight": () => MultValidations(fieldName, value),
        "Current weight": () => MultValidations(fieldName, value),
        "Full name of the baby": () => MultValidations(fieldName, value),
        "Date BCG given": () => MultValidations(fieldName, value),
        "Respiratory rate": () => MultValidations(fieldName, value),
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

function MultValidations(fieldName: string, value: any): null | any {
    if (fieldName === "Systolic blood pressure") {
        const requiredError: any | null = Validation.required(value);
        if (requiredError !== null) {
            return requiredError;
        }

        const wholeNumberError: string | null = Validation.isWholeNumber(value);
        if (wholeNumberError !== null) {
            return wholeNumberError;
        }

        const minMaxError: string | null = Validation.checkMinMax(value, 20, 140);
        if (minMaxError !== null) {
            return minMaxError;
        }
    } else if (fieldName === "Diastolic blood pressure") {
        const requiredError: any | null = Validation.required(value);
        if (requiredError !== null) {
            return requiredError;
        }

        const wholeNumberError: string | null = Validation.isWholeNumber(value);
        if (wholeNumberError !== null) {
            return wholeNumberError;
        }

        const minMaxError: string | null = Validation.checkMinMax(value, 20, 90);
        if (minMaxError !== null) {
            return minMaxError;
        }
    } else if (fieldName === "Pulse") {
        const requiredError: any | null = Validation.required(value);
        if (requiredError !== null) {
            return requiredError;
        }

        const wholeNumberError: string | null = Validation.isWholeNumber(value);
        if (wholeNumberError !== null) {
            return wholeNumberError;
        }

        const minMaxError: string | null = Validation.checkMinMax(value, 50, 200);
        if (minMaxError !== null) {
            return minMaxError;
        }
    } else if (fieldName === "Temperature") {
        const requiredError: any | null = Validation.required(value);
        if (requiredError !== null) {
            return requiredError;
        }

        const wholeNumberError: string | null = Validation.isWholeNumber(value);
        if (wholeNumberError !== null) {
            return wholeNumberError;
        }

        const minMaxError: string | null = Validation.checkMinMax(value, 35, 42);
        if (minMaxError !== null) {
            return minMaxError;
        }
    } else if (fieldName === "Respiratory rate") {
        const requiredError: any | null = Validation.required(value);
        if (requiredError !== null) {
            return requiredError;
        }

        const wholeNumberError: string | null = Validation.isWholeNumber(value);
        if (wholeNumberError !== null) {
            return wholeNumberError;
        }

        const minMaxError: string | null = Validation.checkMinMax(value, 12, 16);
        if (minMaxError !== null) {
            return minMaxError;
        }
    } else {
        return null;
    }

    return null;
}
