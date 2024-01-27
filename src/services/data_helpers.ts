

export function modifyFieldValue(data: any, fieldName: any, newValue: any) {
    for (const item of data) {
        const colData = data.flatMap((item: any) => item.data?.rowData?.[0]?.colData).find((col: any) => col?.name === fieldName);
        if (colData) colData.value = newValue;
    }
}  

export function getFieldValue(data: any, fieldName: any) {
    const colData = data.flatMap((item: any) => item.data?.rowData?.[0]?.colData).find((col: any) => col?.name === fieldName);
    return colData ? colData.value : undefined;
}

export function getRadioSelectedValue(data: any, radioBtnName: any) {
    const radioContent = data.find((item: any) => item.radioBtnContent && item.radioBtnContent.header.title === radioBtnName);
    return radioContent ? radioContent.radioBtnContent.header.selectedValue : undefined;
}