import { modifyFieldValue,modifyRadioValue,modifyCheckboxValue,modifyCheckboxInputField } from '@/services/data_helpers'
import Validation from "@/validations/StandardValidations"

export function validateField(data: any,fieldName: string, value: any) {
    const validationRules = {
        'nationalID': () => Validation.isMWNationalID(value),
        'firstname': () => Validation.isName(value),
        'lastname': () => Validation.isName(value),
        'birthdate': () => Validation.required(value),
        'gender': () => Validation.required(value),
        'phoneNumber': () => Validation.isMWPhoneNumber(value),
<<<<<<< HEAD

=======
        'estimation': () => Validation.isEstimationDate(value),
>>>>>>> e57f0de82302c77f3001a5843149cc3fbbb90319
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
  