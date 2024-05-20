import {
    modifyFieldValue,
    modifyRadioValue,
    modifyCheckboxValue,
    modifyCheckboxInputField,
    modifyCheckboxHeader
} from '@/services/data_helpers'
import Validation from "@/validations/StandardValidations"

export function validateField(data: any,fieldName: string, value: any) {
    const validationRules: any = {
        'Gravida': () => MultValidations(fieldName, value),
        'Parity': () => MultValidations(fieldName, value),
        'Number of babies': () => MultValidations(fieldName, value),
        'Date of delivery':()=>Validation.required(value),
        'First name':()=>Validation.required(value),
        'Last name':()=>Validation.required(value),
        'Weight': () => MultValidations(fieldName, value),
        'Height': () => MultValidations(fieldName, value),
        'Apgar score at 5 minutes': () => MultValidations(fieldName, value),





    };
    const isValid = validationRules[fieldName]?.() == null;

    modifyFieldValue(data, fieldName, 'alertsError', !isValid);
    modifyRadioValue(data, fieldName, 'alertsError', !isValid);
    modifyCheckboxValue(data, fieldName, 'alertsError', !isValid);

    
    if (!isValid) {
        modifyFieldValue(data, fieldName, 'alertsErrorMassage', validationRules[fieldName]?.());
        modifyRadioValue(data, fieldName, 'alertsErrorMassage', validationRules[fieldName]?.());
        modifyCheckboxValue(data, fieldName, 'alertsErrorMassage', validationRules[fieldName]?.());

    }
    return isValid;
}

function MultValidations(fieldName: string, value: any): null | any {
    if (fieldName === 'Gravida') {
        const requiredError: any | null = Validation.required(value);
        if (requiredError !== null) {
            return requiredError;
        }

        const wholeNumberError: string | null = Validation.isWholeNumber(value);
        if (wholeNumberError !== null) {
            return wholeNumberError;
        }

        const minMaxError: string | null = Validation.checkMinMax(value, 1, 15);
        if (minMaxError !== null) {
            return minMaxError;
        }
    } else if (fieldName === 'Parity') {
        const requiredError: any | null = Validation.required(value);
        if (requiredError !== null) {
            return requiredError;
        }

        const wholeNumberError: string | null = Validation.isWholeNumber(value);
        if (wholeNumberError !== null) {
            return wholeNumberError;
        }

        const minMaxError: string | null = Validation.checkMinMax(value, 0, 15);
        if (minMaxError !== null) {
            return minMaxError;
        }
    } else if (fieldName === 'Number of babies') {
        const requiredError: any | null = Validation.required(value);
        if (requiredError !== null) {
            return requiredError;
        }

        const wholeNumberError: string | null = Validation.isWholeNumber(value);
        if (wholeNumberError !== null) {
            return wholeNumberError;
        }

        const minMaxError: string | null = Validation.checkMinMax(value, 0, 5);
        if (minMaxError !== null) {
            return minMaxError;
        }
    }else if (fieldName === 'Weight') {
        const requiredError: any | null = Validation.required(value);
        if (requiredError !== null) {
            return requiredError;
        }

        const wholeNumberError: string | null = Validation.isWholeNumber(value);
        if (wholeNumberError !== null) {
            return wholeNumberError;
        }

        const minMaxError: string | null = Validation.checkMinMax(value, 900, 7000);
        if (minMaxError !== null) {
            return minMaxError;
        }
    }else if (fieldName === 'Height') {
        const requiredError: any | null = Validation.required(value);
        if (requiredError !== null) {
            return requiredError;
        }

        const wholeNumberError: string | null = Validation.isWholeNumber(value);
        if (wholeNumberError !== null) {
            return wholeNumberError;
        }

        const minMaxError: string | null = Validation.checkMinMax(value, 30, 100);
        if (minMaxError !== null) {
            return minMaxError;
        }
    }else if (fieldName === 'Apgar score at 5 minutes') {
        const requiredError: any | null = Validation.required(value);
        if (requiredError !== null) {
            return requiredError;
        }

        const wholeNumberError: string | null = Validation.isWholeNumber(value);
        if (wholeNumberError !== null) {
            return wholeNumberError;
        }

        const minMaxError: string | null = Validation.checkMinMax(value, 0, 10);
        if (minMaxError !== null) {
            return minMaxError;
        }
    }
    else {
        return null;
    }

    return null;
}



  