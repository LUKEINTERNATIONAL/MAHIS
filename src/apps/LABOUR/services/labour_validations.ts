import { modifyFieldValue, modifyRadioValue, modifyCheckboxValue, modifyCheckboxInputField } from "@/services/data_helpers";
import Validation from "@/validations/StandardValidations";
import * as yup from "yup"

const validationSchema = yup.object().shape({
    'First name': yup.string().required('first name is required'),
    'Last name': yup.string().required('last name required'),
})

type ValidationSchemaType = yup.InferType<typeof validationSchema>;


export async function validateField(data: any, fieldName: keyof ValidationSchemaType, value: any) {
    try {
        const fieldSchema = validationSchema.fields[fieldName];

        if (yup.isSchema(fieldSchema)) {
            await fieldSchema.validate(value);
            return true;
        }

        // alert(fieldName);
        // await (validationSchema.fields[fieldName] as yup.StringSchema).validate(1);
      } catch (error: any) {
        // alert(JSON.stringify(error.message));
        return false;
      }


    // await (validationSchema.fields[fieldName] as yup.StringSchema).validate(value);
    // const validationRules: any = {
      
    //     'First name': () => Validation.isName(value),
    //     'Last name': () => Validation.isName(value),
    //     Sex: () => Validation.required(value),
       
    // };
    // const isValid = validationRules[fieldName]?.() == null;

    // modifyFieldValue(data, fieldName, "alertsErrorMassage", !isValid);
    // modifyRadioValue(data, fieldName, "alertsErrorMassage", !isValid);

    // if (!isValid) {
    //     modifyFieldValue(data, fieldName, "alertsErrorMassage", validationRules[fieldName]?.());
    //     modifyRadioValue(data, fieldName, "alertsErrorMassage", validationRules[fieldName]?.());
    // }
    // return isValid;
}

function MultValidations(fieldName: string, value: any): null | any {
    if (fieldName === "guardianFirstname") {
        const requiredError: any | null = Validation.required(value);
        if (requiredError !== null) {
            return requiredError;
        }

        const wholeNumberError: string | null = Validation.isNameEmpty(value);
        if (wholeNumberError !== null) {
            return wholeNumberError;
        }
    } else if (fieldName === "guardianLastname") {
        const requiredError: any | null = Validation.required(value);
        if (requiredError !== null) {
            return requiredError;
        }

        const wholeNumberError: string | null = Validation.isNameEmpty(value);
        if (wholeNumberError !== null) {
            return wholeNumberError;
        }
    } else if (fieldName === "guardianPhoneNumber") {
        const requiredError: any | null = Validation.required(value);
        if (requiredError !== null) {
            return requiredError;
        }

        const wholeNumberError: string | null = Validation.isMWPhoneNumber(value);
        if (wholeNumberError !== null) {
            return wholeNumberError;
        }
    } else {
        return null;
    }

    return null;
}
