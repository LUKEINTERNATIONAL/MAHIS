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

export function getRadioSelectedValue(data: any, radioBtnName: any) {
    const radioContent = data.find((item: any) => item.radioBtnContent && item.radioBtnContent.header.name === radioBtnName);
    return radioContent ? radioContent.radioBtnContent.header.selectedValue : undefined;
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
    data.forEach((item: any) => {
        const checkbox = item.checkboxBtnContent?.inputFields?.find((checkboxInput: any) => checkboxInput.name === checkboxInputName);
        return checkbox;
    });
}

export function modifyRadioValue(data: any, radioBtnName: any, element: any, newValue: any) {
    const itemIndex = data.findIndex((item: any) => item.radioBtnContent && item.radioBtnContent.header.name === radioBtnName);
    if (itemIndex !== -1) data[itemIndex].radioBtnContent.header[element] = newValue;
}

export function modifyCheckboxValue(data: any, checkboxName: any, element: any, newValue: any) {
    data.forEach((item: any) => {
        const checkbox = item.checkboxBtnContent?.data.find((checkbox: any) => checkbox.name === checkboxName);
        if (checkbox) checkbox[element] = newValue;
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
        console.log(item);
        if (item?.checkboxBtnContent?.header?.name === headerName) {
            item.checkboxBtnContent.header[element] = newValue;
        }
    });
}
