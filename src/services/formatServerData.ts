import {
    modifyRadioValue,
    getRadioSelectedValue,
    getCheckboxSelectedValue,
    getFieldValue,
    getCheckboxInputField,
    modifyFieldValue,
    modifyCheckboxValue,
} from "@/services/data_helpers";
import { ConceptService } from "@/services/concept_service";
export async function formatRadioButtonData(data: any) {
    const buildObjPromises: Promise<any>[] = data.map(async (item: any) => {
        if (item.radioBtnContent.header.selectedValue) {
            return {
                concept_id: await ConceptService.getConceptID(item.radioBtnContent.header.name),
                value_coded: await ConceptService.getConceptID(item.radioBtnContent.header.selectedValue),
                obs_datetime: ConceptService.getSessionDate(),
            };
        }
    });

    return await Promise.all(buildObjPromises);
}
