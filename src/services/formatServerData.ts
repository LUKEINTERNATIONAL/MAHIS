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

export async function formatInputFiledData(data: any, obs_datetime: any = ConceptService.getSessionDate(), childData = "") {
    const buildObjPromises = data.map(async (item: any) => {
        if (!item?.data?.rowData) return [];

        return Promise.all(
            item.data.rowData[0].colData.map(async (element: any) => {
                let value: any = [];

                if (element.isMultiSelect && element?.value) {
                    // Use map with Promise.all instead of forEach
                    value = await Promise.all(
                        element?.value.map(async (item: any) => {
                            return await getValue(element, item.concept_id, obs_datetime, childData);
                        })
                    );
                } else if (element.isSingleSelect) {
                    value = element?.value?.name;
                } else {
                    value = element?.value;
                }

                if (element.buildConceptIgnore || !value) return null;

                if (typeof value === "object") {
                    return value;
                } else {
                    return await getValue(element, value, obs_datetime);
                }
            })
        ).then((dataArray) => dataArray.filter(Boolean));
    });

    const results = await Promise.all(buildObjPromises);
    return results.flat().flat();
}

async function getValue(element: any, value: any, obs_datetime: any, childData = "") {
    const concept_id = await ConceptService.getConceptID(element.name);
    // return {
    //     categories: [],
    //     concept_id: concept_id,
    //     name: element.name,
    // };
    if (element.valueType === "coded") {
        if (childData) {
            return {
                concept_id,
                value_coded: value,
                obs_datetime,
                child: [
                    {
                        concept_id: concept_id,
                        value_text: childData,
                        obs_datetime: obs_datetime,
                    },
                ],
            };
        } else {
            return { concept_id, value_coded: value, obs_datetime };
        }
    } else if (element.valueType === "text") {
        return { concept_id, value_text: value, obs_datetime };
    } else if (element.valueType === "number") {
        return { concept_id, value_numeric: value, obs_datetime };
    } else {
        return null;
    }
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
