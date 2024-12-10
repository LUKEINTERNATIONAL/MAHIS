import { ConceptService } from "@/services/concept_service";
import {
    modifyCheckboxInputField,
    getCheckboxSelectedValue,
    getRadioSelectedValue,
    getFieldValue,
    modifyRadioValue,
    modifyFieldValue,
    modifyCheckboxData,
} from "@/services/data_helpers";

export async function formatRadioButtonData(data: any, date: any = ConceptService.getSessionDate(), childData = []) {
    const buildObjPromises: Promise<any>[] = data.map(async (item: any) => {
        if (item && item.radioBtnContent && item.radioBtnContent.header && item.radioBtnContent.header.selectedValue) {
            const value_coded = await ConceptService.getConceptID(item.radioBtnContent.header.selectedValue, true);
            const concept_id = await ConceptService.getConceptID(item.radioBtnContent.header.name, true);
            const obs_datetime = date || ConceptService.getSessionDate();
            const childNames = childData.map((item: any) => {
                return {
                    concept_id: value_coded,
                    value_coded: item.drug_inventory_id,
                    obs_datetime: obs_datetime,
                };
            });
            if (childData) {
                return {
                    concept_id,
                    value_coded,
                    obs_datetime,
                    child: childNames,
                };
            } else {
                return {
                    concept_id,
                    value_coded,
                    obs_datetime,
                };
            }
        } else {
            return null;
        }
    });

    return (await Promise.all(buildObjPromises)).filter((obj) => obj !== null);
}
export async function formatGroupRadioButtonData(data: any, date: any = ConceptService.getSessionDate(), childData = []) {
    const buildObjPromises: Promise<any>[] = data.map(async (item: any) => {
        if (
            item &&
            item.groupedRadioBtnContent &&
            item.groupedRadioBtnContent.groupedData &&
            item.groupedRadioBtnContent.groupedData[0]?.header?.selectedValue
        ) {
            const value_coded = await ConceptService.getConceptID(item.groupedRadioBtnContent.groupedData[0]?.header?.selectedValue, true);
            const concept_id = await ConceptService.getConceptID(item.groupedRadioBtnContent.groupedData[0]?.header?.name, true);
            const obs_datetime = date || ConceptService.getSessionDate();
            return {
                concept_id,
                value_coded,
                obs_datetime,
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
    const concept_id = await ConceptService.getConceptID(element.name, true);
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
export async function formatCheckBoxData(
    data: any[],
    obs_datetime: any = ConceptService.getSessionDate(),
    childData: Array<{ drug_inventory_id: number }> = []
) {
    // Handle empty or invalid input
    if (!Array.isArray(data)) {
        return [];
    }

    // Process each item in the data array
    const buildObjPromises = await Promise.all(
        data.map(async (item) => {
            // Skip if item or required data is missing
            if (!item?.checkboxBtnContent?.data?.length) {
                return [];
            }

            // Process checkbox data
            const checkboxPromises = item.checkboxBtnContent.data.map(async (checkboxData: any) => {
                // Skip if not checked or should be ignored
                if (!checkboxData?.checked || checkboxData?.buildConceptIgnore) {
                    return null;
                }

                try {
                    const value_coded = await ConceptService.getConceptID(checkboxData.value, true);
                    const concept_id = await ConceptService.getConceptID(item.checkboxBtnContent.header.name, true);
                    const date = getFieldValue(data, checkboxData.name + " date", "value");
                    obs_datetime = date || obs_datetime;
                    // Skip if required IDs couldn't be retrieved
                    if (!value_coded || !concept_id) {
                        return null;
                    }

                    // Build base object
                    const baseObj = {
                        concept_id,
                        value_coded,
                        obs_datetime,
                    };

                    // Add child data if present
                    if (childData.length > 0) {
                        const childNames = childData.map((child) => ({
                            concept_id: value_coded,
                            value_coded: child.drug_inventory_id,
                            obs_datetime,
                        }));

                        return {
                            ...baseObj,
                            child: childNames,
                        };
                    }

                    return baseObj;
                } catch (error) {
                    console.error("Error processing checkbox data:", error);
                    return null;
                }
            });

            return (await Promise.all(checkboxPromises)).filter(Boolean);
        })
    );

    // Flatten the array and remove any remaining null values
    return buildObjPromises.flat().filter(Boolean);
}
