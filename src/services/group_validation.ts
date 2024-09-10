import { ConceptService } from "@/services/concept_service";
import {
    modifyCheckboxInputField,
    getCheckboxSelectedValue,
    getRadioSelectedValue,
    modifyCheckboxValue,
    modifyRadioValue,
    modifyFieldValue,
    modifyGroupedRadioValue,
    modifyUnitsValue,
} from "@/services/data_helpers";
import Validation from "@/validations/StandardValidations";

function validateData(data: any, col: any, value: any) {
    if (col.validationFunctionName) {
        const validationMessage = Validation[col.validationFunctionName](value);
        modifyFieldValue(data, col.name, "alertsErrorMassage", validationMessage);
        return validationMessage;
    }
    return null;
}
export function validateRadioButtonData(data: any) {
    let validationMsg = [] as any;
    data.map((item: any) => {
        if (item && item.radioBtnContent && item.radioBtnContent.header) {
            validationMsg.push(validateData(data, item.radioBtnContent.header, item.radioBtnContent.header.selectedValue));
        }
    });
    return validationMsg.every((value: any) => value === null);
}

export function validateInputFiledData(data: any) {
    let validationMsg = [] as any;
    data?.map((item: any) => {
        item.data.rowData[0].colData.map((element: any) => {
            let value = "";
            if (element.isSingleSelect) {
                value = element?.value?.name;
            } else {
                value = element?.value;
            }
            if (element.buildConceptIgnore) return null;
            validationMsg.push(validateData(data, element, value));
        });
    });
    return validationMsg.every((value: any) => value === null);
}

export function validateCheckBoxData(data: any) {
    let validationMsg = [] as any;
    data.flatMap((item: any) => {
        if (item?.checkboxBtnContent?.data && item.checkboxBtnContent.data.length > 0) {
            item.checkboxBtnContent.data.map((checkboxData: any) => {
                validationMsg.push(validateData(data, checkboxData, checkboxData.checked));
            });
        }
    });
    return validationMsg.every((value: any) => value === null);
}
