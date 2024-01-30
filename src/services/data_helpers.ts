

export function modifyFieldValue(data: any, fieldName: any, element: any, newValue: any) {
    for (const item of data) {
        const colData = data.flatMap((item: any) => item.data?.rowData?.[0]?.colData).find((col: any) => col?.name === fieldName);
        if (colData) colData[element] = newValue;
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

export function modifyRadioValue(data: any, radioBtnName: any, element: any, newValue: any) {
    const itemIndex = data.findIndex((item: any) => item.radioBtnContent && item.radioBtnContent.header.name === radioBtnName);
    if (itemIndex !== -1)  data[itemIndex].radioBtnContent.header[element] = newValue;
}
