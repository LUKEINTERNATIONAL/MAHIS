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
        'LMNP':()=>Validation.required(value),
        'Gravida': () => MultValidations(fieldName, value),
        'lmnpEED':()=>Validation.required(value),
        'Stillbirths': () => MultValidations(fieldName, value),
        'LiveBirths': () => Validation.required(value),
        'Parity':()=>Validation.required(value),
        'Abortions': () => MultValidations(fieldName, value),
        'lmnpDate':()=>MultValidations(fieldName, value),
        'lmnpGestationAge':()=>Validation.required(value),
        'LNMPKnown':()=>Validation.required(value),
        'UltrasoundDone':()=>Validation.required(value),
        'UltrasoundDate':()=>MultValidations(fieldName, value),
        'specify':()=>MultValidations(fieldName, value),
        'GestationAgeByPalpationKnown':()=>Validation.required(value),
        'Gestation age by palpation':()=>MultValidations(fieldName, value),
        'GestationAgeUsed':()=>Validation.required(value),
        'TetanusDosesForImmunisation':()=>Validation.required(value),
        'NumberOfUnderImmunisedDoses':()=>Validation.required(value),
        'tt1Date':()=>Validation.required(value),
        'tt2Date':()=>Validation.required(value),
        'tt3Date':()=>Validation.required(value),
        'tt4Date':()=>Validation.required(value),
        'tt5Date':()=>Validation.required(value),
        'tt6Date':()=>Validation.required(value),
        'tt7Date':()=>Validation.required(value),
        'tt8Date':()=>Validation.required(value),
        'tt9Date':()=>Validation.required(value),
        'tt10Date':()=>Validation.required(value),
        'tt11Date':()=>Validation.required(value),
        'tt12Date':()=>Validation.required(value),
        'tt13Date':()=>Validation.required(value),
        'tt14Date':()=>Validation.required(value),
        'tt15Date':()=>Validation.required(value),
        'ReasonTTVnotConducted':()=>Validation.required(value),
        'ExistingChronicConditions':()=>Validation.required(value),
        'Medications':()=>Validation.required(value),
        'DailyCaffeineIntake':()=>Validation.required(value),
        'CurrentMedications':()=>Validation.required(value),
        'SubstanceAbuse':()=>Validation.required(value),
        'SecondHandSmoke':()=>Validation.required(value),
        'Who does the client live with':()=>Validation.required(value),



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

        const minMaxError: string | null = Validation.checkMinMax(value, 0, 42);
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



  