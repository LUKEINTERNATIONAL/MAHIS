import { ConceptService } from "@/services/concept_service";

export async function formatRadioButtonData(data: any) {
    const buildObjPromises: Promise<any>[] = data.map(async (item: any) => {
        if (item && item.radioBtnContent && item.radioBtnContent.header && item.radioBtnContent.header.selectedValue) {
            return {
                concept_id: await ConceptService.getConceptID(item.radioBtnContent.header.name, true),
                value_coded: await ConceptService.getConceptID(item.radioBtnContent.header.selectedValue, true),
                obs_datetime: ConceptService.getSessionDate(),
            };
        } else {
            return null;
        }
    });

    return (await Promise.all(buildObjPromises)).filter((obj) => obj !== null);
}

export async function formatInputFiledData(data: any) {
    const buildObjPromises = data.map(async (item: any) => {
        if (!item?.data?.rowData) return [];

        return Promise.all(
            item.data.rowData[0].colData.map(async (element: any) => {
                if (!element.value || element.buildConceptIgnore) return null;

                const concept_id = await ConceptService.getConceptID(element.name, true);
                const obs_datetime = ConceptService.getSessionDate();

                if (element.valueType === "text") {
                    return { concept_id, value_text: element.value, obs_datetime };
                } else if (element.valueType === "number") {
                    return { concept_id, value_numeric: element.value, obs_datetime };
                } else {
                    return null;
                }
            })
        ).then((dataArray) => dataArray.filter(Boolean));
    });

    const results = await Promise.all(buildObjPromises);
    return results.flat();
}

export async function formatCheckBoxData(data: any) {
    const buildObjPromises: Promise<any>[] = data.flatMap(async (item: any) => {
        if (item?.checkboxBtnContent?.data && item.checkboxBtnContent.data.length > 0) {
            return await Promise.all(
                item.checkboxBtnContent.data.map(async (checkboxData: any) => {
                    if (checkboxData.checked && !checkboxData.buildConceptIgnore) {
                        return {
                            concept_id: await ConceptService.getConceptID(item.checkboxBtnContent.header.name, true),
                            value_coded: await ConceptService.getConceptID(checkboxData.value, true),
                            obs_datetime: ConceptService.getSessionDate(),
                        };
                    } else {
                        return null;
                    }
                })
            );
        } else {
            return null;
        }
    });

    return (await Promise.all(buildObjPromises)).flat().filter((obj) => obj !== null);
}
