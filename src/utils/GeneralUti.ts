
export function areFieldsValid(propertiesArray: any[]) {
    let foundInvalidEntry = false;

    propertiesArray.forEach(property => {
        if (property.skip_validation) {
            return true; 
        }
        const value = property.dataValue?.value;

        if (value === "" || value === undefined) {
            property.show_error.value = true;
            foundInvalidEntry = true;
        } else {
            if (property.type === "text" && !isInputTextValid(value)) {
                property.show_error.value = true;
                foundInvalidEntry = true;
            } else if (property.type === "alphanumeric" && !isInputValid(value)) {
                property.show_error.value = true;
                foundInvalidEntry = true;
            } else {
                property.show_error.value = false;
            }
        }
    });

    return !foundInvalidEntry;
}

export function isInputTextValid(txt: string): boolean {
    const trimmedText = txt.trim()
    const regex = /^[a-zA-Z\s\t]{2,}$/; // Minimum 2 characters
    return regex.test(trimmedText)
}

export function isInputValid(txt: string): boolean{
    const trimmedText = txt.trim()
    const regex = /^[a-zA-Z0-9\s\t]{2,}$/; // Minimum 2 characters
    return regex.test(trimmedText)
}

export function isPasswordValid(txt: string): boolean {
    const trimmedText = txt.trim()
    const regex = /^(?!.*\s)[a-zA-Z0-9@#$%^&+=*!-]{4,}$/
    return regex.test(trimmedText)
}

export function getFieldsValuesObj(properties_array: any[]) {
    let resultObject: { [key: string]: any } = {}; // Define an index signature for dynamic property names

    properties_array.forEach((property: any) => {
        resultObject[property.property_name] = property.dataValue.value; // Assuming each property has a 'property_name' and a 'value'
    })
    return resultObject;
}

export function combineArrays<T>(...arrays: T[][]): T[] {
    return arrays.reduce((combinedArray, array) => combinedArray.concat(array), []);
}

export function isSameDate(date1: Date, date2: Date) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
}