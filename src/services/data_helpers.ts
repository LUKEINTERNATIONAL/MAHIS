import _ from "lodash";
export function modifyFieldValue(data: any, fieldName: any, element: any, newValue: any) {
    for (const item of data) {
        const colData = data.flatMap((item: any) => item.data?.rowData?.[0]?.colData).find((col: any) => col?.name === fieldName);
        if (colData) colData[element] = newValue;
    }
}
export function modifyDynamicFieldValue(id: any, data: any, fieldName: any, element: any, newValue: any) {
    for (const item of data) {
        if (item.data.id === id && item.data.rowData[0].colData[0].name === fieldName) {
            item.data.rowData[0].colData[0][element] = newValue;
        }
    }
}

export function getFieldValue(data: any, fieldName: any, element: any) {
    const colData = data.flatMap((item: any) => item.data?.rowData?.[0]?.colData).find((col: any) => col?.name === fieldName);
    return colData ? colData[element] : undefined;
}

export function getRadioSelectedValue(data: any, radioBtnName: any, element = "selectedValue") {
    const radioContent = data.find((item: any) => item.radioBtnContent && item.radioBtnContent.header.name === radioBtnName);
    return radioContent ? radioContent.radioBtnContent.header[element] : undefined;
}
export function dynamicValue(data: any, radioBtnName: any, id: any) {
    const radioContent = data.find(
        (item: any) => item.radioBtnContent && item.radioBtnContent.header.name === radioBtnName && item.radioBtnContent.header.id === id
    );
    return radioContent ? radioContent.radioBtnContent.header.selectedValue : undefined;
}
export function getCheckboxSelectedValue(data: any, checkboxName: any) {
    const checkboxContent = data.find((item: any) => item.checkboxBtnContent?.data?.some((checkbox: any) => checkbox.name === checkboxName));
    return checkboxContent?.checkboxBtnContent?.data.find((checkbox: any) => checkbox.name === checkboxName && checkbox.checked);
}

export function getCheckboxInputField(data: any, checkboxInputName: any, element: any) {
    const checkboxContent = data.find((item: any) =>
        item.checkboxBtnContent?.inputFields?.some((checkboxInput: any) => checkboxInput.name === checkboxInputName)
    );
    return checkboxContent.checkboxBtnContent.inputFields[0][element];
}

export function modifyRadioValue(data: any, radioBtnName: any, element: any, newValue: any, initialData = []) {
    const itemIndex = data.findIndex((item: any) => item.radioBtnContent && item.radioBtnContent.header.name === radioBtnName);
    if (itemIndex !== -1) data[itemIndex].radioBtnContent.header[element] = newValue;
    if (initialData.length > 0) {
        if (data[itemIndex].radioBtnContent.header.selectedValue != data[itemIndex].radioBtnContent.header.displayNext)
            modifyObjects(data, radioBtnName, initialData);
        else displayObjects(data, radioBtnName);
    }
}

export function modifyGroupedRadioValue(data: any, radioBtnName: any, element: any, newValue: any) {
    const item = data.find((item: any) =>
        item?.groupedRadioBtnContent?.groupedData?.some((groupedItem: any) => groupedItem?.header?.name === radioBtnName)
    );

    if (item && item.groupedRadioBtnContent && item.groupedRadioBtnContent.groupedData) {
        const groupedItem = item.groupedRadioBtnContent.groupedData.find((groupedItem: any) => groupedItem?.header?.name === radioBtnName);

        if (groupedItem) {
            groupedItem.header[element] = newValue;
        }
    }
}
export function modifyCheckboxValue(data: any, checkboxName: any, element: any, newValue: any, initialData = []) {
    data.forEach((item: any) => {
        const checkbox = item.checkboxBtnContent?.data.find((checkbox: any) => checkbox.name === checkboxName);
        if (checkbox) {
            checkbox[element] = newValue;
            if (initialData.length > 0) {
                if (!checkbox.checked) modifyObjects(data, checkbox.name, initialData);
                else displayObjects(data, checkbox.name);
            }
        }
    });
}

export function modifyCheckboxInputField(data: any, checkboxInputName: any, element: any, newValue: any) {
    data.forEach((item: any) => {
        const checkbox = item.checkboxBtnContent?.inputFields?.find((checkboxInput: any) => checkboxInput.name === checkboxInputName);
        if (checkbox) checkbox[element] = newValue;
    });
}

export function modifyCheckboxHeader(data: any, headerName: any, element: any, newValue: any) {
    data.forEach((item: any) => {
        if (item?.checkboxBtnContent?.header?.name === headerName) {
            item.checkboxBtnContent.header[element] = newValue;
        }
    });
}
function modifyObjects(data: any[], triggerName: any, initialData: any) {
    data.forEach((item: any, index: number) => {
        if (item.childName === triggerName) {
            data[index] = _.cloneDeep(initialData[index]);
            if (data[index].radioBtnContent) modifyObjects(data, data[index].radioBtnContent.header.name, initialData);
            if (data[index].data) modifyObjects(data, data[index].data.rowData[0].colData[0].name, initialData);
            if (data[index].checkboxBtnContent) modifyObjects(data, data[index].checkboxBtnContent.header.name, initialData);
        }
    });
}

function displayObjects(data: any[], triggerName: any) {
    data.forEach((item: any, index: number) => {
        if (item.childName === triggerName) {
            if (data[index].radioBtnContent) data[index].radioBtnContent.header.displayNone = false;
            if (data[index].data) data[index].data.rowData[0].colData[0].displayNone = false;
            if (data[index].checkboxBtnContent) data[index].checkboxBtnContent.header.displayNone = false;
        }
    });
}
