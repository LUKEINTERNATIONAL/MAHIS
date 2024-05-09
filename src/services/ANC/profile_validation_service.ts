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
        'lmnpEED':()=>Validation.required(value),
        'Stillbirths':()=>Validation.checkMinMax(value,1,15),
        'LiveBirths': () => Validation.required(value),
        'Parity':()=>Validation.required(value),
        'Abortions': () => Validation.checkMinMax(value, 1, 15),
        'lmnpDate':()=>Validation.required(value),
        'lmnpGestationAge':()=>Validation.required(value),
        'LNMPKnown':()=>Validation.required(value),
        'UltrasoundDone':()=>Validation.required(value),
        'UltrasoundDate':()=>Validation.required(value),
        'UltrasoundGestationAge':()=>Validation.required(value),
        'GestationAgeByPalpationKnown':()=>Validation.required(value),
        'GestationAgeByPalpation':()=>Validation.required(value),
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
  