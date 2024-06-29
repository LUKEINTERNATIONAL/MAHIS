//Validations
import StandardValidations from "@/validations/StandardValidations";
import { modifyFieldValue } from "@/services/data_helpers";

function validaterowData(ev: any) {
    // Check if the event corresponds to the "Gravida" field
    if (ev.name === "Gravida") {
        let errorMessage: any = "";

        // Apply required validation
        if (StandardValidations.required(ev.value) != null) {
            errorMessage = StandardValidations.required(ev.value);
        }

        // Apply isNumber validation only if no required error
        if (!errorMessage && StandardValidations.isWholeNumber(ev.value) != null) {
            errorMessage = StandardValidations.isNumber(ev.value);
        }

        // Apply checkMinMax validation only if no required or isNumber error
        if (!errorMessage && StandardValidations.checkMinMax(ev.value, 0, 15) != null) {
            errorMessage = StandardValidations.checkMinMax(ev.value, 0, 15);
        }

        // Update the UI based on validation results
        // modifyFieldValue(this.prevPregnancies, 'Gravida', 'alertsErrorMassage', !!errorMessage);
        // Update the error message in the UI
        // modifyFieldValue(this.prevPregnancies, 'Gravida', 'alertsErrorMassage', errorMessage || '');
    }
}
export default {
    validaterowData,
};
