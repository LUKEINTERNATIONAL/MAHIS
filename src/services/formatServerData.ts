import { ConceptService } from "@/services/concept_service";

export async function formatRadioButtonData(data: any) {
    const buildObjPromises: Promise<any>[] = data.map(async (item: any) => {
        if (item && item.radioBtnContent && item.radioBtnContent.header && item.radioBtnContent.header.selectedValue) {
            return {
                concept_id: await ConceptService.getConceptID(item.radioBtnContent.header.name),
                value_coded: await ConceptService.getConceptID(item.radioBtnContent.header.selectedValue),
                obs_datetime: ConceptService.getSessionDate(),
            };
        } else {
            return null;
        }
    });

    return (await Promise.all(buildObjPromises)).filter((obj) => obj !== null);
}
export async function formatCheckBoxData(data: any) {
    const buildObjPromises: Promise<any>[] = data.map(async (item: any) => {
        if (item?.checkboxBtnContent?.data[0]?.checked) {
            return {
                concept_id: await ConceptService.getConceptID(item.checkboxBtnContent.header.name),
                value_coded: await ConceptService.getConceptID(item?.checkboxBtnContent?.data[0]?.value),
                obs_datetime: item?.checkboxBtnContent?.inputFields[0]?.value || ConceptService.getSessionDate(),
            };
        } else {
            return null;
        }
    });

    return (await Promise.all(buildObjPromises)).filter((obj) => obj !== null);
}
