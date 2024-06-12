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
        'Provider’s phone number':()=>MultValidations(fieldName, value),
        'tt1Date':()=>Validation.required(value),


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
    if (fieldName === 'Provider’s phone number') {
        const requiredError: any | null = Validation.required(value);
        if (requiredError !== null) {
            return requiredError;
        }

        const phoneNumberError: string | null = Validation.isMWPhoneNumber(value);
        if (phoneNumberError !== null) {
            return phoneNumberError;
        }


    } else if (fieldName === 'Abortions') {
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
    }else if (fieldName === 'Stillbirths') {
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
    } else  if (fieldName === 'lmnpDate') {
        const requiredError: any | null = Validation.required(value);
        if (requiredError !== null) {
            return requiredError;
        }

        const DateError: string | null = Validation.isDate(value);
        if (DateError !== null) {
            return DateError;
        }
    }
    else if (fieldName === 'UltrasoundDate') {
        const requiredError: any | null = Validation.required(value);
        if (requiredError !== null) {
            return requiredError;
        }

        const DateError: string | null = Validation.isDate(value);
        if (DateError !== null) {
            return DateError;
        }

    } else if (fieldName === 'specify') {
        const requiredError: any | null = Validation.required(value);
        if (requiredError !== null) {
            return requiredError;
        }

        const wholeNumberError: string | null = Validation.isWholeNumber(value);
        if (wholeNumberError !== null) {
            return wholeNumberError;
        }

        const minMaxError: string | null = Validation.checkMinMax(value, 0, 42);
        if (minMaxError !== null) {
            return minMaxError;
        }

    }
    else if (fieldName === 'Gestation age by palpation') {
        const requiredError: any | null = Validation.required(value);
        if (requiredError !== null) {
            return requiredError;
        }

        const wholeNumberError: string | null = Validation.isWholeNumber(value);
        if (wholeNumberError !== null) {
            return wholeNumberError;
        }

        const minMaxError: string | null = Validation.checkMinMax(value, 4, 36);
        if (minMaxError !== null) {
            return minMaxError;
        }

    }
    else {
        // For other fields, simply return null
        return null;
    }

    return null;
}



  