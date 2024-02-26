import { modifyFieldValue,modifyRadioValue,modifyCheckboxValue,modifyCheckboxInputField } from '@/services/data_helpers'
import Validation from "@/validations/StandardValidations"

export function validateField(data: any,fieldName: string, value: any) {
    const validationRules: any = {
        'LMNP':()=>Validation.required(value),
        'lmnpEED':()=>Validation.required(value),
        'Stillbirths':()=>Validation.checkMinMax(value,1,15),
        'LiveBirths':()=>Validation.required(value),
        'Parity':()=>Validation.required(value),
        'Abortions':()=>Validation.required(value)
    };
    const isValid = validationRules[fieldName]?.() == null;

    modifyFieldValue(data, fieldName, 'alertsError', !isValid);
    modifyRadioValue(data, fieldName, 'alertsError', !isValid);

    
    if (!isValid) {
        modifyFieldValue(data, fieldName, 'alertsErrorMassage', validationRules[fieldName]?.());
        modifyRadioValue(data, fieldName, 'alertsErrorMassage', validationRules[fieldName]?.());

    }
    return isValid;
}
  